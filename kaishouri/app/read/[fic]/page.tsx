import Details from "@/components/read/Details";
import fs from "fs";
import path from "path";
import { getChapterTitles } from "@/app/utils/getChapterTitles";

type Params = Promise<{ fic: string }>;

async function ReadFic({ params }: { params: Params }) {
  const { fic } = await params;
  const filePath = path.join(process.cwd(), "fanfictions", fic, "info.json");
  let fileContent = null;
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    fileContent = null;
  }

  const chapterNames = getChapterTitles(fic);

  return (
    <main className="w-full">
      <Details fic={fileContent} chapterTitles={chapterNames} />
    </main>
  );
}

export default ReadFic;
