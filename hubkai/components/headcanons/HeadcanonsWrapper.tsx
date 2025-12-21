"use client";

import { Headcanon } from "@/types/types.api";
import HeadcanonCard from "./HeadcanonCard";
import HeadcanonFilter from "./HeadcanonFilter";
import { useState } from "react";

interface Props {
  headcanons: Headcanon[];
}

function HeadcanonsWrapper({ headcanons }: Props) {
  const [filteredHeadcanons, setFilteredHeadcanons] =
    useState<Headcanon[]>(headcanons);

  function filterHeadcanons(value: string): void {
    if (!value || value == 'Wszystko') {
      setFilteredHeadcanons(headcanons);
      return;
    }

      setFilteredHeadcanons(
        headcanons.filter((h: Headcanon) => h.character.toLowerCase() === value.toLowerCase())
      );
  }

  return (
    <>
      <HeadcanonFilter onFilter={filterHeadcanons} />
      <div className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch">
        {filteredHeadcanons.map((h: Headcanon) => (
          <HeadcanonCard
            key={h.content}
            character={h.character}
            content={h.content}
            nsfw={h.nsfw}
          />
        ))}
      </div>
    </>
  );
}

export default HeadcanonsWrapper;
