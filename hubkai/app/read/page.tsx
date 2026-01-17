import fs from "fs";
import path from "path";
import ReadWrapper from "@/components/read/ReadWrapper"
import { Fanfic } from "@/types/types.api";
import { Suspense } from "react";


const getSubfolders = (source: string) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const countFiles = (source: string) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .length
}

function ReadPage() {

  const mainFicFolder = path.join(process.cwd(), "fanfictions")
  const fanfics = getSubfolders(mainFicFolder)

  const fanficInfo: Fanfic[] = []

  fanfics.forEach(fic => {
    const patchToFanfic = path.join(process.cwd(), "fanfictions", fic, "info.json")
    const infoContent = JSON.parse(fs.readFileSync(patchToFanfic, "utf-8"))
    const chaptersAmount = countFiles(path.join(process.cwd(), "fanfictions", fic, "chapters"))
    const fanfic = {
      title: infoContent.title,
      description: infoContent.description,
      finished: infoContent.finished,
      titleEscaped: infoContent.titleEscaped,
      fandom: infoContent.fandom,
      chapters: chaptersAmount,
      wordCount: infoContent.wordCount,
      nsfw: infoContent.nsfw,
      ship: infoContent.ship,
      date: infoContent.date
    }
    fanficInfo.push(fanfic)
  });


  return (
        <Suspense fallback={<div>Ładowanie...</div>}>
          <ReadWrapper fanficInfo={fanficInfo} />
        </Suspense>
  );
}

export default ReadPage;
