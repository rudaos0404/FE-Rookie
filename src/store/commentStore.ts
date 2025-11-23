// src/store/commentStore.ts
import { create } from "zustand";

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommentInput {
  postId: number;
  author: string;
  content: string;
}

interface CommentState {
  comments: Comment[];
  addComment: (input: CommentInput) => void;
  deleteComment: (id: number) => void;
}

const STORAGE_KEY = "fe-rookie-hub-comments";

function loadInitialComments(): Comment[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Comment[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function persist(comments: Comment[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // ignore
  }
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: loadInitialComments(),
  addComment: (input: CommentInput) =>
    set((state) => {
      const nextId =
        state.comments.length === 0
          ? 1
          : Math.max(...state.comments.map((c) => c.id)) + 1;

      const newComment: Comment = {
        id: nextId,
        postId: input.postId,
        author: input.author,
        content: input.content,
        createdAt: new Date().toISOString(),
      };

      const next = [...state.comments, newComment];
      persist(next);
      return { comments: next };
    }),
  deleteComment: (id: number) =>
    set((state) => {
      const next = state.comments.filter((c) => c.id !== id);
      persist(next);
      return { comments: next };
    }),
}));
