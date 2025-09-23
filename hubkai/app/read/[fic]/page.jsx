import Details from "@/components/read/Details";

import fs from "fs";
import path from "path";


const getFirstH2FromHtmlFiles = (folderPath) => {
  const files = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.html'))
    .map(dirent => {
      const fullPath = path.join(folderPath, dirent.name)
      const num = parseInt(dirent.name.replace('.html', ''), 10)
      return { 
        name: dirent.name, 
        fullPath,
        num
      }
    })
    .sort((a, b) => a.num - b.num)

  const result = []

  for (const file of files) {
    const content = fs.readFileSync(file.fullPath, 'utf-8')
    const match = content.match(/<h2[^>]*>(.*?)<\/h2>/i)
    result.push(match ? match[1] : null)
  }

  return result
}

async function ReadFic({ params }) {
  const { fic } = await params;
  const filePath = path.join(process.cwd(), "fanfictions", fic, "info.json");
  let fileContent = {};
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    fileContent = null;
  }

  const chapterNames = getFirstH2FromHtmlFiles(path.join(process.cwd(), "fanfictions", fic, "chapters"))
  return (
    <>
    <main className="w-full h-full p-4 font-mono text-center  sm:p-8 flex justify-center">
      <Details fic={fileContent} chapterTitles={chapterNames} />
    </main>
    </>
  );
}

export default ReadFic;
