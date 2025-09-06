import FanficCard from "@/components/FanficCard";
import fs from "fs";
import path from "path";


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
      nsfw: infoContent.nsfw
    }
    fanficInfo.push(fanfic)
  });


  return (
    <>
      <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8">
        <div className="gap-6 flex flex-wrap justify-center p-8 sm:flex items-stretch">
          {fanficInfo.length != 0 && fanficInfo.map((item) => (
            <FanficCard
              key={item.title}
              title={item.title}
              description={item.description}
              finished={item.finished}
              titleEscaped={item.titleEscaped}
              svg={item.svg}
              fandom={item.fandom}
              chapters={item.chapters}
              wordCount={item.wordCount}
              nsfw={item.nsfw}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ReadPage;
