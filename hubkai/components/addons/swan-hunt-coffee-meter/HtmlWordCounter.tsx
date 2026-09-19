/**
 * HtmlWordCounter – Server Component (Next.js App Router), wszystko w jednym pliku.
 *
 * Czyta wszystkie pliki .html / .htm z podanego folderu i zlicza – sumarycznie
 * dla wszystkich plików – wystąpienia wszystkich form z tablicy `words`.
 * Liczony jest tylko widoczny tekst (bez tagów, atrybutów, <script> i <style>).
 * Wynik wyświetlany jest w ramce-ciekawostce.
 *
 * Użycie:
 *   <HtmlWordCounter folder="fanfictions" scope="moich fanfikach" recursive />
 *   <HtmlWordCounter folder="fanfictions" scope="moich fanfikach" recursive variant="site" />
 *
 * Komponent używa `fs`, więc działa wyłącznie po stronie serwera (bez "use client").
 * Wariant "coffee": kolor akcentu zmienisz zmienną CSS --kawa-accent ustawioną
 * na dowolnym elemencie nadrzędnym. Wariant "site" używa kolorów z motywu strony.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

// Wszystkie formy gramatyczne słowa "kawa" (bez powtórzeń).
const DEFAULT_WORDS = [
  "kawa",
  "kawy",
  "kaw",
  "kawie",
  "kawom",
  "kawę",
  "kawą",
  "kawami",
  "kawach",
  "kawo",
];

type MatchMode = "word" | "substring";

type Props = {
  /** Folder z plikami HTML: ścieżka względem katalogu głównego projektu lub bezwzględna. */
  folder?: string;
  /** Formy słowa do zliczenia. */
  words?: string[];
  /** Słowo podstawowe wyświetlane w komunikacie. */
  label?: string;
  /** Nazwa wstawiana po „pojawiło się w”, np. "moich fanfikach". */
  scope?: string;
  /**
   * "coffee" – karmelowy akcent na tle strony (kolor: --kawa-accent),
   * "site"   – kolory strony (śliwkowa paleta z @theme), ramka na własnym jasnym tle.
   */
  variant?: "coffee" | "site";
  /** Czy przeszukiwać również podfoldery. */
  recursive?: boolean;
  /**
   * "word"      – tylko całe słowa ("kaw" nie trafi w "kawiarnia"),
   * "substring" – dowolne wystąpienie ciągu znaków.
   */
  matchMode?: MatchMode;
};

type Result = {
  /** Liczba przeskanowanych plików HTML. */
  filesScanned: number;
  /** Łączna liczba wystąpień we wszystkich plikach. */
  total: number;
};

/* ------------------------------ przetwarzanie HTML ------------------------------ */

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  // Polskie litery zapisane nazwanymi encjami (bez tego "kaw&aogon;" łapałoby się jako "kaw").
  aogon: "ą",
  cacute: "ć",
  eogon: "ę",
  lstrok: "ł",
  nacute: "ń",
  oacute: "ó",
  sacute: "ś",
  zacute: "ź",
  zdot: "ż",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const isHex = entity[1].toLowerCase() === "x";
      const code = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

// Tagi blokowe rozdzielają słowa (jak w przeglądarce); zwykłe tagi inline (<i>, <span>...) nie.
const BLOCK_TAGS =
  "p|div|br|hr|li|ul|ol|dl|dt|dd|h[1-6]|tr|td|th|table|blockquote|section|article|" +
  "header|footer|main|nav|aside|pre|figure|figcaption|title";
const BLOCK_TAG_RE = new RegExp(`</?(?:${BLOCK_TAGS})\\b[^>]*>`, "gi");

function htmlToText(html: string): string {
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<head\b[\s\S]*?<\/head\s*>/gi, " ") // tytuł strony zwykle powtarza się w <h1>
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(BLOCK_TAG_RE, " ")
    .replace(/<[^>]*>/g, "");

  return decodeEntities(stripped).normalize("NFC").replace(/\s+/g, " ");
}

/** UTF-8, a gdy plik nie jest poprawnym UTF-8 – kodowanie z <meta charset> (domyślnie windows-1250). */
function decodeFile(buf: Buffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    const head = buf.subarray(0, 2048).toString("latin1");
    const label = /charset\s*=\s*["']?([\w-]+)/i.exec(head)?.[1] ?? "windows-1250";
    try {
      return new TextDecoder(label).decode(buf);
    } catch {
      return new TextDecoder("windows-1250").decode(buf);
    }
  }
}

/* ---------------------------------- liczenie ---------------------------------- */

/**
 * Wszystkie formy trafiają do jednego wyrażenia regularnego, więc każde
 * wystąpienie jest liczone dokładnie raz (bez ryzyka podwójnego zliczenia).
 */
function buildRegex(words: string[], mode: MatchMode): RegExp | null {
  const forms = [
    ...new Set(
      words
        .map((w) => w.trim().replace(/\s+/g, " ").normalize("NFC").toLocaleLowerCase("pl"))
        .filter(Boolean),
    ),
  ];
  if (forms.length === 0) return null;

  // Dłuższe formy najpierw, żeby w trybie "substring" dłuższe dopasowanie wygrywało z krótszym.
  const alternatives = forms
    .sort((a, b) => b.length - a.length)
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  // \b nie działa z polskimi znakami, dlatego granice słów są liczone przez \p{L}/\p{N}.
  const source =
    mode === "word"
      ? `(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`
      : alternatives;

  return new RegExp(source, "giu");
}

async function countInFolder(
  folder: string,
  words: string[],
  recursive: boolean,
  mode: MatchMode,
): Promise<Result> {
  const dir = path.resolve(process.cwd(), folder);
  const names = await readdir(dir, { recursive });
  const regex = buildRegex(words, mode);

  let filesScanned = 0;
  let total = 0;

  // Pliki czytane po kolei, żeby przy tysiącach plików nie przekroczyć limitu otwartych deskryptorów.
  for (const name of names) {
    if (!/\.html?$/i.test(name)) continue;

    const file = path.join(dir, name);
    if (!(await stat(file)).isFile()) continue;

    filesScanned++;
    if (!regex) continue;

    const text = htmlToText(decodeFile(await readFile(file)));
    total += text.match(regex)?.length ?? 0;
  }

  return { filesScanned, total };
}

/* ----------------------------------- style ------------------------------------ */

/*
 * Dwa warianty wyglądu, przełączane propem `variant`. Oba korzystają z tych
 * samych zmiennych --k-*, więc różnią się wyłącznie kolorami.
 */
const CSS = `
.kawa-card {
  /* domyślny wariant "coffee": kolory z jednego akcentu, tło ze strony */
  --k-accent: var(--kawa-accent, #b8651b);
  --k-icon: var(--k-accent);
  --k-steam: var(--k-accent);
  --k-count: var(--k-accent);
  --k-border: color-mix(in srgb, var(--k-accent) 60%, transparent);
  --k-bg: color-mix(in srgb, var(--k-accent) 8%, transparent);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-sizing: border-box;
  max-width: 34rem;
  padding: 1.1rem 1.25rem;
  border: 2px dashed var(--k-border);
  border-radius: 14px;
  background: var(--k-bg);
}
.kawa-icon {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  color: var(--k-icon);
}
.kawa-steam {
  stroke: var(--k-steam);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: kawa-steam-rise 1.4s ease-out 0.3s forwards;
}
@keyframes kawa-steam-rise {
  to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .kawa-steam { animation: none; stroke-dashoffset: 0; }
}
.kawa-body { min-width: 0; }
.kawa-title {
  margin: 0 0 0.3rem;
  font-size: 0.95rem;
  font-weight: 600;
}
.kawa-text {
  margin: 0;
  line-height: 1.5;
}
.kawa-result {
  display: block;
  margin-top: 0.4rem;
  line-height: 1.1;
}
.kawa-count {
  font-size: clamp(2.25rem, 7vw, 3.25rem);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--k-count);
}
.kawa-unit { font-size: 1.05rem; }

/*
 * Wariant "site": paleta strony. Zmienne --color-* pochodzą z @theme w Tailwindzie,
 * ale Tailwind 4 usuwa nieużywane zmienne z wynikowego CSS, dlatego każda ma
 * awaryjną wartość hex. Ramka ma własne, jasne tło i ciemny tekst, więc wygląda
 * tak samo niezależnie od tła strony.
 */
.kawa-card[data-variant="site"] {
  --k-icon: var(--color-third-plum, #795295);
  --k-steam: var(--color-dime-blue, #6c83ae);
  --k-count: var(--color-plume-wine, #5e4074);
  --k-border: var(--color-fourth-plum, #c2acd1);
  --k-bg: var(--color-nice-light-purple, #f1ecf9);
  color: var(--color-dark-plume, #402d4e);
}
.kawa-card[data-variant="site"] .kawa-title {
  color: var(--color-plume-wine, #5e4074);
}
`;

/* ------------------------------------ ikona ------------------------------------ */

function CupIcon() {
  return (
    <svg
      className="kawa-icon"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* para nad filiżanką */}
      <path className="kawa-steam" pathLength={1} d="M16 17c-2.5-2.5 2.5-4.5 0-8" />
      <path className="kawa-steam" pathLength={1} d="M22 17c-2.5-2.5 2.5-4.5 0-8" />
      <path className="kawa-steam" pathLength={1} d="M28 17c-2.5-2.5 2.5-4.5 0-8" />
      {/* filiżanka, ucho i spodek */}
      <path d="M10 22h24v6a9 9 0 0 1-9 9h-6a9 9 0 0 1-9-9z" />
      <path d="M34 24h2a4 4 0 0 1 0 8h-2.5" />
      <path d="M6 41h32" />
    </svg>
  );
}

/* ---------------------------------- komponent ---------------------------------- */

export default async function HtmlWordCounter({
  folder = "fanfictions",
  words = DEFAULT_WORDS,
  label = "kawa",
  scope = "Y", // placeholder – podmień na własną nazwę
  variant = "coffee",
  recursive = false,
  matchMode = "word",
}: Props) {
  let result: Result;

  try {
    result = await countInFolder(folder, words, recursive, matchMode);
  } catch (error) {
    const notFound = (error as NodeJS.ErrnoException).code === "ENOENT";
    return (
      <p role="alert">
        {notFound
          ? `Nie znaleziono folderu „${folder}”. Sprawdź ścieżkę.`
          : "Nie udało się odczytać plików. Sprawdź uprawnienia do folderu."}
      </p>
    );
  }

  if (result.filesScanned === 0) {
    return <p>W folderze „{folder}” nie ma plików .html.</p>;
  }

  const fmt = (n: number) => n.toLocaleString("pl-PL");
  const total = result.total;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <aside className="kawa-card" data-variant={variant} aria-label="Ciekawostka">
        <CupIcon />
        <div className="kawa-body">
          <p className="kawa-title">Ciekawostka</p>
          <p className="kawa-text">
            Słowo „{label}” pojawiło się w {scope}, uwzględniając wszystkie formy gramatyczne:{" "}
            <span className="kawa-result">
              <span className="kawa-count">{fmt(total)}</span>{" "}
              <span className="kawa-unit">{total === 1 ? "raz" : "razy"}.</span>
            </span>
          </p>
        </div>
      </aside>
    </>
  );
}