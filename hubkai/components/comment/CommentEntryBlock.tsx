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
    <div className="flex flex-col items-end gap-2 w-full text-plume-wine dark:text-linen-cloud  ">
      <textarea
        className={"bg-[rgba(178,178,238,0.05)] p-4 outline-0 border ring-0 resize-none rounded-md w-full"}
        placeholder="Napisz komentarz..."
        cols={30}
        rows={5}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      <input
        type="text"
        value={userName}
        className="bg-[rgba(178,178,238,0.05)]  p-2 outline-0 border ring-0 resize-none rounded-md w-1/3"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="nick"
      />
      {commentText.length > 0 && userName.trim() !== "" && (
        <button
          className="font-medium p-3 rounded border"
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
  );
}
