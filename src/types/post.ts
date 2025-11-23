// src/types/post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  category: "study" | "job";
  tags: string[];
  author: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string | null;
}
