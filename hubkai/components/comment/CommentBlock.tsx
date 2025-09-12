import { useState } from "react";
import { Comment, CommentBlockProps } from "./utils/types";
import {
  addComment,
  convertToLocaleDate,
  countCommentsDFS,
} from "./utils/comments.logic";

import Icons from "./Icons";

export default function CommentBlock({
  allComments,
  comment,
  setAllComments,
  ficTitle,
  chapterNo,
}: CommentBlockProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [commentReplyText, setCommentReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const replyCount = countCommentsDFS(comment.replies);
  const [userName, setUserName] = useState("");

  return (
    <div className=" mt-3 text-plume-wine dark:text-linen-cloud ">
      <div className="flex flex-col justify-between gap-4 bg-[rgba(178,178,238,0.09)] border py-4 px-4 rounded-lg">
        <div className="flex gap-3 justify-start items-start">
          <div className="flex flex-col gap-0">
            <div className="flex gap-2 items-center">
              <p className="text-lg">{comment.user}</p>
              <small className="font-medium">
                {convertToLocaleDate(comment.createdAt)}
              </small>
            </div>
            <div>{comment.text}</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 grow">
          <div className="flex gap-3  items-center">
            {replyCount > 0 && (
              <div
                className="flex items-center gap-1 p-2 hover:bg-[rgba(178,178,238,0.1)] cursor-pointer rounded-2xl"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? <Icons.CaretUp /> : <Icons.CaretDown />}
                {`${replyCount} ${replyCount > 1 ? "odpowiedzi" : "odpowiedź"}`}
              </div>
            )}

            <button
              className="cursor-pointer p-2 bg-[rgba(178,178,238,0.03)] rounded-2xl hover:bg-[rgba(178,178,238,0.2)] "
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              odpowiedz
            </button>
          </div>
        </div>
      </div>

      {showReplyBox && (
        <>
          <div className="ml-5 mt-4 flex flex-col items-end gap-2 text-plume-wine dark:text-linen-cloud ">
            <textarea
              className="bg-[rgba(178,178,238,0.05)]  p-4 outline-0 border ring-0 resize-none rounded-md w-full"
              placeholder={`replying to ${comment.user}`}
              name=""
              id=""
              rows={5}
              value={commentReplyText}
              onChange={(e) => setCommentReplyText(e.target.value)}
            ></textarea>
            <input
              type="text"
              value={userName}
              className="bg-[rgba(178,178,238,0.05)]  p-2 outline-0 border ring-0 resize-none rounded-md w-1/3"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="nick"
            />
            <div className="flex gap-2">
              <button
                className="font-medium p-3 rounded border"
                onClick={() => {
                  addComment(
                    allComments,
                    setAllComments,
                    commentReplyText,
                    userName,
                    comment.id,
                    ficTitle,
                    chapterNo
                  );
                  setCommentReplyText("");
                  setShowReplyBox(false);
                  setShowReplies(true);
                }}
              >
                Odpowiedz
              </button>
            </div>
          </div>
        </>
      )}

      {/* REPLIES */}

      {showReplies && (
        <div className="ml-5">
          {comment?.replies.length > 0 &&
            comment?.replies.map((reply: Comment) => (
              <CommentBlock
                key={reply.id}
                allComments={allComments}
                comment={reply}
                setAllComments={setAllComments}
                parentId={comment.id}
                ficTitle={ficTitle}
                chapterNo={chapterNo}
              />
            ))}
        </div>
      )}
    </div>
  );
}
