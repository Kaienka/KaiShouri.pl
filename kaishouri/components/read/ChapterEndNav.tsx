import Link from "next/link";
import { chapterHref, chapterListHref, chapterTitle } from "./chapterLinks";

type Props = {
  fic: string;
  index: number;
  lastIndex: number;
  chapterTitles?: (string | null)[];
};

/** Duże karty „Poprzedni / Następny” pod tekstem rozdziału. */
function ChapterEndNav({ fic, index, lastIndex, chapterTitles }: Props) {
  const hasPrev = index > 1;
  const hasNext = index < lastIndex;

  const card =
    "flex flex-col gap-1 px-5 py-4 rounded-2xl no-underline text-dark-plume dark:text-linen-cloud transition-colors hover:bg-violet-200/50 dark:hover:bg-white/10";

  return (
    <nav aria-label="Koniec rozdziału" className="w-10/12 sm:w-8/12 max-w-3xl mx-auto mt-10 mb-6 font-inter">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hasPrev ? (
          <Link href={chapterHref(fic, index - 1)} className={`${card} border-bg-second-plum`}>
            <span className="text-[13px] opacity-75">← Poprzedni</span>
            <span className="font-semibold">{chapterTitle(chapterTitles, index - 1)}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}

        {hasNext ? (
          <Link
            href={chapterHref(fic, index + 1)}
            className={`${card} sm:text-right border-plume-wine dark:border-linen-cloud bg-white/60 dark:bg-white/5`}
          >
            <span className="text-[13px] font-medium text-plume-wine dark:text-linen-cloud">Następny →</span>
            <span className="font-semibold">{chapterTitle(chapterTitles, index + 1)}</span>
          </Link>
        ) : (
          <Link href={chapterListHref(fic)} className={`${card} sm:text-right border-plume-wine dark:border-linen-cloud`}>
            <span className="text-[13px] font-medium text-plume-wine dark:text-linen-cloud">To już koniec</span>
            <span className="font-semibold">Wróć do spisu treści</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default ChapterEndNav;
