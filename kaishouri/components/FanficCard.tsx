'use client'
import Link from "next/link";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import { FanficShort } from "@/types/types.api";

function FanficCard({ title, description, finished, titleEscaped, fandom, wordCount, chapters, nsfw, abandoned }:FanficShort) {

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
        {fandom && <>fandom {fandom} · </>}{wordCount} słów · {chapters} {chaptersLabel}
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
        <PdfDownloadButton title={title} titleEscaped={titleEscaped} variant="icon" className="h-11 w-11" />
      </div>
    </article>
  );
}

export default FanficCard;
