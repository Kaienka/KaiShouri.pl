import { Comment } from "./types"
import { saveComments } from "./comments.server"
import { sendEmail } from "./email.server"

export function newComment(
  commentText: string,
  currentUser: string,
  ficTitle: string,
  chapterNo: number
): Comment {
  return {
    id: String(Math.random() * new Date().getTime()),
    text: commentText,
    user: currentUser,
    replies: [],
    createdAt: new Date(),
    ficTitle,
    chapterNo,
  }
}

export async function addComment(
  allComments: Comment[],
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  commentText: string,
  currentUser: string,
  parentId: string | null,
  ficTitle: string,
  chapterNo: number
) {
  let updated: Comment[]

  if (parentId) {
    updated = [...allComments]
    addNestedComment(
      updated,
      commentText,
      currentUser,
      parentId,
      ficTitle,
      chapterNo
    )
  } else {
    updated = [
      newComment(commentText, currentUser, ficTitle, chapterNo),
      ...allComments,
    ]
  }

  sendEmail({commentText, currentUser, ficTitle, chapterNo: chapterNo.toString()})
  setAllComments(updated)
  await saveComments(ficTitle, chapterNo, updated)
}

function addNestedComment(
  commentsWithReplies: Comment[],
  commentText: string,
  currentUser: string,
  parentId: string,
  ficTitle: string,
  chapterNo: number
) {
  for (let i = 0; i < commentsWithReplies.length; i++) {
    const comment = commentsWithReplies[i]
    if (comment.id === parentId) {
      comment.replies = [
        newComment(commentText, currentUser, ficTitle, chapterNo),
        ...comment.replies,
      ]
    } else {
      addNestedComment(
        comment.replies,
        commentText,
        currentUser,
        parentId,
        ficTitle,
        chapterNo
      )
    }
  }
}

export function convertToLocaleDate(date: Date) {
  return new Date(date).toLocaleDateString("pl-PL", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function countCommentsDFS(allComments: Comment[]): number {
  let count = 0
  for (const comment of allComments) {
    count += 1
    if (comment.replies.length !== 0) {
      count += countCommentsDFS(comment.replies)
    }
  }
  return count
}
