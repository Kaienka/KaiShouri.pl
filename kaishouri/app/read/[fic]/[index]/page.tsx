import fs from "fs";
import path from "path";
import ContentWrapper from "@/components/read/ContentWrapper";
import { getChapterTitles } from "@/app/utils/getChapterTitles";

type Params = Promise<{ fic: string; index: string }>;

function readNotes(fic: string, index: string) {
  if (!/^\d+$/.test(index)) return null;
  const notesPath = path.join(process.cwd(), "fanfictions", fic, "notes", `${index}.md`);
  if (!fs.existsSync(notesPath)) return null;
  const notes = fs.readFileSync(notesPath, "utf-8");
  return notes.trim() ? notes : null;
}

async function Read({ params }: { params: Params }) {
  const { fic, index } = await params;
  const filesDir = path.join(process.cwd(), `fanfictions/${fic}/chapters/`);

  const filePath = path.join(filesDir, `${index}.html`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const chapterTitles = getChapterTitles(fic);
  const chapterAmount = chapterTitles.length;
  const notes = readNotes(fic, index);

  return (
    <div className="flex flex-col items-center">
      <ContentWrapper
        fileContent={fileContent}
        index={Number(index)}
        fic={fic}
        chapterAmount={chapterAmount}
        chapterTitles={chapterTitles}
        notes={notes}
      />
    </div>
  );
}

export default Read;
