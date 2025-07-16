import Card from "@/components/Card";
import fs from "fs";
import path from "path";

function ReadPage() {
  const filesDir = path.join(process.cwd(), "card-content");

  const filePath = path.join(filesDir, "fanfictions.json");
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);

  const list = data.fanfictions;
  console.log("List of fanfictions:", list);
  return (
    <>
      <div className="w-full h-full p-4 font-mono text-center bg-linen-cloud  rounded-lg sm:p-8">
        <div className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch">
          {list.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
              finished={item.finished}
              titleEscaped={item.titleEscaped}
              svg={item.svg}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ReadPage;
