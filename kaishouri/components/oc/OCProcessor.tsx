import { promises as fs } from "fs";
import path from "path";
import { OC } from "@/types/types.api";
import OCWrapper from "./OCWrapper";

function parseProfile(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, description: raw.trim() };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    if (key && value) data[key] = value;
  }

  return { data, description: match[2].trim() };
}

function toYear(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : String(value);
}

function toAge(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : String(value);
}

export default async function OCProcessor() {
  const baseDir = path.join(process.cwd(), "oc");
  const ocs: OC[] = [];

  const files = await fs.readdir(baseDir);
  for (const file of files) {
    const filePath = path.join(baseDir, file);

    if (file.endsWith(".md")) {
      const { data, description } = parseProfile(await fs.readFile(filePath, "utf-8"));
      ocs.push({
        id: file,
        name: data.name ?? "",
        surname: data.surname,
        age: toAge(data.age),
        birth: toYear(data.birth),
        death: toYear(data.death),
        description,
        uniwersum: data.uniwersum,
        gender: data.gender,
        sexuality: data.sexuality,
      });
    } else if (file.endsWith(".json")) {
      const jsonData = JSON.parse(await fs.readFile(filePath, "utf-8"));
      ocs.push({
        id: file,
        name: jsonData.name,
        surname: jsonData.surname,
        age: toAge(jsonData.age),
        birth: toYear(jsonData.birth),
        death: toYear(jsonData.death),
        description: jsonData.description,
        uniwersum: jsonData.uniwersum,
        gender: jsonData.gender,
        sexuality: jsonData.sexuality,
      });
    }
  }

  return <OCWrapper oc={ocs} />;
}