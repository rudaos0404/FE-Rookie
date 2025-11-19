import { create } from "zustand";
import type { Post } from "../types/post";
import { mockPosts } from "../mock/posts";

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
  increaseViews: (id: number) => void;
  increaseLikes: (id: number) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: mockPosts,
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  updatePost: (updated) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === updated.id ? updated : p
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
  increaseViews: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, views: p.views + 1 } : p
      ),
    })),
  increaseLikes: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      ),
    })),
}));
