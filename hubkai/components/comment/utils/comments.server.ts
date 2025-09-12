"use server"

import { kv } from "@vercel/kv"
import { Comment } from "./types"

function getKey(ficTitle: string, chapterNo: number) {
  return `comments:${ficTitle}:${chapterNo}`
}

export async function loadComments(ficTitle: string, chapterNo: number): Promise<Comment[]> {
  const key = getKey(ficTitle, chapterNo)
  const comments = await kv.get<Comment[]>(key)
  return comments || []
}

export async function saveComments(
  ficTitle: string,
  chapterNo: number,
  allComments: Comment[]
) {
  const key = getKey(ficTitle, chapterNo)
  await kv.set(key, allComments)
}
