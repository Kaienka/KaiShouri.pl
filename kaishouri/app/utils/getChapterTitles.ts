import fs from "fs";
import path from "path";

/**
 * Tytuły rozdziałów fika: pierwszy <h2> z każdego pliku `chapters/N.html`, posortowane po N.
 * Gdy plik nie ma <h2>, w tablicy jest null.
 * Używane przez spis treści (/read/[fic]) i nawigację w rozdziale (/read/[fic]/[index]).
 */
export function getChapterTitles(fic: string): (string | null)[] {
  const folderPath = path.join(process.cwd(), "fanfictions", fic, "chapters");

  const files = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".html"))
    .map((d) => ({
      fullPath: path.join(folderPath, d.name),
      num: parseInt(d.name.replace(".html", ""), 10),
    }))
    .sort((a, b) => a.num - b.num);

  return files.map((file) => {
    const content = fs.readFileSync(file.fullPath, "utf-8");
    // [\s\S] zamiast . – łapie też <h2> rozbite na kilka linii
    const match = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (!match) return null;
    // usuń znaczniki w środku (np. <em>) i nadmiarowe spacje – w nawigacji to zwykły tekst
    return match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || null;
  });
}
