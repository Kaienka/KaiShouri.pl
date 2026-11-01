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


  useEffect(() => {
    loadComments(ficTitle, chapterNo).then(setAllComments);
  }, [chapterNo, ficTitle]);

  return (
    <div className="h-full w-full mb-10 text-plume-wine dark:text-linen-cloud  md:w-[35vw] overflow-y-auto flex flex-col-reverse md:flex-col items-center justify-between px-4 ">
      <CommentEntryBlock
        allComments={allComments}
        setAllComments={setAllComments}
        ficTitle={ficTitle}
        chapterNo={chapterNo}
      />
      <br />
      <h1 className="text-2xl w-full text-left">
        Komentarze ({countCommentsDFS(allComments)})
      </h1>
      <br />
      <CommentThread
        allComments={allComments}
        setAllComments={setAllComments}
        ficTitle={ficTitle}
        chapterNo={chapterNo}
      />
    </div>
  );
}
