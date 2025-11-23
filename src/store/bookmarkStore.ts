// src/store/bookmarkStore.ts
import { create } from "zustand";

interface BookmarkState {
  bookmarkedIds: number[];
  toggleBookmark: (postId: number) => void;
  isBookmarked: (postId: number) => boolean;
}

const STORAGE_KEY = "fe-rookie-hub-bookmarks";

const loadInitialBookmarks = (): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id: unknown) => typeof id === "number");
  } catch {
    return [];
  }
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkedIds: loadInitialBookmarks(),

  toggleBookmark: (postId) => {
    set((state) => {
      const exists = state.bookmarkedIds.includes(postId);
      const next = exists
        ? state.bookmarkedIds.filter((id) => id !== postId)
        : [...state.bookmarkedIds, postId];

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }

      return { bookmarkedIds: next };
    });
  },

  isBookmarked: (postId) => get().bookmarkedIds.includes(postId),
}));

export default useBookmarkStore;
