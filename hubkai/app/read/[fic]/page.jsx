import Details from "@/components/read/Details";

import fs from "fs";
import path from "path";

function ReadFic({ params }) {
  const { fic } = params;
  console.log("Reading file:", fic);
  const filePath = path.join(process.cwd(), "fanfictions", fic, "info.json");
  let fileContent = {};
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    fileContent = null;
  }
  return (
    <main className="w-full h-full p-4 font-mono text-center bg-linen-cloud sm:p-8 flex justify-center">
      <Details fic={fileContent} />
    </main>
  );
}

export default ReadFic;
