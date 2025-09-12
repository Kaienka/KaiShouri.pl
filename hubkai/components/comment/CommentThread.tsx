import { CommentThreadProps, Comment } from "./utils/types";
import CommentBlock from "./CommentBlock";

export default function CommentThread({
  allComments,
  setAllComments,
   ficTitle,
   chapterNo
}: CommentThreadProps) {
  return (
    <div className="flex flex-col gap-5 grow overflow-y-auto w-full pr-2">
      {allComments.length > 0 &&
        allComments.map((comment: Comment) => (
          <CommentBlock
            allComments={allComments}
            key={comment.id}
            comment={comment}
            setAllComments={setAllComments}
            parentId={null}
            ficTitle={ficTitle}
          chapterNo={chapterNo}
          />
        ))}
    </div>
  );
}
