"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useId, type ReactNode } from "react";

const LINE_WIDTH = 660; // szerszy niż najdłuższy tytuł; nadmiar jest ucinany
const LINE_HEIGHT = 12;

/*
 * Dwa nierówne pociągnięcia, jakby linia była rysowana dwa razy w tym samym miejscu.
 * Wygenerowane raz i wklejone jako stałe (bez losowania w kodzie), żeby serwer
 * i przeglądarka wyrenderowały dokładnie to samo.
 */
const STROKE_MAIN =
  "M0.0 4.3 C3.9 5.0 13.1 7.7 23.5 8.0 C33.9 8.3 50.5 6.6 62.3 6.3 C74.0 6.0 84.1 6.1 94.0 6.1 C103.9 6.1 110.5 6.5 121.8 6.4 C133.0 6.3 150.4 5.1 161.3 5.3 C172.1 5.4 177.0 7.2 187.0 7.2 C197.0 7.2 210.6 5.3 221.5 5.0 C232.3 4.8 241.3 5.4 252.3 5.4 C263.2 5.5 273.7 5.5 287.1 5.4 C300.5 5.4 317.8 5.3 332.6 5.2 C347.3 5.2 364.2 5.1 375.7 5.0 C387.1 5.0 392.0 4.7 401.1 4.9 C410.2 5.1 418.5 6.4 430.1 6.4 C441.6 6.3 456.3 4.6 470.4 4.6 C484.4 4.6 500.8 6.0 514.3 6.4 C527.8 6.8 537.5 6.8 551.2 6.9 C564.9 6.9 581.5 6.6 596.4 6.7 C611.3 6.8 629.9 7.7 640.5 7.4 C651.1 7.2 656.7 5.4 660.0 5.0";
const STROKE_SECOND =
  "M0.0 4.0 C5.7 4.2 21.1 4.8 34.5 5.2 C47.9 5.7 66.8 6.8 80.2 7.0 C93.5 7.1 102.2 6.1 114.6 5.9 C126.9 5.6 139.8 5.8 154.4 5.5 C168.9 5.2 187.4 4.1 201.8 4.2 C216.1 4.2 227.9 5.4 240.4 5.6 C252.9 5.9 266.0 5.9 276.8 5.6 C287.5 5.4 293.8 4.0 305.0 4.1 C316.2 4.2 329.6 5.9 344.1 6.1 C358.5 6.3 378.6 5.6 391.8 5.3 C404.9 5.0 412.7 4.0 422.8 4.0 C433.0 4.1 442.0 5.7 452.5 5.7 C463.0 5.8 472.2 4.5 485.9 4.3 C499.7 4.1 518.2 4.3 534.9 4.7 C551.5 5.1 571.0 6.9 585.9 6.8 C600.8 6.8 612.4 4.3 624.2 4.3 C636.1 4.3 651.1 6.8 657.1 6.7 C663.0 6.7 659.5 4.3 660.0 3.8";

/*
 * Faktura linii. Filtr SVG robi dwie rzeczy: nierówne, „kruszące się” krawędzie
 * (warp + scale) oraz ziarno papieru (grain), przez które kreska ma drobne przerwy.
 *  - warp   – gęstość zniekształcenia krawędzi (większa = drobniejsze)
 *  - scale  – siła zniekształcenia krawędzi w px
 *  - grain  – gęstość ziarna; dwie liczby (x y) dają smugi wzdłuż kreski
 *  - gain / offset – ile ziarna ma być dziurami (większy offset ujemny = więcej przerw)
 *  - widths / opacity – grubość i krycie głównego i drugiego pociągnięcia
 */
const TEXTURES = {
  pencil: {
    warp: 0.8,
    scale: 2.0,
    grain: "0.9 0.9",
    gain: 2.2,
    offset: -0.2,
    widths: [2, 1.1],
    opacity: [0.9, 0.55],
  },
  crayon: {
    warp: 0.8,
    scale: 2.4,
    grain: "0.25 1.2",
    gain: 2.2,
    offset: -0.12,
    widths: [2.8, 1.6],
    opacity: [0.9, 0.6],
  },
} as const;

// Miękki początek i koniec kreski (jakby ołówek delikatnie odrywał się od papieru).
const SOFT_ENDS =
  "linear-gradient(90deg, transparent 0, #000 5px, #000 calc(100% - 16px), transparent 100%)";

// Musi być utworzone poza komponentem, żeby nie tworzyć nowego typu przy każdym renderze.
const MotionLink = motion.create(Link);

type Props = {
  href: string;
  className?: string;
  /** "crayon" – grubsza, woskowa kreska; "pencil" – cieńsza, grafitowa. */
  texture?: keyof typeof TEXTURES;
  children: ReactNode;
};

/**
 * Link z nierównym podkreśleniem w stylu kredki/ołówka, które „rysuje się” od lewej
 * strony po najechaniu lub ustawieniu fokusu (klawiatura). Kolor kreski = kolor tekstu.
 */
export default function UnderlineLink({
  href,
  className,
  texture = "crayon",
  children,
}: Props) {
  const reduceMotion = useReducedMotion();
  // Unikalne id filtra dla każdego linku (useId zawiera dwukropki, które usuwamy).
  const filterId = `pencil-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const t = TEXTURES[texture];

  return (
    <MotionLink
      href={href}
      className={className}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <span className="relative inline-block">
        {children}
        {/* Okno o szerokości tekstu; kreska jest odsłaniana od lewej, a nie rozciągana. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-2 h-3 overflow-hidden"
          style={{ maskImage: SOFT_ENDS, WebkitMaskImage: SOFT_ENDS }}
          variants={{
            rest: { clipPath: "inset(0 100% 0 0)" },
            hover: { clipPath: "inset(0 0% 0 0)" },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <svg
            width={LINE_WIDTH}
            height={LINE_HEIGHT}
            viewBox={`0 0 ${LINE_WIDTH} ${LINE_HEIGHT}`}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <filter
                id={filterId}
                filterUnits="userSpaceOnUse"
                x={-2}
                y={-4}
                width={LINE_WIDTH + 4}
                height={LINE_HEIGHT + 8}
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={t.warp}
                  numOctaves={2}
                  seed={4}
                  result="warp"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="warp"
                  scale={t.scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="rough"
                />
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={t.grain}
                  numOctaves={2}
                  seed={9}
                  result="grain"
                />
                <feColorMatrix
                  in="grain"
                  type="matrix"
                  values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${t.gain} 0 0 0 ${t.offset}`}
                  result="tooth"
                />
                <feComposite in="rough" in2="tooth" operator="in" />
              </filter>
            </defs>
            <g filter={`url(#${filterId})`}>
              <path d={STROKE_MAIN} strokeWidth={t.widths[0]} opacity={t.opacity[0]} />
              <path d={STROKE_SECOND} strokeWidth={t.widths[1]} opacity={t.opacity[1]} />
            </g>
          </svg>
        </motion.span>
      </span>
    </MotionLink>
  );
}