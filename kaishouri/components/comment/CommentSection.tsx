import { useEffect, useState } from "react";
import CommentEntryBlock from "./CommentEntryBlock";
import CommentThread from "./CommentThread";
import { Comment } from "./utils/types";

import { countCommentsDFS } from "./utils/comments.logic"
import { loadComments } from "./utils/comments.server"

type Props = {
  ficTitle: string,
  chapterNo: number
}

export default function CommentSection({ficTitle, chapterNo}:Props) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadComments(ficTitle, chapterNo).then(setAllComments);
  }, [chapterNo, ficTitle]);

  return (
    <div className="w-10/12 sm:w-8/12 max-w-3xl mx-auto mb-10 font-inter text-dark-plume dark:text-linen-cloud">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="comments-panel"
        className="w-full flex items-center justify-between gap-3 py-4 px-1 text-left cursor-pointer"
      >
        <span className="flex items-center gap-2.5 font-mono text-[17px] font-semibold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-third-plum dark:text-fourth-plum">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
          Komentarze ({countCommentsDFS(allComments)})
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`text-third-plum dark:text-fourth-plum transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id="comments-panel" className="flex flex-col-reverse md:flex-col gap-6 px-1 pb-4">
          <CommentEntryBlock
            allComments={allComments}
            setAllComments={setAllComments}
            ficTitle={ficTitle}
            chapterNo={chapterNo}
          />
          <CommentThread
            allComments={allComments}
            setAllComments={setAllComments}
            ficTitle={ficTitle}
            chapterNo={chapterNo}
          />
        </div>
      )}
    </div>
  );
}
