import { useState } from "react";
import { addComment } from "./utils/comments.logic";

import { CommentEntryBlockProps } from "./utils/types";

export default function CommentEntryBlock({
  allComments,
  setAllComments,
  ficTitle,
  chapterNo
}: CommentEntryBlockProps) {
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="flex flex-col items-end gap-2 w-full">
      <textarea
        className="w-full p-4 rounded-xl resize-none outline-none bg-nice-light-purple dark:bg-white/10 placeholder:text-third-plum dark:placeholder:text-fourth-plum focus:ring-2 focus:ring-plume-wine/30 dark:focus:ring-fourth-plum/40"
        placeholder="Napisz komentarz..."
        cols={30}
        rows={5}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={userName}
          className="w-44 h-11 px-3.5 rounded-xl outline-none bg-nice-light-purple dark:bg-white/10 placeholder:text-third-plum dark:placeholder:text-fourth-plum focus:ring-2 focus:ring-plume-wine/30 dark:focus:ring-fourth-plum/40"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="nick"
        />
        {commentText.length > 0 && userName.trim() !== "" && (
          <button
            className="h-11 px-5 rounded-xl font-semibold cursor-pointer bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume"
            onClick={() => {
              if (commentText.trim().length) {
                addComment(
                  allComments,
                  setAllComments,
                  commentText,
                  userName,
                  null,
                  ficTitle,
                  chapterNo
                );
                setCommentText("");
                setUserName("");
              }
            }}
          >
            Dodaj
          </button>
        )}
      </div>
    </div>
  );
}
