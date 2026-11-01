"use client";

import { Headcanon } from "@/types/types.api";
import HeadcanonCard from "./HeadcanonCard";
import HeadcanonFilter from "./HeadcanonFilter";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { variants } from "@/app/utils/motion";

interface Props {
  headcanons: Headcanon[];
}

function HeadcanonsWrapper({ headcanons }: Props) {
  const [filteredHeadcanons, setFilteredHeadcanons] =
    useState<Headcanon[]>(headcanons)

  const [loading, setLoading] = useState(false)

  function filterHeadcanons(value: string) {
    setLoading(true)
    setTimeout(() => {
      if (!value || value === "Wszystko") {
        setFilteredHeadcanons(headcanons)
      } else {
        setFilteredHeadcanons(
          headcanons.filter(h =>
            h.character.toLowerCase() === value.toLowerCase()
          )
        )
      }
      setLoading(false)
    }, 400)
  }

  return (
    <>
      <HeadcanonFilter onFilter={filterHeadcanons} />
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={filteredHeadcanons.length}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch"
          >
            {filteredHeadcanons.map(h => (
              <HeadcanonCard
                key={h.content}
                character={h.character}
                content={h.content}
                nsfw={h.nsfw}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


export default HeadcanonsWrapper;
