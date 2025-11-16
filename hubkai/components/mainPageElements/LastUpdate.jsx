"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

export default function UpdatesList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/fanfictions-updates.json")
      .then((res) => res.json())
      .then((data) => {
        const parsed = Object.entries(data)
          .map(([fic, info]) => ({
            fic,
            chapter: info.chapter,
            fanficName: info.fanficName,
            updatedAt: new Date(info.updatedAt),
            chapterNo: info.chapterNo,
            finished: info.finished,
          }))
          .sort((a, b) => b.updatedAt - a.updatedAt)
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
      <h1 className="text-l mb-4">Ostatnie aktualizacje:</h1>
      <ul className="space-y-2">
        {items.map(({ fic, fanficName, updatedAt, finished, chapterNo }) => (
          <li key={fic}>
            <Link href={`/read/${fic}/${chapterNo}`}>
              <motion.p whileHover={whileHover}>
                <strong>{fanficName}</strong>
                {finished && chapterNo == 1
                  ? " — one-shot"
                  : ` — rozdział ${chapterNo}`}
                — {updatedAt.toLocaleDateString("pl-PL")}
              </motion.p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
