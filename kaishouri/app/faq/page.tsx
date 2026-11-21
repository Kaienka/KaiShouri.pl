import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import FaqItem from "@/components/faq/FaqItem";
import Markdown from "@/components/faq/Markdown";

export const metadata: Metadata = {
  title: "FAQ – Kai Shouri",
};

type Question = { question: string; answer: string };
type Group = { title: string; questions: Question[] };

function parseFaq(raw: string) {
  let intro = "";
  const groups: Group[] = [];
  let group: Group | null = null;
  let question: Question | null = null;

  for (const line of raw.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      group = { title: h2[1].trim(), questions: [] };
      groups.push(group);
      question = null;
    } else if (h3) {
      if (!group) {
        group = { title: "", questions: [] };
        groups.push(group);
      }
      question = { question: h3[1].trim(), answer: "" };
      group.questions.push(question);
    } else if (question) {
      question.answer += line + "\n";
    } else if (!group) {
      intro += line + "\n";
    }
  }

  return {
    intro: intro.trim(),
    groups: groups
      .map((g) => ({ ...g, questions: g.questions.map((q) => ({ ...q, answer: q.answer.trim() })) }))
      .filter((g) => g.questions.length > 0),
  };
}

export default function FaqPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "faq.md"), "utf-8");
  const { intro, groups } = parseFaq(raw);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-24 text-left text-dark-plume dark:text-linen-cloud">
      <header className="flex flex-row items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-third-plum dark:text-fourth-plum">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5M12 17h.01" />
        </svg>
        <h1 className="font-mono text-3xl sm:text-4xl font-semibold">FAQ</h1>
      </header>

      {intro && (
        <div className="mt-4 font-inter text-base sm:text-[17px] leading-relaxed">
          <Markdown source={intro} />
        </div>
      )}

      {groups.map((group, gi) => (
        <section key={gi} className="mt-8 flex flex-col">
          {group.title && (
            <h2 className="mb-1.5 font-mono text-[13px] font-semibold uppercase tracking-widest text-third-plum dark:text-fourth-plum">
              {group.title}
            </h2>
          )}
          {group.questions.map((q, qi) => (
            <FaqItem key={qi} question={q.question} answer={q.answer} />
          ))}
        </section>
      ))}
    </div>
  );
}
