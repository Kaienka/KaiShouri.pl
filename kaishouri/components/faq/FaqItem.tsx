"use client";
import { useId, useState } from "react";
import Markdown from "./Markdown";

type Props = {
  question: string;
  answer: string;
};

export default function FaqItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-3.5 px-0.5 text-left cursor-pointer font-mono text-base font-semibold"
      >
        <span>{question}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 text-third-plum dark:text-fourth-plum transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div id={panelId} className="px-0.5 pb-4 font-inter text-base leading-relaxed">
          <Markdown source={answer} />
        </div>
      )}
    </div>
  );
}
