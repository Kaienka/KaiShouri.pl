import fs from "fs";
import path from "path";
import ReadWrapper from "@/components/read/ReadWrapper"


const getSubfolders = (source) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const countFiles = (source) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .length
}

function ReadPage() {

  const mainFicFolder = path.join(process.cwd(), "fanfictions")
  const fanfics = getSubfolders(mainFicFolder)

  const fanficInfo = []

  fanfics.forEach(fic => {
    const patchToFanfic = path.join(process.cwd(), "fanfictions", fic, "info.json")
    const infoContent = JSON.parse(fs.readFileSync(patchToFanfic, "utf-8"))
    const chaptersAmount = countFiles(path.join(process.cwd(), "fanfictions", fic, "chapters"))
    const fanfic = {
      title: infoContent.title,
      description: infoContent.description,
      finished: infoContent.finished,
      titleEscaped: infoContent.titleEscaped,
      svg: infoContent.svg,
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
    <ReadWrapper fanficInfo={fanficInfo} />
  );
}

export default ReadPage;
