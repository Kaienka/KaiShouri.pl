"use client";
import { useRemark } from "react-remarkify";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import CollapsibleSection from "./CollapsibleSection";

type Props = {
  notes: string;
};

export default function NotesSection({ notes }: Props) {
  const content = useRemark({
    markdown: notes,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSanitize],
  });

  return (
    <CollapsibleSection
      title="Notatki"
      icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
      }
    >
      <div className="font-mono text-[15px] leading-[1.55] flex flex-col gap-2 [&_p]:m-0 [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-plume-wine [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-fourth-plum [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-third-plum dark:[&_blockquote]:text-fourth-plum [&_code]:text-sm [&_hr]:my-2 [&_hr]:border-fourth-plum/40">
        {content}
      </div>
    </CollapsibleSection>
  );
}