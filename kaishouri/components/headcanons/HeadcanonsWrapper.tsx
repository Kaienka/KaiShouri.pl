"use client";

import { Headcanon } from "@/types/types.api";
import HeadcanonCard from "./HeadcanonCard";
import HeadcanonFilter from "./HeadcanonFilter";
import { useState } from "react";

interface Props {
  headcanons: Headcanon[];
}

function HeadcanonsWrapper({ headcanons }: Props) {
  const [filteredHeadcanons, setFilteredHeadcanons] = useState<Headcanon[]>(headcanons);
  const [loading, setLoading] = useState(false);

  function filterHeadcanons(value: string) {
    setLoading(true);
    setTimeout(() => {
      if (!value || value === "Wszystko") {
        setFilteredHeadcanons(headcanons);
      } else {
        setFilteredHeadcanons(
          headcanons.filter((h) => h.character.toLowerCase() === value.toLowerCase())
        );
      }
      setLoading(false);
    }, 400);
  }

  return (
    <>
      <HeadcanonFilter onFilter={filterHeadcanons} />
      <div
        className={`gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch transition-opacity duration-400 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {filteredHeadcanons.map((h) => (
          <HeadcanonCard key={h.content} character={h.character} content={h.content} nsfw={h.nsfw} />
        ))}
      </div>
    </>
  );
}

export default HeadcanonsWrapper;