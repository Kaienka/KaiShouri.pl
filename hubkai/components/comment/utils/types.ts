interface Comment {
  id: string;
  text: string;
  user: string;
  replies: Comment[];
  createdAt: Date;
  ficTitle: string;
  chapterNo: number;
}

interface CommentInfo {
  commentText: string;
  currentUser: string;
  ficTitle: string;
  chapterNo: string;
}

interface CommentBlockProps {
  allComments: Comment[];
  comment: Comment;
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  parentId: string | null;
    ficTitle: string;
  chapterNo: number;
}

interface CommentEntryBlockProps {
  allComments: Comment[];
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  ficTitle: string,
  chapterNo: number
}

interface CommentThreadProps {
  allComments: Comment[];
  setAllComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    ficTitle: string;
  chapterNo: number;
}

export type {
  Comment,
  CommentBlockProps,
  CommentThreadProps,
  CommentEntryBlockProps,
  CommentInfo
};
