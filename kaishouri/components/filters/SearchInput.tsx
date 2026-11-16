"use client";
import { useEffect, useState } from "react";
import { SearchIcon } from "./icons";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchInput({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    if (value === "") setQuery("");
  }, [value]);

  return (
    <label className="w-full md:flex-1 flex items-center gap-2.5 h-12 px-4 rounded-xl bg-nice-light-purple dark:bg-white/10 text-third-plum dark:text-fourth-plum focus-within:ring-2 focus-within:ring-plume-wine/40 dark:focus-within:ring-linen-cloud/40">
      <SearchIcon />
      <span className="sr-only">Szukaj po tytule</span>
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Szukaj po tytule…"
        className="flex-1 min-w-0 bg-transparent outline-none text-base text-dark-plume dark:text-linen-cloud placeholder:text-third-plum dark:placeholder:text-fourth-plum"
      />
    </label>
  );
}

export default SearchInput;
