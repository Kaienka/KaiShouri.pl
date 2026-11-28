import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

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
  folder?: string;
  words?: string[];
  label?: string;
  scope: string;
  recursive?: boolean;
  matchMode?: MatchMode;
};

type Result = {
  filesScanned: number;
  total: number;
};

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
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

const BLOCK_TAGS =
  "p|div|br|hr|li|ul|ol|dl|dt|dd|h[1-6]|tr|td|th|table|blockquote|section|article|" +
  "header|footer|main|nav|aside|pre|figure|figcaption|title";
const BLOCK_TAG_RE = new RegExp(`</?(?:${BLOCK_TAGS})\\b[^>]*>`, "gi");

function htmlToText(html: string): string {
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<head\b[\s\S]*?<\/head\s*>/gi, " ")
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(BLOCK_TAG_RE, " ")
    .replace(/<[^>]*>/g, "");

  return decodeEntities(stripped).normalize("NFC").replace(/\s+/g, " ");
}

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

function buildRegex(words: string[], mode: MatchMode): RegExp | null {
  const forms = [
    ...new Set(
      words
        .map((w) => w.trim().replace(/\s+/g, " ").normalize("NFC").toLocaleLowerCase("pl"))
        .filter(Boolean),
    ),
  ];
  if (forms.length === 0) return null;

  const alternatives = forms
    .sort((a, b) => b.length - a.length)
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

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
  const dir = path.join(process.cwd(), "fanfictions", folder);
  const names = await readdir(dir, { recursive });
  const regex = buildRegex(words, mode);

  let filesScanned = 0;
  let total = 0;

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

const STEAM_CSS = `
@keyframes kawa-steam-rise { to { stroke-dashoffset: 0; } }
.kawa-steam { stroke-dasharray: 1; stroke-dashoffset: 1; animation: kawa-steam-rise 1.4s ease-out 0.3s forwards; }
@media (prefers-reduced-motion: reduce) { .kawa-steam { animation: none; stroke-dashoffset: 0; } }
`;

function CupIcon() {
  return (
    <svg
      className="w-9 h-9 shrink-0 text-third-plum dark:text-fourth-plum"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="kawa-steam" pathLength={1} d="M16 17c-2.5-2.5 2.5-4.5 0-8" />
      <path className="kawa-steam" pathLength={1} d="M22 17c-2.5-2.5 2.5-4.5 0-8" />
      <path className="kawa-steam" pathLength={1} d="M28 17c-2.5-2.5 2.5-4.5 0-8" />
      <path d="M10 22h24v6a9 9 0 0 1-9 9h-6a9 9 0 0 1-9-9z" />
      <path d="M34 24h2a4 4 0 0 1 0 8h-2.5" />
      <path d="M6 41h32" />
    </svg>
  );
}

export default async function HtmlWordCounter({
  folder = "",
  words = DEFAULT_WORDS,
  label = "kawa",
  scope,
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

  const total = result.total;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STEAM_CSS }} />
      <aside
        aria-label="Ciekawostka"
        className="flex items-start gap-4 p-4 rounded-[14px] font-inter text-sm bg-fourth-plum/25 text-dark-plume dark:bg-white/8 dark:text-linen-cloud"
      >
        <CupIcon />
        <div className="min-w-0">
          <p className="m-0 mb-1 font-semibold text-plume-wine dark:text-nice-light-purple">Ciekawostka</p>
          <p className="m-0 leading-normal">
            Słowo „{label}” pojawiło się w {scope}, uwzględniając wszystkie formy gramatyczne:{" "}
            <span className="block mt-1.5 leading-none">
              <span className="font-mono text-[40px] font-semibold tabular-nums text-plume-wine dark:text-fourth-plum">
                {total.toLocaleString("pl-PL")}
              </span>{" "}
              <span className="text-base">{total === 1 ? "raz" : "razy"}.</span>
            </span>
          </p>
        </div>
      </aside>
    </>
  );
}