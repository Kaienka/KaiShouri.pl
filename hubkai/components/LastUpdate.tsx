'use client'

import { useEffect, useState } from 'react'

export default function UpdatesList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/fanfictions-updates.json')
      .then(res => res.json())
      .then(data => {
        const parsed = Object.entries(data)
          .map(([fic, info]) => ({
            fic,
            chapter: info.chapter,
            fanficName: info.fanficName,
            updatedAt: new Date(info.updatedAt)
          }))
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .slice(0, 5)
        setItems(parsed)
      })
      .catch(() => setItems([]))
  }, [])

  if (items.length === 0) {
    return <p>Ładowanie aktualizacji...</p>
  }
  return (
    <main className='p-4'>
      <h1 className='text-l mb-4'>Ostatnie aktualizacje - testy na produkcji :))</h1>
      <ul className='space-y-2'>
        {items.map(({ fic, fanficName, chapter, updatedAt, finished, chapterNo }) => (
          <li key={fic}>
            <strong>{fanficName} — </strong> 
            {finished && chapterNo == 1 ? 'oneshot' :  `rozdział ${chapter}`}
            — {updatedAt.toLocaleDateString('pl-PL')}
          </li>
        ))}
      </ul>
    </main>
  )
}
