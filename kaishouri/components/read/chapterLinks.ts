export const chapterHref = (fic: string, n: number) => `/read/${fic}/${n}`;
export const chapterListHref = (fic: string) => `/read/${fic}`;

type Titles = (string | null)[] | undefined;

export function chapterTitle(chapterTitles: Titles, n: number) {
  return chapterTitles?.[n - 1] || `Rozdział ${n}`;
}


export function chapterShortTitle(chapterTitles: Titles, n: number) {
  const full = chapterTitle(chapterTitles, n);
  const short = full.replace(/^\s*rozdział\s+[^:–—-]+\s*[:–—-]\s*/i, "").trim();
  return short || full;
}
