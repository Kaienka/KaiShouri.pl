
import fs from "fs";
import path from "path";
import ContentWrapper from "@/components/read/ContentWrapper"


async function Read({ params }) {
    const { fic, index } = await params;
    const filesDir = path.join(process.cwd(), `fanfictions/${fic}/chapters/`);

    const filePath = path.join(filesDir, `${index}.html`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const files = fs.readdirSync(filesDir);
    const chapterAmount = files.filter(name => name.endsWith('.html')).length

    return <main className="flex flex-col items-center">
        <ContentWrapper fileContent={fileContent} index={index} fic={fic} chapterAmount={chapterAmount} />
    </main>


}

export default Read;