"use client";

import { useMemo, useState } from "react";
import { OC } from "@/types/types.api";
import OCCard from "./OcCard";
import FilterChip from "@/components/filters/FilterChip";

interface Props {
  oc: OC[];
}

function countLabel(n: number) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (n === 1) return `${n} postać`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} postacie`;
  return `${n} postaci`;
}

function OCWrapper({ oc }: Props) {
  const [universe, setUniverse] = useState("wszystko");
  const [loading, setLoading] = useState(false);

  const universes = useMemo(() => {
    const unique = Array.from(new Set(oc.map((c) => c.uniwersum).filter((u): u is string => !!u)));
    return ["wszystko", ...unique.sort((a, b) => a.localeCompare(b, "pl"))];
  }, [oc]);

  const [filtered, setFiltered] = useState<OC[]>(oc);

  function onFilter(value: string) {
    setUniverse(value);
    setLoading(true);
    setTimeout(() => {
      setFiltered(value === "wszystko" ? oc : oc.filter((c) => c.uniwersum === value));
      setLoading(false);
    }, 400);
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pb-24 text-left font-inter text-dark-plume dark:text-linen-cloud">
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <FilterChip
          label="Uniwersum"
          options={universes}
          value={universe}
          onChange={onFilter}
        />
        <span className="text-sm">
          <span className="font-semibold">{countLabel(filtered.length)}</span>
        </span>
      </div>
      <div
        className={`columns-1 sm:columns-2 lg:columns-3 gap-4 mt-6 transition-opacity duration-400 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {filtered.map((c) => (
          <OCCard
            oc={c}
            key={c.id}
          />
        ))}
      </div>
    </div>
  );
}

export default OCWrapper;