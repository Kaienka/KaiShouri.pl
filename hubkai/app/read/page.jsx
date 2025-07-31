import FanficCard from "@/components/FanficCard";
import fs from "fs";
import path from "path";

function ReadPage() {
  const filesDir = path.join(process.cwd(), "fanfictions");

  const filePath = path.join(filesDir, "fanfictions.json");
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);

  const list = data.fanfictions;
  return (
    <>
      <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8">
        <div className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch">
          {list.map((item) => (
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
