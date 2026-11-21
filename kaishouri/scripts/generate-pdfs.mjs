import fs from "fs";
import path from "path";
import React from "react";
import { Document, Page, View, Text, StyleSheet, Font, renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const h = React.createElement;

const ROOT = process.cwd();
const FIC_ROOT = path.join(ROOT, "fanfictions");
const OUT_DIR = path.join(ROOT, "public", "pdf");
const FONT_DIR = path.join(ROOT, "public", "fonts");

Font.register({
  family: "Noto Serif",
  fonts: [
    { src: path.join(FONT_DIR, "NotoSerif-Regular.ttf") },
    { src: path.join(FONT_DIR, "NotoSerif-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(FONT_DIR, "NotoSerif-Italic.ttf"), fontStyle: "italic" },
    { src: path.join(FONT_DIR, "NotoSerif-BoldItalic.ttf"), fontWeight: "bold", fontStyle: "italic" },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const ENTITIES = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  hellip: "…", ndash: "–", mdash: "—", bdquo: "„", rdquo: "”", ldquo: "“",
  lsquo: "‘", rsquo: "’", laquo: "«", raquo: "»",
  aogon: "ą", Aogon: "Ą", cacute: "ć", Cacute: "Ć", eogon: "ę", Eogon: "Ę",
  lstrok: "ł", Lstrok: "Ł", nacute: "ń", Nacute: "Ń", oacute: "ó", Oacute: "Ó",
  sacute: "ś", Sacute: "Ś", zacute: "ź", Zacute: "Ź", zdot: "ż", Zdot: "Ż",
};

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1].toLowerCase() === "x";
      const code = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[entity] ?? ENTITIES[entity.toLowerCase()] ?? match;
  });
}

const BLOCK_TAGS = new Set(["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "li", "center", "pre", "section", "article"]);
const BOLD_TAGS = new Set(["b", "strong"]);
const ITALIC_TAGS = new Set(["i", "em", "cite"]);

const SHORT_WORD = /(?<=^|[\s(„"«»“–—-])([aiouwzAIOUWZ])\s(?=\S)/g;

function bindShortWords(runs) {
  const joined = runs.map((r) => r.text).join("");
  const bound = joined.replace(SHORT_WORD, "$1\u00a0");
  let pos = 0;
  for (const run of runs) {
    run.text = bound.slice(pos, pos + run.text.length);
    pos += run.text.length;
  }
}

export function parseChapter(html) {
  const source = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<head\b[\s\S]*?<\/head\s*>/gi, "")
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, "");

  const blocks = [];
  const lists = [];
  let quoteDepth = 0;
  let bold = 0;
  let italic = 0;
  let current = null;

  function start(type, extra = {}) {
    flush();
    current = { type, runs: [], quote: quoteDepth > 0, ...extra };
  }

  function flush() {
    if (!current) return;
    const runs = current.runs;
    bindShortWords(runs);
    if (runs.length) {
      runs[0].text = runs[0].text.replace(/^\s+/, "");
      const last = runs[runs.length - 1];
      last.text = last.text.replace(/\s+$/, "");
    }
    current.runs = runs.filter((r) => r.text.length > 0);
    const plain = current.runs.map((r) => r.text).join("");
    if (/^[\s\u00a0]*(\*[\s\u00a0]*){3,}$/.test(plain)) {
      current.type = "scene";
    }
    if (current.runs.some((r) => r.text.trim())) blocks.push(current);
    current = null;
  }

  function addText(text) {
    if (!current) start("p");
    const prev = current.runs[current.runs.length - 1];
    const b = bold > 0;
    const i = italic > 0;
    if (prev && prev.bold === b && prev.italic === i) prev.text += text;
    else current.runs.push({ text, bold: b, italic: i });
  }

  const TOKEN = /<(\/?)([a-z][a-z0-9]*)\b[^>]*?(\/?)>|([^<]+)|(<)/gi;
  let m;
  while ((m = TOKEN.exec(source))) {
    const [full, closing, rawTag, selfClosing, text, stray] = m;

    if (text !== undefined || stray !== undefined) {
      const decoded = decodeEntities(text ?? stray).replace(/\s+/g, " ");
      if (decoded && (current || decoded.trim())) addText(decoded);
      continue;
    }

    const tag = rawTag.toLowerCase();

    if (tag === "br") {
      if (!current) continue;
      if (current.type === "p") {
        const keepBold = bold;
        const keepItalic = italic;
        start("p");
        bold = keepBold;
        italic = keepItalic;
      } else {
        addText("\n");
      }
      continue;
    }
    if (tag === "hr") {
      flush();
      blocks.push({ type: "hr" });
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      flush();
      if (closing) lists.pop();
      else lists.push({ ordered: tag === "ol", n: 0 });
      continue;
    }
    if (tag === "blockquote") {
      flush();
      quoteDepth = Math.max(0, quoteDepth + (closing ? -1 : 1));
      continue;
    }
    if (BOLD_TAGS.has(tag)) {
      bold = Math.max(0, bold + (closing ? -1 : 1));
      continue;
    }
    if (ITALIC_TAGS.has(tag)) {
      italic = Math.max(0, italic + (closing ? -1 : 1));
      continue;
    }
    if (BLOCK_TAGS.has(tag)) {
      if (closing || selfClosing) {
        flush();
      } else if (tag === "li") {
        const list = lists[lists.length - 1];
        const marker = list?.ordered ? `${++list.n}. ` : "• ";
        start("li", { marker, depth: Math.max(0, lists.length - 1) });
      } else {
        const centered =
          tag === "center" ||
          /\balign\s*=\s*["']?center/i.test(full) ||
          /text-align\s*:\s*center/i.test(full);
        const type = /^h[1-6]$/.test(tag) ? tag : centered ? "center" : "p";
        start(type);
      }
      continue;
    }
  }
  flush();
  return blocks;
}

const INDENT = "\u2003\u2002";
const LINE_HEIGHT = "17pt";

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 70,
    paddingHorizontal: 56,
    fontSize: 11.5,
    fontFamily: "Noto Serif",
    textAlign: "justify",
  },
  body: {},
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 6 },
  author: { fontSize: 13, textAlign: "center", marginBottom: 36 },
  h1: { fontSize: 16, fontWeight: "bold", textAlign: "left", marginBottom: 14 },
  h2: { fontSize: 14, fontWeight: "bold", textAlign: "left", marginBottom: 14 },
  h3: { fontSize: 12.5, fontWeight: "bold", textAlign: "left", marginTop: 6, marginBottom: 8 },
  p: { lineHeight: LINE_HEIGHT, orphans: 2, widows: 2 },
  center: { marginVertical: 8, textAlign: "center", lineHeight: LINE_HEIGHT },
  scene: { marginVertical: 12, textAlign: "center", lineHeight: LINE_HEIGHT },
  quote: { marginLeft: 22, marginRight: 22, fontStyle: "italic" },
  quoteStart: { marginTop: 8 },
  quoteEnd: { marginBottom: 8 },
  li: { marginBottom: 4, flexDirection: "row", textAlign: "left" },
  liMarker: { width: 16, lineHeight: LINE_HEIGHT },
  liText: { flex: 1, lineHeight: LINE_HEIGHT },
  hr: { borderBottomWidth: 0.6, borderBottomColor: "#888", marginVertical: 10, marginHorizontal: 80 },
});

function runStyle(run) {
  const s = {};
  if (run.bold) s.fontWeight = "bold";
  if (run.italic) s.fontStyle = "italic";
  return s;
}

function renderRuns(runs) {
  return runs.map((run, i) => h(Text, { key: i, style: runStyle(run) }, run.text));
}

function renderBlock(block, i, blocks) {
  if (block.type === "hr") return h(View, { key: i, style: styles.hr });

  const quote = block.quote ? styles.quote : null;

  if (block.type === "li") {
    return h(
      View,
      { key: i, style: [styles.li, { marginLeft: block.depth * 16 }, quote], wrap: false },
      h(Text, { style: styles.liMarker }, block.marker),
      h(Text, { style: styles.liText }, renderRuns(block.runs))
    );
  }

  const base =
    block.type === "h1" ? styles.h1
    : block.type === "h2" ? styles.h2
    : /^h[3-6]$/.test(block.type) ? styles.h3
    : block.type === "center" ? styles.center
    : block.type === "scene" ? styles.scene
    : styles.p;

  const prev = blocks[i - 1];
  const startsSection =
    block.type === "p" &&
    (!prev || prev.type !== "p" || !!prev.quote !== !!block.quote);

  const next = blocks[i + 1];
  const quoteEdges = block.quote
    ? [!prev?.quote ? styles.quoteStart : null, !next?.quote ? styles.quoteEnd : null]
    : [];

  const indent = block.type === "p" && !startsSection ? h(Text, { key: "indent" }, INDENT) : null;

  const isHeading = /^h[1-6]$/.test(block.type);

  return h(
    Text,
    { key: i, style: [base, quote, ...quoteEdges], minPresenceAhead: isHeading ? 50 : undefined },
    indent,
    renderRuns(block.runs)
  );
}

function FicDocument({ title, chapters }) {
  return h(
    Document,
    { title, author: "Kai Shouri", language: "pl" },
    chapters.map((blocks, idx) =>
      h(
        Page,
        { key: idx, size: "A4", style: styles.page },
        idx === 0 && h(Text, { style: styles.title }, title),
        idx === 0 && h(Text, { style: styles.author }, "Kai Shouri"),
        h(View, { style: styles.body }, blocks.map(renderBlock))
      )
    )
  );
}

export async function addPageNumbers(pdfBytes) {
  const pdf = await PDFDocument.load(pdfBytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  const size = 9;
  pages.forEach((page, i) => {
    const label = String(i + 1);
    const width = font.widthOfTextAtSize(label, size);
    page.drawText(label, {
      x: page.getWidth() - 56 - width,
      y: 32,
      size,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  });
  return pdf.save();
}

async function canRender(title, chapters) {
  try {
    await renderToBuffer(h(FicDocument, { title, chapters }));
    return true;
  } catch {
    return false;
  }
}

async function locateError(title, files, chapters) {
  for (let c = 0; c < chapters.length; c++) {
    if (await canRender(title, [chapters[c]])) continue;
    const blocks = chapters[c];
    for (let b = 0; b < blocks.length; b++) {
      if (await canRender(title, [[blocks[b]]])) continue;
      const text = (blocks[b].runs || []).map((r) => r.text).join("");
      console.error(`  -> plik ${files[c]}, blok nr ${b + 1} (${blocks[b].type}):`);
      console.error(`     ${JSON.stringify(text.slice(0, 300))}`);
      return;
    }
    console.error(`  -> plik ${files[c]} psuje się dopiero jako całość (żaden pojedynczy blok osobno).`);
    return;
  }
  console.error("  -> każdy rozdział osobno działa, błąd pojawia się dopiero przy całym dokumencie.");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const dirs = fs
    .readdirSync(FIC_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => only.length === 0 || only.includes(name));

  let ok = 0;
  let failed = 0;

  for (const dir of dirs) {
    const chaptersDir = path.join(FIC_ROOT, dir, "chapters");
    if (!fs.existsSync(chaptersDir)) continue;

    const files = fs
      .readdirSync(chaptersDir)
      .filter((f) => f.endsWith(".html"))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    if (files.length === 0) continue;

    let title = dir;
    const infoPath = path.join(FIC_ROOT, dir, "info.json");
    if (fs.existsSync(infoPath)) {
      try {
        title = JSON.parse(fs.readFileSync(infoPath, "utf-8")).title || dir;
      } catch {}
    }

    const chapters = files.map((f) => parseChapter(fs.readFileSync(path.join(chaptersDir, f), "utf-8")));
    const out = path.join(OUT_DIR, `${dir}.pdf`);

    const started = Date.now();
    try {
      const pdfBytes = await renderToBuffer(h(FicDocument, { title, chapters }));
      fs.writeFileSync(out, await addPageNumbers(pdfBytes));
      ok++;
      console.log(`PDF: ${dir} (${files.length} rozdz., ${((Date.now() - started) / 1000).toFixed(1)} s)`);
    } catch (e) {
      failed++;
      console.error(`PDF: błąd przy ${dir}: ${e.message}`);
      await locateError(title, files, chapters);
    }
  }

  console.log(`Wygenerowano ${ok} PDF, błędów: ${failed}`);
  if (failed > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  main();
}