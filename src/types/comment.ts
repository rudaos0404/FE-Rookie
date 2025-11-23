// src/types/comment.ts

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string; // ISO 문자열
}

// 새 댓글 입력용 타입 (id, createdAt 없이)
export type CommentInput = Omit<Comment, "id" | "createdAt">;
