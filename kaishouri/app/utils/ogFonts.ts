import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "fonts");

export function ogFonts() {
  return [
    { name: "Geist Mono", data: fs.readFileSync(path.join(dir, "GeistMono-SemiBold.ttf")), weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: fs.readFileSync(path.join(dir, "Inter-Regular.ttf")), weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: fs.readFileSync(path.join(dir, "Inter-SemiBold.ttf")), weight: 600 as const, style: "normal" as const },
  ];
}

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  bg: "#f7f9ec",
  bar: "#5e4074",
  text: "#402d4e",
  muted: "#795295",
  chip: "#e4daf0",
  chipText: "#5e4074",
  light: "#f7f9ec",
};

export const SITE_DOMAIN = "www.kaishouri.pl";
