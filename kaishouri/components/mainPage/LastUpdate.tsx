"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FanficUpdate, LastUpdate } from "@/types/types.api";

export default function UpdatesList() {
  const [items, setItems] = useState<LastUpdate[]>([]);

  useEffect(() => {
    fetch("/fanfictions-updates.json")
      .then((res) => res.json())
      .then((data: Record<string, FanficUpdate>) => {
        const parsed = Object.entries(data)
          .map(([fic, info]) => ({
            fic,
            chapter: info.chapter,
            fanficName: info.fanficName,
            updatedAt: new Date(info.updatedAt),
            chapterNo: info.chapterNo,
            finished: info.finished,
          }))
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .slice(0, 5);
        setItems(parsed);
      })
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) {
    return (
      <p className="font-inter text-[15px] text-third-plum dark:text-fourth-plum">
        Ładowanie aktualizacji...
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-3 font-mono text-[15px] leading-normal">
      {items.map(({ fic, fanficName, updatedAt, finished, chapterNo }) => (
        <li key={fic}>
          <Link
            href={`/read/${fic}/${chapterNo}`}
            className="inline-block origin-left transition-transform duration-200 hover:scale-110 text-third-plum dark:text-fourth-plum"
          >
            <span className="font-semibold text-dark-plume dark:text-linen-cloud">
              {fanficName}
            </span>
            {finished && chapterNo == 1
              ? " — one-shot "
              : ` — rozdział ${chapterNo} `}
            — {updatedAt.toLocaleDateString("pl-PL")}
          </Link>
        </li>
      ))}
    </ul>
  );
}
