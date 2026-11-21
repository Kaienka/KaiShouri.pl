import Details from "@/components/read/Details";
import fs from "fs";
import path from "path";
import { getChapterTitles } from "@/app/utils/getChapterTitles";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ fic: string }>;

function readInfo(fic: string) {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "fanfictions", fic, "info.json"), "utf-8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { fic } = await params;
  const info = readInfo(fic);
  if (!info) return {};
  const title = `${info.title} – Kai Shouri`;
  const description = info.description;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function ReadFic({ params }: { params: Params }) {
  const { fic } = await params;
  const filePath = path.join(process.cwd(), "fanfictions", fic, "info.json");
  let fileContent = null;
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    fileContent = null;
  }

  if (!fileContent) notFound();

  const chapterNames = getChapterTitles(fic);

  return (
    <main className="w-full">
      <Details fic={fileContent} chapterTitles={chapterNames} />
    </main>
  );
}

export default ReadFic;
