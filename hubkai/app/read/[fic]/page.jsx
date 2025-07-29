import Details from "@/components/read/Details";

import fs from "fs";
import path from "path";

async function ReadFic({ params }) {
  const { fic } = await params;
  const filePath = path.join(process.cwd(), "fanfictions", fic, "info.json");
  let fileContent = {};
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    fileContent = null;
  }
  return (
    <>
    <main className="w-full h-[90%] p-4 font-mono text-center  sm:p-8 flex justify-center">
      <Details fic={fileContent} />
    </main>
    </>
  );
}

export default ReadFic;
