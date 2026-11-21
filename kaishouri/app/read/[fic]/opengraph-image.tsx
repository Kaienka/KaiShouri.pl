import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { ogFonts, OG_SIZE, OG_COLORS as c, SITE_DOMAIN } from "@/app/utils/ogFonts";
import { getChapterTitles } from "@/app/utils/getChapterTitles";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Kai Shouri";

type Params = Promise<{ fic: string }>;

function shorten(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:–-]+$/, "") + "…";
}

function chaptersLabel(n: number) {
  return n == 1 ? "rozdział" : n < 5 ? "rozdziały" : "rozdziałów";
}

export default async function OgImage({ params }: { params: Params }) {
  const { fic } = await params;

  let info: Record<string, unknown> = {};
  try {
    info = JSON.parse(fs.readFileSync(path.join(process.cwd(), "fanfictions", fic, "info.json"), "utf-8"));
  } catch {}

  const title = (info.title as string) || "Kai Shouri";
  const description = shorten((info.description as string) || "", 220);
  const status = info.abandoned ? "porzucone" : info.finished ? "zakończone" : "trwające";
  const ship = info.ship as string | undefined;
  const fandom = info.fandom as string | undefined;
  let chapters = 0;
  try {
    chapters = getChapterTitles(fic).length;
  } catch {}

  const meta = [fandom && `fandom ${fandom}`, chapters > 0 && `${chapters} ${chaptersLabel(chapters)}`].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, fontFamily: "Inter" }}>
        <div style={{ width: 28, height: "100%", background: c.bar }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px", gap: 22 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 18px", borderRadius: 20, background: c.chip, color: c.chipText, fontSize: 20, fontWeight: 600 }}>
              {status}
            </div>
            {ship && (
              <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 18px", borderRadius: 20, background: c.bar, color: c.light, fontSize: 20, fontWeight: 600 }}>
                {ship}
              </div>
            )}
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: title.length > 28 ? 60 : 76, fontWeight: 600, lineHeight: 1.1, color: c.text }}>
            {title}
          </div>
          {description && (
            <div style={{ fontSize: 26, lineHeight: 1.5, color: c.text }}>{description}</div>
          )}
          {meta && (
            <div style={{ fontFamily: "Geist Mono", fontSize: 22, fontWeight: 600, color: c.muted }}>{meta}</div>
          )}
        </div>
        <div style={{ position: "absolute", right: 72, bottom: 48, fontFamily: "Geist Mono", fontSize: 24, fontWeight: 600, color: c.chipText }}>
          {SITE_DOMAIN}
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}
