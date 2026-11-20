import { useEffect, useState } from "react";
import CommentEntryBlock from "./CommentEntryBlock";
import CommentThread from "./CommentThread";
import { Comment } from "./utils/types";
import CollapsibleSection from "@/components/read/CollapsibleSection";

import { countCommentsDFS } from "./utils/comments.logic"
import { loadComments } from "./utils/comments.server"

type Props = {
  ficTitle: string,
  chapterNo: number
}

export default function CommentSection({ficTitle, chapterNo}:Props) {
  const [allComments, setAllComments] = useState<Comment[]>([]);

  useEffect(() => {
    loadComments(ficTitle, chapterNo).then(setAllComments);
  }, [chapterNo, ficTitle]);

  return (
    <div className="mb-10">
      <CollapsibleSection
        title={`Komentarze (${countCommentsDFS(allComments)})`}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
        }
      >
        <div className="flex flex-col-reverse md:flex-col gap-6">
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
      </CollapsibleSection>
    </div>
  );
}
