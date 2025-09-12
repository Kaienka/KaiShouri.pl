'use server'
import nodemailer from "nodemailer"
import { CommentInfo } from "./types"


export async function sendEmail(comment: CommentInfo) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: '"KaiShouri.pl" <comments@kaishouri.pl>',
    to: process.env.MY_EMAIL,
    subject: `Nowy komentarz do ${comment.ficTitle}, rozdział ${comment.chapterNo}!`,
    html: `<h3>${comment.currentUser} skomentowałx Twój fik!</h3>
    <h6>${comment.ficTitle} - ${comment.chapterNo}</h6>
    <p>${comment.commentText}</p>
    `
  })
}