"use client";
import { ReactNode, useId, useState } from "react";

type Props = {
  title: ReactNode;
  icon: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

export default function CollapsibleSection({ title, icon, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="w-10/12 sm:w-8/12 max-w-3xl mx-auto font-inter text-dark-plume dark:text-linen-cloud">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 py-4 px-1 text-left cursor-pointer"
      >
        <span className="flex items-center gap-2.5 font-mono text-[17px] font-semibold">
          <span className="text-third-plum dark:text-fourth-plum flex">{icon}</span>
          {title}
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`text-third-plum dark:text-fourth-plum transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id={panelId} className="px-1 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
