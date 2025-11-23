// src/store/postStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PostCategory = "study" | "job";

export interface Post {
  id: number;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  author: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export interface NewPostInput {
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  imageUrl: string | null;
}

interface PostStoreState {
  posts: Post[];
  nextId: number;

  likedPostIds: number[];
  viewedPostIds: number[];
  bookmarkedPostIds: number[];

  addPost: (data: NewPostInput, author: string) => void;
  updatePost: (id: number, data: Partial<NewPostInput>) => void;
  deletePost: (id: number) => void;
  increaseViews: (id: number) => void;
  increaseLikes: (id: number) => void;
  toggleBookmark: (id: number) => void;
}

export const usePostStore = create<PostStoreState>()(
  persist(
    (set) => ({
      posts: [
        {
          id: 1,
          title: "첫 글 예시",
          content: "포트폴리오 블로그에 오신 걸 환영합니다.",
          category: "study",
          tags: ["React", "TypeScript"],
          author: "관리자",
          imageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0,
          likes: 0,
        },
      ],
      nextId: 2,

      likedPostIds: [],
      viewedPostIds: [],
      bookmarkedPostIds: [],

      addPost: (data, author) =>
        set((state) => {
          const now = new Date().toISOString();
          const newPost: Post = {
            id: state.nextId,
            author,
            createdAt: now,
            updatedAt: now,
            views: 0,
            likes: 0,
            ...data,
          };

          return {
            posts: [newPost, ...state.posts],
            nextId: state.nextId + 1,
          };
        }),

      updatePost: (id, data) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : post
          ),
        })),

      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
          likedPostIds: state.likedPostIds.filter((pid) => pid !== id),
          viewedPostIds: state.viewedPostIds.filter((pid) => pid !== id),
          bookmarkedPostIds: state.bookmarkedPostIds.filter(
            (pid) => pid !== id
          ),
        })),

      // 같은 브라우저에서 같은 글은 한 번만 카운트
      increaseViews: (id) =>
        set((state) => {
          if (state.viewedPostIds.includes(id)) return state;
          return {
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, views: post.views + 1 } : post
            ),
            viewedPostIds: [...state.viewedPostIds, id],
          };
        }),

      increaseLikes: (id) =>
        set((state) => {
          if (state.likedPostIds.includes(id)) return state;
          return {
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, likes: post.likes + 1 } : post
            ),
            likedPostIds: [...state.likedPostIds, id],
          };
        }),

      toggleBookmark: (id) =>
        set((state) => {
          const isBookmarked = state.bookmarkedPostIds.includes(id);
          return {
            bookmarkedPostIds: isBookmarked
              ? state.bookmarkedPostIds.filter((pid) => pid !== id)
              : [...state.bookmarkedPostIds, id],
          };
        }),
    }),
    {
      name: "post-store",
    }
  )
);
