"use client";
import { useEffect, useRef, useState } from "react";
import { Chapter } from "@/types/types.api";
import { useSpeech, useVoices } from "react-text-to-speech";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useRemark } from "react-remarkify";
import ReaderHeader from "./ReaderHeader";
import ChapterEndNav from "./ChapterEndNav";
import ReadingProgressBar from "./ReadingProgressBar";
import { useReadingProgress } from "./useReadingProgress";

const MIN_FONT = 0.75;
const MAX_FONT = 2.5;
const FONT_STEP = 0.125;

const PRONUNCIATION: [RegExp, string][] = [
  [/\bAaron/g, "Aron"],
];

function forSpeech(text: string) {
  return PRONUNCIATION.reduce((t, [from, to]) => t.replace(from, to), text);
}

function getCookie(name: string) {
  if (typeof window === "undefined") return null;
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof window === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function ChapterContent({
  fileContent,
  index,
  fic,
  chapterAmount,
  chapterTitles,
  onLoad,
}: Chapter) {
  const current = Number(index);
  const last = Number(chapterAmount);

  const { voices } = useVoices();
  const FEMALE = [
    "zofia",
    "paulina",
    "zosia",
    "agnieszka",
    "ewa",
    "maja",
    "google polski",
  ];
  const MALE = ["marek", "adam", "jacek", "krzysztof"];
  const polishVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("pl"),
  );
  
  const polishVoice =
    polishVoices.find((v) =>
      FEMALE.some((n) => v.name.toLowerCase().includes(n)),
    ) ??
    polishVoices.find(
      (v) => !MALE.some((n) => v.name.toLowerCase().includes(n)),
    ) ??
    polishVoices[0];

  const reactContent = useRemark({
    markdown: forSpeech(fileContent),
    rehypePlugins: [rehypeRaw, rehypeSanitize],
    remarkPlugins: [remarkGfm],
    remarkToRehypeOptions: { allowDangerousHtml: true },
  });
  const { speechStatus, start, pause, stop } = useSpeech({
    text: reactContent,
    stableText: true,
    lang: "pl-PL",
    voiceURI: polishVoice?.voiceURI || "",
  });
  const speech = { speechStatus, start, pause, stop };

  const [fontSize, setFontSize] = useState(() => {
    const fromCookie = parseFloat(getCookie("fontSize") ?? "");
    return Number.isFinite(fromCookie)
      ? Math.min(MAX_FONT, Math.max(MIN_FONT, fromCookie))
      : 1;
  });
  useEffect(() => {
    setCookie("fontSize", fontSize.toString());
  }, [fontSize]);

  const font = {
    fontSize,
    canIncrease: fontSize < MAX_FONT,
    canDecrease: fontSize > MIN_FONT,
    onIncrease: () => setFontSize((s) => Math.min(MAX_FONT, s + FONT_STEP)),
    onDecrease: () => setFontSize((s) => Math.max(MIN_FONT, s - FONT_STEP)),
  };

  const articleRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(articleRef);

  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  const styledContent =
    `<style>
      p { margin:0; padding:0.5rem 0; }
      h1, h2 { margin-bottom:1rem; }
    </style>` + fileContent;

  return (
    <div className="flex flex-col items-center w-full">
      <ReadingProgressBar progress={progress} />
      <ReaderHeader
        fic={fic}
        index={current}
        lastIndex={last}
        chapterTitles={chapterTitles}
        speech={speech}
        font={font}
      />

      <article
        ref={articleRef}
        className="m-4 p-4 w-10/12 sm:w-8/12 max-w-3xl font-inter flex flex-col items-center text-dark-plume dark:text-linen-cloud wrap-normal leading-relaxed"
        style={{ fontSize: `${fontSize}rem` }}
        dangerouslySetInnerHTML={{ __html: styledContent }}
      />

      <ChapterEndNav
        fic={fic}
        index={current}
        lastIndex={last}
        chapterTitles={chapterTitles}
      />
    </div>
  );
}

export default ChapterContent;