import { promises as fs } from "fs";
import path from "path";
import { Headcanon } from "@/types/types.api";
import HeadcanonsWrapper from "./HeadcanonsWrapper";

export default async function HeadcanonProcessor() {
  const baseDir = path.join(process.cwd(), "headcanons");
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const characters = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const headcanons: Headcanon[] = [];

  for (const character of characters) {
    const charPath = path.join(baseDir, character);
    const files = await fs.readdir(charPath);

    for (const file of files) {
      if (file.endsWith(".txt")) {
        const filePath = path.join(charPath, file);
        const content = await fs.readFile(filePath, "utf-8");
        const nsfw = file.toLowerCase().includes("nsfw");

        headcanons.push({
          character,
          content,
          nsfw,
        });
      }
    }
  }

  return (
    <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8">
        <HeadcanonsWrapper headcanons={headcanons} />
    </div>
  );
}
