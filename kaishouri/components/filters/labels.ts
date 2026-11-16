export const ALL = "wszystko";

export function formatOption(value: string) {
  return value;
}

export function textsCount(n: number) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (n === 1) return `${n} tekst`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} teksty`;
  return `${n} tekstów`;
}