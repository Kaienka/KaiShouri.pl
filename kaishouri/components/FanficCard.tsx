'use client'
import Link from "next/link";
import axios from "axios"
import { useState } from 'react'
import { FanficShort } from "@/types/types.api";

function FanficCard({ title, description, finished, titleEscaped, fandom, wordCount, chapters, nsfw, abandoned }:FanficShort) {

  const [isDownloading, setIsDownloading] = useState(false)

  const onDownload = async () => {
    try {
      setIsDownloading(true)
      const res = await axios.post(
        `/api/pdf/${titleEscaped}`,
        { title: title },
        {
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Kai Shouri - ${title}.pdf`
      a.click()
      a.remove()
    } catch (err) {
      console.error(err)
    } finally {
      setIsDownloading(false)
    }
  }

  const link = '/read/' + titleEscaped
  const status = abandoned ? "porzucone" : finished ? "zakończone" : "trwające"
  const chaptersLabel = chapters == 1 ? "rozdział" : chapters < 5 ? 'rozdziały' : "rozdziałów"

  return (
    <article className="flex flex-col gap-3 p-6 rounded-2xl text-left bg-nice-light-purple text-dark-plume dark:bg-dark-plume dark:text-linen-cloud">
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center h-6 px-2.5 rounded-full text-xs font-semibold font-inter bg-fourth-plum/40 text-plume-wine dark:bg-fourth-plum/20 dark:text-nice-light-purple">
          {status}
        </span>
        {nsfw && (
          <span className="inline-flex items-center h-6 px-2.5 rounded-full text-xs font-semibold font-inter bg-second-plum text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume">
            18+
          </span>
        )}
      </div>

      <h2 className="font-mono text-xl font-semibold leading-tight">{title}</h2>

      <p className="font-mono text-[13px] text-third-plum dark:text-fourth-plum">
        {fandom && <> {fandom} · </>}{wordCount} słów · {chapters} {chaptersLabel}
      </p>

      <p className="font-inter text-[15px] leading-relaxed line-clamp-6">{description}</p>

      <div className="mt-auto pt-2 flex items-center gap-2">
        <Link
          href={link}
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl font-inter text-[15px] font-semibold transition-colors bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume dark:hover:bg-nice-light-purple"
        >
          czytaj
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          aria-label={isDownloading ? 'pobieranie...' : 'pobierz pdf'}
          title={isDownloading ? 'pobieranie...' : 'pobierz pdf'}
          className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-colors disabled:cursor-wait bg-fourth-plum/40 text-plume-wine hover:bg-fourth-plum/70 dark:bg-fourth-plum/20 dark:text-nice-light-purple dark:hover:bg-fourth-plum/35"
        >
          {isDownloading ? (
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
          )}
        </button>
      </div>
    </article>
  );
}

export default FanficCard;