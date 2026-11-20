import { useState } from "react";
import { Comment, CommentBlockProps } from "./utils/types";
import {
  addComment,
  convertToLocaleDate,
  countCommentsDFS,
} from "./utils/comments.logic";

import Icons from "./Icons";

const fieldClass =
  "rounded-xl outline-none bg-nice-light-purple dark:bg-white/10 placeholder:text-third-plum dark:placeholder:text-fourth-plum focus:ring-2 focus:ring-plume-wine/30 dark:focus:ring-fourth-plum/40";
const ghostBtn =
  "flex items-center gap-1 h-9 px-3 rounded-full text-sm font-medium cursor-pointer text-third-plum hover:bg-nice-light-purple dark:text-fourth-plum dark:hover:bg-white/10";

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
    <div className="py-2">
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2 items-baseline">
          <p className="font-mono font-semibold">{comment.user}</p>
          <small className="font-mono text-xs text-third-plum dark:text-fourth-plum">
            {convertToLocaleDate(comment.createdAt)}
          </small>
        </div>
        <div className="leading-relaxed whitespace-pre-line">{comment.text}</div>
        <div className="flex gap-1 items-center -ml-3">
          {replyCount > 0 && (
            <button
              type="button"
              className={ghostBtn}
              onClick={() => setShowReplies(!showReplies)}
              aria-expanded={showReplies}
            >
              {showReplies ? <Icons.CaretUp /> : <Icons.CaretDown />}
              {`${replyCount} ${replyCount > 1 ? "odpowiedzi" : "odpowiedź"}`}
            </button>
          )}

          <button
            type="button"
            className={ghostBtn}
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            odpowiedz
          </button>
        </div>
      </div>

      {showReplyBox && (
        <div className="ml-5 mt-2 flex flex-col items-end gap-2">
          <textarea
            className={`${fieldClass} p-4 resize-none w-full`}
            placeholder={`replying to ${comment.user}`}
            name=""
            id=""
            rows={5}
            value={commentReplyText}
            onChange={(e) => setCommentReplyText(e.target.value)}
          ></textarea>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={userName}
              className={`${fieldClass} w-44 h-11 px-3.5`}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="nick"
            />
            <button
              className="h-11 px-5 rounded-xl font-semibold cursor-pointer bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume"
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
      )}

      {/* REPLIES */}

      {showReplies && (
        <div className="ml-5 pl-4">
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
