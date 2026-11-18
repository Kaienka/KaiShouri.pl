"use client";

import { Headcanon } from "@/types/types.api";
import HeadcanonCard from "./HeadcanonCard";
import HeadcanonFilter from "./HeadcanonFilter";
import { useState } from "react";

interface Props {
  headcanons: Headcanon[];
}

function countLabel(n: number) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (n === 1) return `${n} headcanon`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} headcanony`;
  return `${n} headcanonów`;
}

function HeadcanonsWrapper({ headcanons }: Props) {
  const [filteredHeadcanons, setFilteredHeadcanons] = useState<Headcanon[]>(headcanons);
  const [loading, setLoading] = useState(false);

  function filterHeadcanons(value: string) {
    setLoading(true);
    setTimeout(() => {
      if (!value || value === "wszystko") {
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pb-24 text-left font-inter text-dark-plume dark:text-linen-cloud">
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <HeadcanonFilter onFilter={filterHeadcanons} />
        <span className="text-sm">
          <span className="font-semibold">{countLabel(filteredHeadcanons.length)}</span>
        </span>
      </div>
      <div
        className={`columns-1 sm:columns-2 lg:columns-3 gap-4 mt-6 transition-opacity duration-400 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {filteredHeadcanons.map((h) => (
          <HeadcanonCard key={h.content} character={h.character} content={h.content} nsfw={h.nsfw} />
        ))}
      </div>
    </div>
  );
}

export default HeadcanonsWrapper;