'use client'
import Filters from "@/components/Filters"
import FanficCard from "@/components/FanficCard"
import { useState, useMemo, useEffect } from "react"
import { Fanfic } from "@/types/types.api"
import { motion, AnimatePresence } from "framer-motion"
import { variants } from "@/app/utils/motion"
import { useRouter, useSearchParams } from "next/navigation"

function parseYear(dateStr: string, newestFirst = false) {
  if (!dateStr) return 0
  if (newestFirst && dateStr.endsWith('-')) {
    dateStr = dateStr.split('-')[0]
  }
  const match = dateStr.match(/\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

function parseWordCount(str: string) {
  if (!str) return 0
  str = str.replace('+', '')
  const match = str.match(/([\d.]+)k?/i)
  if (!match) return 0
  const num = parseFloat(match[1])
  return str.toLowerCase().includes('k') ? num * 1000 : num
}

function ReadWrapper({ fanficInfo }: { fanficInfo: Fanfic[] }) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const ship = searchParams.get('ship')

  const [filters, setFilters] = useState({
    fandom: 'wszystko',
    nsfw: 'wszystko',
    type: 'wszystko',
    ship: ship ? ship : 'wszystko',
    finished: 'wszystko',
    title: ''
  })
  const [sort, setSort] = useState('Najnowsze')

  const [loading, setLoading] = useState(false)
  const [trigger, setTrigger] = useState(0)

  function onFilter(value: string, filterType: string) {
    setLoading(true)
    setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }))
      setTrigger(t => t + 1)
      setLoading(false)
    }, 400) 
  }

  useEffect(() => {
  const params = new URLSearchParams(searchParams.toString())
  if (filters.ship === 'wszystko') {
    params.delete('ship')
  } else {
    params.set('ship', filters.ship)
  }

  router.replace(`?${params.toString()}`, { scroll: false })
}, [router, searchParams, filters.ship])

  function onSort(value: string) {
    setLoading(true)
    setTimeout(() => {
      setSort(value)
      setTrigger(t => t + 1)
      setLoading(false)
    }, 400)
  }

  const fanficList = useMemo(() => {
    return fanficInfo.filter(f => {
      let ok = true

      if (filters.fandom && filters.fandom !== 'wszystko') {
        switch (filters.fandom) {
          case 'Genshin Impact':
            ok = ok && f.fandom === 'GI'
            break
          case 'Hetalia':
            ok = ok && f.fandom === 'APH'
            break
          case 'Voltron Legendary Defender':
            ok = ok && f.fandom === 'VLD'
            break
          case 'Tsubasa Reservoir Chronicle':
            ok = ok && f.fandom === 'TRC'
            break
          case "Twisted Wonderland":
            ok = ok && f.fandom === 'TW'
            break
          case 'światy oryginalne':
            ok = ok && f.fandom === ''
            break
        }
      }

      if (filters.nsfw && filters.nsfw !== 'wszystko') {
        if (filters.nsfw === 'tak') {
          ok = ok && f.nsfw === true
        }
        if (filters.nsfw === 'nie') {
          ok = ok && f.nsfw === false
        }
      }

      if (filters.type && filters.type !== 'wszystko') {
        if (filters.type === 'one-shot') {
          ok = ok && f.chapters === 1 && f.finished === true
        } else if (filters.type === 'wielorozdziałowiec') {
          ok = ok && f.chapters > 1
        }
      }

      if (filters.ship && filters.ship !== 'wszystko') {
        ok = ok && f.ship === filters.ship
      }

      if (filters.finished && filters.finished !== 'wszystko') {
        if (filters.finished === 'trwające') {
          ok = ok && f.finished === false
        } 
        else {
          ok = ok && f.finished === true
        }
      }

      if (filters.title) {
        ok = ok && f.title.toLowerCase().includes(filters.title.toLowerCase())
      }

      return ok
    })
  }, [filters, fanficInfo])

  const sortedList = useMemo(() => {
    const listCopy = [...fanficList]

    listCopy.sort((a, b) => {
      let yearA, yearB

      switch (sort) {
        case 'Najstarsze (data publikacji)':
          yearA = parseYear(a.date, true)
          yearB = parseYear(b.date, true)
          return yearA - yearB
        case 'Najnowsze (data publikacji)':
          yearA = parseYear(a.date, true)
          yearB = parseYear(b.date, true)
          return yearB - yearA
        case 'Najdłuższe':
          return parseWordCount(b.wordCount) - parseWordCount(a.wordCount)
        case 'Najkrótsze':
          return parseWordCount(a.wordCount) - parseWordCount(b.wordCount)
        default:
          return 0
      }
    })

    return listCopy
  }, [fanficList, sort])

  return <>
    <div className="w-full h-full p-4 font-mono text-center rounded-lg sm:p-8">
      <div className="flex justify-center items-center p-2 flex-wrap flex-col md:flex-row">
        <Filters onFilter={onFilter} filters={filters} onSort={onSort} />
      </div>

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={trigger}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="gap-6 flex flex-wrap justify-center p-8 sm:flex items-stretch"
          >
            {sortedList.length !== 0 ? (
              sortedList.map((item) => (
                <FanficCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  finished={item.finished}
                  titleEscaped={item.titleEscaped}
                  fandom={item.fandom}
                  chapters={item.chapters}
                  wordCount={item.wordCount}
                  nsfw={item.nsfw}
                />
              ))
            ) : (
              <p>Nic tu nie ma, spróbuj użyć innych filtrów!</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
}

export default ReadWrapper
