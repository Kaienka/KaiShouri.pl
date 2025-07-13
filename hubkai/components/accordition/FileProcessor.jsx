import AccordationElement from "./AccordationElement";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const filesDir = path.join(process.cwd(), "files");
const fileNames = fs.readdirSync(filesDir);

const filesData = fileNames.map((fileName) => {
  const filePath = path.join(filesDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const processedContent = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(fileContent)
    .toString();

  const title = path.parse(fileName).name.toUpperCase();

  return {
    title,
    content: processedContent,
  };
});

export default function Accordition() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl p-2 flex flex-col items-center gap-2">
        {filesData.map(({ title, content }) => (
          <AccordationElement key={title} topic={title} content={content} />
        ))}
      </div>
    </div>
  );
}
