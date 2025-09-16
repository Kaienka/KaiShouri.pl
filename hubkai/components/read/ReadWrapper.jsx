'use client'
import Filters from "@/components/Filters"
import SortBy from "@/components/SortBy"
import FanficCard from "@/components/FanficCard";
import { useState, useMemo } from "react";


function parseYear(dateStr, newestFirst = false) {
    if (!dateStr) return 0
    if (newestFirst && dateStr.endsWith('-')) {
        return 9999
    }
    const match = dateStr.match(/\d{4}/)
    return match ? parseInt(match[0], 10) : 0
}

function parseWordCount(str) {
    if (!str) return 0
    str = str.replace('+', '')
    const match = str.match(/([\d.]+)k?/i)
    if (!match) return 0
    const num = parseFloat(match[1])
    return str.toLowerCase().includes('k') ? num * 1000 : num
}



function ReadWrapper({ fanficInfo }) {

    const [filters, setFilters] = useState({
        fandom: 'wszystko',
        nsfw: 'wszystko',
        type: 'wszystko',
        ship: 'wszystko',
        finished: 'wszystko',
        title: ''
    })

    const [sort, setSort] = useState('Najnowsze')


    function onFilter(value, filterType) {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
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
                        console.log(f.fandom)
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
                    ok = ok && f.finished == false
                } else {
                    ok = ok && f.finished == true
                }
            }

            if (filters.title) {
                ok = ok && f.title.toLowerCase().includes(filters.title.toLowerCase())
            }

            return ok
        })
    }, [filters, fanficInfo])


    function onSort(value) {
        setSort(value)
    }

    const sortedList = useMemo(() => {
        const listCopy = [...fanficList]

        listCopy.sort((a, b) => {
            let yearA, yearB

            switch (sort) {
                case 'Najstarsze':
                    yearA = parseYear(a.date)
                    yearB = parseYear(b.date)
                    return yearA - yearB
                case 'Najnowsze':
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
                <Filters onFilter={onFilter} />
                <SortBy onSort={onSort} />
            </div>
            <div className="gap-6 flex flex-wrap justify-center p-8 sm:flex items-stretch">
                {sortedList.length != 0 && sortedList.map((item) => (
                    <FanficCard
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        finished={item.finished}
                        titleEscaped={item.titleEscaped}
                        svg={item.svg}
                        fandom={item.fandom}
                        chapters={item.chapters}
                        wordCount={item.wordCount}
                        nsfw={item.nsfw}
                    />
                ))}
                {sortedList.length === 0 && <p>Nic tu nie ma, spróbuj użyć innych filtrów!</p>}
            </div>
        </div>
    </>
}

export default ReadWrapper;