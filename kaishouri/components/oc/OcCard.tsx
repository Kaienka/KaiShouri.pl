"use client";

import { useEffect, useRef, useState } from "react";
import { useRemark } from "react-remarkify";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { OC } from "@/types/types.api";

interface Props {
  oc: OC;
}

function lifeYears(birth?: number | string, death?: number | string) {
  if (birth !== undefined && death !== undefined) return `${birth}–${death}`;
  if (birth !== undefined) return `ur. ${birth}`;
  if (death !== undefined) return `zm. ${death}`;
  return undefined;
}

function OCCard({ oc }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  const description = useRemark({
    markdown: oc.description ?? "",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSanitize],
  });

  useEffect(() => {
    const el = descRef.current;
    if (!el || expanded) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [description, expanded]);

  const fields = [
    { label: "Wiek", value: oc.age },
    { label: "Lata życia", value: lifeYears(oc.birth, oc.death) },
    { label: "Płeć", value: oc.gender },
    { label: "Seksualność", value: oc.sexuality },
  ].filter((f) => f.value !== undefined && f.value !== "");

  return (
    <article className="break-inside-avoid mb-4 flex flex-col gap-3.5 p-5 sm:p-6 rounded-2xl text-left bg-nice-light-purple text-dark-plume dark:bg-dark-plume dark:text-linen-cloud">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-xl font-semibold leading-tight first-letter:uppercase">
          {oc.name} {oc.surname}
        </h2>
        {oc.uniwersum && (
          <p className="font-mono text-[13px] text-third-plum dark:text-fourth-plum first-letter:uppercase">
            {oc.uniwersum}
          </p>
        )}
      </div>

      {fields.length > 0 && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5">
          {fields.map((f) => (
            <div key={f.label} className="contents">
              <dt className="font-mono text-xs pt-0.5 text-third-plum dark:text-fourth-plum">{f.label}</dt>
              <dd className="font-inter text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {oc.description && (
        <div
          ref={descRef}
          className={`font-inter text-[15px] leading-relaxed flex flex-col gap-2.5 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-plume-wine [&_a]:underline dark:[&_a]:text-fourth-plum ${
            expanded ? "" : "max-h-[6.5em] overflow-hidden"
          }`}
        >
          {description}
        </div>
      )}

      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="self-start flex items-center gap-1 h-8 px-0.5 font-inter text-[13px] font-semibold cursor-pointer text-plume-wine dark:text-fourth-plum"
        >
          {expanded ? "zwiń" : "więcej"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={expanded ? "rotate-180" : ""}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </article>
  );
}

export default OCCard;
