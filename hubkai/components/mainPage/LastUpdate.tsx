"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { whileHover } from "@/app/utils/motion";
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
    return <p>Ładowanie aktualizacji...</p>;
  }
  return (
    <main className="p-4">
      <ul className="space-y-2">
        {items.map(({ fic, fanficName, updatedAt, finished, chapterNo }) => (
          <li key={fic}>
            <Link href={`/read/${fic}/${chapterNo}`}>
              <motion.p whileHover={whileHover}>
                <strong>{fanficName}</strong>
                {finished && chapterNo == 1
                  ? " — one-shot"
                  : ` — rozdział ${chapterNo} `}
                 — {updatedAt.toLocaleDateString("pl-PL")}
              </motion.p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
