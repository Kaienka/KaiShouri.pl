import fs from "fs";
import path from "path";
import ContentWrapper from "@/components/read/ContentWrapper";
import { getChapterTitles } from "@/app/utils/getChapterTitles";

type Params = Promise<{ fic: string; index: string }>;

async function Read({ params }: { params: Params }) {
  const { fic, index } = await params;
  const filesDir = path.join(process.cwd(), `fanfictions/${fic}/chapters/`);

  const filePath = path.join(filesDir, `${index}.html`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const chapterTitles = getChapterTitles(fic);
  const chapterAmount = chapterTitles.length;

  return (
    <div className="flex flex-col items-center">
      <ContentWrapper
        fileContent={fileContent}
        index={Number(index)}
        fic={fic}
        chapterAmount={chapterAmount}
        chapterTitles={chapterTitles}
      />
    </div>
  );
}

export default Read;
