import Ao3Svg from "@/components/svg/Ao3Svg";
import WattpadSvg from "@/components/svg/WattpadSvg";
import FFSvg from "@/components/svg/FFSvg";
import Link from "next/link";
import { FanficDetails } from "@/types/types.api";
import HtmlWordCounter from "../addons/swan-hunt-coffee-meter/HtmlWordCounter";
import PdfDownloadButton from "@/components/PdfDownloadButton";

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);

async function Details({ fic, chapterTitles }: FanficDetails) {
  const status = fic.abandoned ? "porzucone" : fic.finished ? "zakończone" : "trwające";
  const chapters = chapterTitles?.length ?? 0;
  const chaptersLabel = chapters == 1 ? "rozdział" : chapters < 5 ? "rozdziały" : "rozdziałów";
  const firstChapter = `/read/${fic.titleEscaped}/1`;

  const platforms = [
    { href: fic.links?.ao3, name: "AO3", icon: <Ao3Svg /> },
    { href: fic.links?.ffnet, name: "FanFiction.net", icon: <FFSvg /> },
    { href: fic.links?.wattpad, name: "Wattpad", icon: <WattpadSvg /> },
  ].filter((p) => p.href);

  const readButton = (
    <Link
      href={firstChapter}
      className="flex items-center justify-center gap-2 h-12 rounded-xl font-inter text-base font-semibold transition-colors bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume dark:hover:bg-nice-light-purple"
    >
      Wszystkie teksty
      <ArrowRight />
    </Link>
  );

  const platformLinks = (pillBg: string) => platforms.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full font-inter text-sm font-medium transition-colors text-dark-plume hover:bg-fourth-plum/50 dark:bg-white/10 dark:text-linen-cloud dark:hover:bg-white/15 ${pillBg}`}
        >
          <span className="w-5 h-5 grid place-items-center [&_svg]:w-5 [&_svg]:h-5">{p.icon}</span>
          {p.name}
        </a>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-24 text-left text-dark-plume dark:text-linen-cloud grid lg:grid-cols-[minmax(0,1fr)_300px] gap-x-14 gap-y-8 items-start">
      <div className="flex flex-col gap-4 min-w-0">
        <Link
          href="/read"
          className="self-start inline-flex items-center gap-1.5 h-9 font-inter text-sm font-medium text-plume-wine dark:text-fourth-plum hover:underline underline-offset-4"
        >
          <ArrowLeft />
          Czytaj
        </Link>

        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center h-7 px-3 rounded-full font-inter text-[13px] font-semibold bg-fourth-plum/40 text-plume-wine dark:bg-fourth-plum/20 dark:text-nice-light-purple">
            {status}
          </span>
          {fic.ship && (
            <Link
              href={{ pathname: "/read", query: { ship: fic.ship } }}
              className="inline-flex items-center h-7 px-3 rounded-full font-inter text-[13px] font-semibold bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume"
            >
              {fic.ship}
            </Link>
          )}
          {fic.nsfw && (
            <span className="inline-flex items-center h-7 px-3 rounded-full font-inter text-[13px] font-semibold bg-second-plum text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume">
              18+
            </span>
          )}
        </div>

        <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">{fic.title}</h1>

        <p className="font-mono text-sm text-third-plum dark:text-fourth-plum">
          {fic.date}
          {fic.fandom && <> · fandom {fic.fandom}</>}
          {fic.wordCount && <> · {fic.wordCount} słów</>}
          {chapters > 0 && <> · {chapters} {chaptersLabel}</>}
        </p>

        <div className="flex gap-2 mt-2 lg:hidden">
          <div className="flex-1">{readButton}</div>
          <PdfDownloadButton title={fic.title} titleEscaped={fic.titleEscaped} variant="icon" />
        </div>

        <p className="mt-4 font-inter text-base sm:text-[17px] leading-relaxed max-w-[65ch]">{fic.description}</p>

        {fic.title === "Polowanie na łabędzia" && (
          <div className="mt-4 lg:hidden [--kawa-panel-bg:var(--color-nice-light-purple)]">
            <HtmlWordCounter folder="fanfictions/polowanienalabedzia/chapters"
              scope="Polowaniu na łabędzia" recursive variant="panel" />
          </div>
        )}

        <section className="mt-8 flex flex-col gap-3">
          <h2 className="font-mono text-lg font-semibold">Rozdziały: </h2>
          <div className="flex flex-col gap-1.5">
            {chapterTitles &&
              chapterTitles.map((chapter, index) => (
                <Link
                  href={`/read/${fic.titleEscaped}/${index + 1}`}
                  key={index}
                  className="flex items-center justify-between gap-3 min-h-13 px-4 py-3 rounded-xl font-mono text-[15px] transition-colors bg-nice-light-purple text-dark-plume hover:bg-fourth-plum/50 dark:bg-dark-plume dark:text-linen-cloud dark:hover:bg-white/10"
                >
                  {chapter ?? `Rozdział ${index + 1}`}
                  <span className="shrink-0 text-third-plum dark:text-fourth-plum">
                    <ChevronRight />
                  </span>
                </Link>
              ))}
          </div>
        </section>

        {platforms.length > 0 && <div className="mt-6 lg:hidden">{platformLinks("bg-nice-light-purple")}</div>}
      </div>

      <aside className="hidden lg:flex flex-col gap-2.5 sticky top-6 mt-[52px] p-6 rounded-2xl bg-nice-light-purple dark:bg-dark-plume">
        {readButton}
        <PdfDownloadButton title={fic.title} titleEscaped={fic.titleEscaped} />
        {platforms.length > 0 && <div className="mt-4">{platformLinks("bg-linen-cloud")}</div>}
        {fic.title === "Polowanie na łabędzia" && (
          <div className="mt-4">
            <HtmlWordCounter folder="fanfictions/polowanienalabedzia/chapters"
              scope="Polowaniu na łabędzia" recursive variant="panel" />
          </div>
        )}
      </aside>
    </div>
  );
}

export default Details;