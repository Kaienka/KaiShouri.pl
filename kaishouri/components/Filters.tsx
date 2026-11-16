"use client";
import { useState } from "react";
import ships from "@/dicts/ships";
import fandoms from "@/dicts/fandoms";
import nsfw from "@/dicts/nsfw";
import types from "@/dicts/types";
import finished from "@/dicts/finished";
import SortBy from "./SortBy";
import FilterChip from "./filters/FilterChip";
import SearchInput from "./filters/SearchInput";
import MobileFilterSheet, { FilterGroup } from "./filters/MobileFilterSheet";
import { SlidersIcon, XIcon } from "./filters/icons";
import { ALL, formatOption, textsCount } from "./filters/labels";

type Props = {
  filters: {
    fandom: string;
    nsfw: string;
    type: string;
    ship: string;
    finished: string;
    title: string;
  };
  sort: string;
  resultCount: number;
  onFilter: (value: string, filterType: string) => void;
  onSort: (value: string) => void;
  onReset: () => void;
};

const GROUPS: FilterGroup[] = [
  { key: "fandom", label: "Fandom", options: fandoms },
  { key: "finished", label: "Status", options: finished },
  { key: "type", label: "Typ", options: types },
  { key: "ship", label: "Główny ship", options: ships },
  { key: "nsfw", label: "NSFW", options: nsfw },
];

function Filters({ filters, sort, resultCount, onFilter, onSort, onReset }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const active = GROUPS.filter((g) => filters[g.key] !== ALL);
  const anyActive = active.length > 0 || filters.title !== "";

  return (
    <section className="w-full max-w-6xl mx-auto font-inter text-left text-dark-plume dark:text-linen-cloud flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3">
        <SearchInput value={filters.title} onChange={(v) => onFilter(v, "title")} />
        <div className="hidden md:block">
          <SortBy value={sort} onSort={onSort} />
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <FilterChip
            key={g.key}
            label={g.label}
            options={g.options}
            value={filters[g.key]}
            onChange={(v) => onFilter(v, g.key)}
          />
        ))}
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-nice-light-purple dark:bg-white/10 text-[15px] font-semibold text-plume-wine dark:text-linen-cloud"
        >
          <SlidersIcon />
          Filtry
          {active.length > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-plume-wine text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume text-xs flex items-center justify-center">
              {active.length}
            </span>
          )}
        </button>
        <SortBy value={sort} onSort={onSort} />
      </div>

      {active.length > 0 && (
        <div className="flex md:hidden flex-wrap gap-2">
          {active.map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => onFilter(ALL, g.key)}
              aria-label={`Usuń filtr: ${formatOption(filters[g.key])}`}
              className="shrink-0 inline-flex items-center gap-1.5 h-9 pl-3.5 pr-2.5 rounded-full bg-plume-wine text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume text-sm font-medium"
            >
              {formatOption(filters[g.key])}
              <XIcon />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold text-plume-wine">{textsCount(resultCount)}</span>
        {anyActive && (
          <>
            <span aria-hidden className="text-third-plum dark:text-fourth-plum">·</span>
            <button
              type="button"
              onClick={onReset}
              className="h-8 font-semibold text-plume-wine dark:text-fourth-plum underline underline-offset-4"
            >
              Wyczyść filtry
            </button>
          </>
        )}
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        groups={GROUPS}
        values={filters}
        onFilter={onFilter}
        onReset={onReset}
        resultCount={resultCount}
      />
    </section>
  );
}

export default Filters;
