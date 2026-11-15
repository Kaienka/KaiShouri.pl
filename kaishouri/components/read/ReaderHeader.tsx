"use client";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, BookIcon } from "./icons";
import ReadAloudButton, { SpeechControls } from "./ReadAloudButton";
import ReaderSettings, { FontSizeControls } from "./ReaderSettings";
import { chapterHref, chapterListHref, chapterShortTitle } from "./chapterLinks";

type Props = {
  fic: string;
  index: number;
  lastIndex: number;
  chapterTitles?: (string | null)[];
  speech: SpeechControls;
  font: FontSizeControls;
};

const iconBtn =
  "w-11 h-11 rounded-lg flex items-center justify-center text-plume-wine dark:text-linen-cloud hover:bg-violet-200/60 dark:hover:bg-white/10";
const arrowBtn =
  "w-11 h-11 rounded-lg  flex items-center justify-center text-plume-wine dark:text-linen-cloud hover:bg-violet-200/60 dark:hover:bg-white/10";


function ReaderHeader({ fic, index, lastIndex, chapterTitles, speech, font }: Props) {
  const hasPrev = index > 1;
  const hasNext = index < lastIndex;
  const title = chapterShortTitle(chapterTitles, index);

  return (
    <header className="w-full font-inter ">
      {/* ---------- Desktop ---------- */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-6 max-w-7xl mx-auto px-8 h-16">
        <div className="flex items-center">
          <Link
            href={chapterListHref(fic)}
            className="inline-flex items-center gap-2 h-11 px-3.5 rounded-lg text-[15px] font-medium text-dark-plume dark:text-linen-cloud hover:bg-violet-200/60 dark:hover:bg-white/10"
          >
            <BookIcon />
            Spis treści
          </Link>
        </div>

        <nav aria-label="Rozdziały" className="flex items-center gap-2">
          {hasPrev ? (
            <Link href={chapterHref(fic, index - 1)} aria-label="Poprzedni rozdział" className={arrowBtn}>
              <ChevronLeftIcon />
            </Link>
          ) : (
            <span className={`${arrowBtn} opacity-30 pointer-events-none`} aria-hidden>
              <ChevronLeftIcon />
            </span>
          )}

          <div className="text-center min-w-[280px] max-w-[420px] px-2 text-dark-plume dark:text-linen-cloud">
            <div className="text-xs font-medium uppercase tracking-wider opacity-75">
              Rozdział {index} z {lastIndex}
            </div>
            <div className="text-base font-semibold truncate" title={title}>
              {title}
            </div>
          </div>

          {hasNext ? (
            <Link href={chapterHref(fic, index + 1)} aria-label="Następny rozdział" className={arrowBtn}>
              <ChevronRightIcon />
            </Link>
          ) : (
            <span className={`${arrowBtn} opacity-30 pointer-events-none`} aria-hidden>
              <ChevronRightIcon />
            </span>
          )}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ReadAloudButton {...speech} variant="desktop" />
          <ReaderSettings {...font} />
        </div>
      </div>

      <div className="flex md:hidden items-center gap-1 px-1.5 h-14">
        <Link href={chapterListHref(fic)} aria-label="Spis treści" className={iconBtn}>
          <BookIcon size={22} />
        </Link>
        {hasPrev ? (
          <Link href={chapterHref(fic, index - 1)} aria-label="Poprzedni rozdział" className={iconBtn}>
            <ChevronLeftIcon />
          </Link>
        ) : (
          <span className={`${iconBtn} opacity-30 pointer-events-none`} aria-hidden>
            <ChevronLeftIcon />
          </span>
        )}
        <div className="flex-1 min-w-0 text-center text-dark-plume dark:text-linen-cloud">
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-75">
            Rozdział {index} z {lastIndex}
          </div>
          <div className="text-[15px] font-semibold truncate">{title}</div>
        </div>
        {hasNext ? (
          <Link href={chapterHref(fic, index + 1)} aria-label="Następny rozdział" className={iconBtn}>
            <ChevronRightIcon />
          </Link>
        ) : (
          <span className={`${iconBtn} opacity-30 pointer-events-none`} aria-hidden>
            <ChevronRightIcon />
          </span>
        )}
        <ReadAloudButton {...speech} variant="mobile" />
        <ReaderSettings {...font} />
      </div>
    </header>
  );
}

export default ReaderHeader;