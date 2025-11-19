export type Category = "study" | "job";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: Category; // "study" = 학습/에러, "job" = 취준/면접
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}
