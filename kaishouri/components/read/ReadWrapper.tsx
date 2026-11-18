"use client";
import Filters from "@/components/Filters";
import FanficCard from "@/components/FanficCard";
import { useState, useMemo, useEffect } from "react";
import { Fanfic } from "@/types/types.api";
import { useRouter, useSearchParams } from "next/navigation";

function parseYear(dateStr: string, newestFirst = false) {
  if (!dateStr) return 0;
  if (newestFirst && dateStr.endsWith("-")) {
    dateStr = dateStr.split("-")[0];
  }
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

function sortKey(f: Fanfic) {
  if (f.published) {
    const t = Date.parse(f.published);
    if (!Number.isNaN(t)) return t;
  }
  const year = parseYear(f.date, true);
  return year ? Date.UTC(year, 0, 1) : 0;
}

function ReadWrapper({ fanficInfo }: { fanficInfo: Fanfic[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ship = searchParams.get("ship");

  const [filters, setFilters] = useState({
    fandom: "wszystko",
    nsfw: "wszystko",
    type: "wszystko",
    ship: ship ? ship : "wszystko",
    finished: "wszystko",
    title: "",
  });
  const [sort, setSort] = useState("Ostatnio aktualizowane");

  const [loading, setLoading] = useState(false);

  function onFilter(value: string, filterType: string) {
    setLoading(true);
    setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
      setLoading(false);
    }, 400);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (filters.ship === "wszystko") {
      params.delete("ship");
    } else {
      params.set("ship", filters.ship);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams, filters.ship]);

  function onSort(value: string) {
    setLoading(true);
    setTimeout(() => {
      setSort(value);
      setLoading(false);
    }, 400);
  }

  function onReset() {
    setLoading(true);
    setTimeout(() => {
      setFilters({
        fandom: "wszystko",
        nsfw: "wszystko",
        type: "wszystko",
        ship: "wszystko",
        finished: "wszystko",
        title: "",
      });
      setLoading(false);
    }, 400);
  }

  const fanficList = useMemo(() => {
    return fanficInfo.filter((f) => {
      let ok = true;

      if (filters.fandom && filters.fandom !== "wszystko") {
        switch (filters.fandom) {
          case "Genshin Impact":
            ok = ok && f.fandom === "GI";
            break;
          case "Hetalia":
            ok = ok && f.fandom === "APH";
            break;
          case "Voltron Legendary Defender":
            ok = ok && f.fandom === "VLD";
            break;
          case "Tsubasa Reservoir Chronicle":
            ok = ok && f.fandom === "TRC";
            break;
          case "Twisted Wonderland":
            ok = ok && f.fandom === "TW";
            break;
          case "światy oryginalne":
            ok = ok && f.fandom === "";
            break;
        }
      }

      if (filters.nsfw && filters.nsfw !== "wszystko") {
        if (filters.nsfw === "tak") {
          ok = ok && f.nsfw === true;
        }
        if (filters.nsfw === "nie") {
          ok = ok && f.nsfw === false;
        }
      }

      if (filters.type && filters.type !== "wszystko") {
        if (filters.type === "one-shot") {
          ok = ok && f.chapters === 1 && f.finished === true;
        } else if (filters.type === "wielorozdziałowiec") {
          ok = ok && f.chapters > 1;
        }
      }

      if (filters.ship && filters.ship !== "wszystko") {
        ok = ok && f.ship === filters.ship;
      }

      if (filters.finished === "trwające") {
        ok = ok && f.finished === false && !f.abandoned;
      } else if (filters.finished === "zakończone") {
        ok = ok && f.finished === true && !f.abandoned;
      } else if (filters.finished === "porzucone") {
        ok = ok && f.abandoned === true;
      }

      if (filters.title) {
        ok = ok && f.title.toLowerCase().includes(filters.title.toLowerCase());
      }

      return ok;
    });
  }, [filters, fanficInfo]);

  const sortedList = useMemo(() => {
    const listCopy = [...fanficList];

    listCopy.sort((a, b) => {

      switch (sort) {
        case "Najstarsze (rok publikacji)":
          return sortKey(a) - sortKey(b) || a.title.localeCompare(b.title, "pl");
        case "Najnowsze (rok publikacji)":
          return sortKey(b) - sortKey(a) || a.title.localeCompare(b.title, "pl");
        case "Ostatnio aktualizowane":
          return (Date.parse(b.updatedAt ?? "") || 0) - (Date.parse(a.updatedAt ?? "") || 0);
        case "Najdłuższe":
          return b.wordCount - a.wordCount;
        case "Najkrótsze":
          return a.wordCount - b.wordCount;
        default:
          return 0;
      }
    });

    return listCopy;
  }, [fanficList, sort]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-24 text-left">
      <h1 className="font-mono text-3xl font-semibold mb-6 text-dark-plume dark:text-linen-cloud">
        Czytaj
      </h1>

      <Filters
        onFilter={onFilter}
        filters={filters}
        onSort={onSort}
        sort={sort}
        resultCount={sortedList.length}
        onReset={onReset}
      />

      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-8 transition-opacity duration-400 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
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
              abandoned={item.abandoned}
            />
          ))
        ) : (
          <p className="col-span-full text-center font-mono text-dark-plume dark:text-linen-cloud">
            Nic tu nie ma, spróbuj użyć innych filtrów!
          </p>
        )}
      </div>
    </div>
  );
}

export default ReadWrapper;
