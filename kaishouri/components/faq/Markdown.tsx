"use client";
import { useRemark } from "react-remarkify";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function Markdown({ source }: { source: string }) {
  const content = useRemark({
    markdown: source,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSanitize],
  });

  return (
    <div className="flex flex-col gap-3 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-plume-wine [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-fourth-plum [&_strong]:font-semibold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-third-plum dark:[&_blockquote]:text-fourth-plum">
      {content}
    </div>
  );
}
