import { promises as fs } from "fs";
import path from "path";
import { OC } from "@/types/types.api";
import OCWrapper from "./OCWrapper";

export default async function OCProcessor() {
  const baseDir = path.join(process.cwd(), "oc");
  const ocs: OC[] = [];

  const files = await fs.readdir(baseDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(baseDir, file);
        const content = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(content);
        ocs.push({
          name: jsonData.name,
          surname: jsonData.surname,
          age: jsonData.age,
          description: jsonData.description,
          uniwersum: jsonData.uniwersum,
          gender: jsonData.gender,
          sexuality: jsonData.sexuality
        });
      }
    }

  return (
    <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8">
        <OCWrapper oc={ocs} />
    </div>
  );
}
