import AccordationElement from "./AccordationElement";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const filePath_polska = path.join(process.cwd(), "files", "polska.md");
const content_polska = fs.readFileSync(filePath_polska, "utf-8");
const processedContent_polska = unified()
  .use(remarkParse)
  .use(remarkHtml)
  .processSync(content_polska)
  .toString();

const filePath_prusy = path.join(process.cwd(), "files", "prusy.md");
const content_prusy = fs.readFileSync(filePath_prusy, "utf-8");
const processedContent_prusy = unified()
  .use(remarkParse)
  .use(remarkHtml)
  .processSync(content_prusy)
  .toString();


  const filePath_litwa = path.join(process.cwd(), "files", "litwa.md");
const content_litwa = fs.readFileSync(filePath_litwa, "utf-8");
const processedContent_litwa = unified()
  .use(remarkParse)
  .use(remarkHtml)
  .processSync(content_litwa)
  .toString();

export default function Accordition() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl p-2">
        <AccordationElement
          topic="Polska"
          content={processedContent_polska}
        ></AccordationElement>
        <AccordationElement topic="Prusy" content={processedContent_prusy} />
        <AccordationElement topic="Litwa" content={processedContent_litwa} />
      </div>
    </div>
  );
}
