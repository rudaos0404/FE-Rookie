// src/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  nickname: string;
}

interface UserStoreState {
  currentUser: User | null;
  login: (nickname: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (nickname) => set({ currentUser: { nickname } }),
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);
