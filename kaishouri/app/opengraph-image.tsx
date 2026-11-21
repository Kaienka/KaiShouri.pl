import { ImageResponse } from "next/og";
import { ogFonts, OG_SIZE, OG_COLORS as c, SITE_DOMAIN } from "@/app/utils/ogFonts";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Kai Shouri";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, fontFamily: "Inter" }}>
        <div style={{ width: 28, height: "100%", background: c.bar }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px", gap: 22 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 88, fontWeight: 600, color: c.text }}>Kai Shouri</div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 30, fontWeight: 600, color: c.muted }}>Centrum sterowania Wszechświatem</div>
          <div style={{ fontSize: 28, lineHeight: 1.5, color: c.text, maxWidth: 900 }}>
            Kai Shouri - strona domowa. Piję kawę i piszę fiki. Czasami w odwrotnej kolejności
          </div>
        </div>
        <div style={{ position: "absolute", right: 72, bottom: 48, fontFamily: "Geist Mono", fontSize: 24, fontWeight: 600, color: c.chipText }}>
          {SITE_DOMAIN}
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}
