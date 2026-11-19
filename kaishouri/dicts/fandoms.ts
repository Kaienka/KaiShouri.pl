export const FANDOMS = [
  { code: "APH", label: "Hetalia" },
  { code: "GI", label: "Genshin Impact" },
  { code: "VLD", label: "Voltron Legendary Defender" },
  { code: "TRC", label: "Tsubasa Reservoir Chronicle" },
  { code: "TW", label: "Twisted Wonderland" },
  { code: "", label: "światy oryginalne" },
];

export const ORIGINAL_PARAM = "oryginalne";

export function fandomName(code: string) {
  return FANDOMS.find((f) => f.code === code)?.label ?? code;
}

const fandoms = ["wszystko", ...FANDOMS.map((f) => f.label)];

export default fandoms;