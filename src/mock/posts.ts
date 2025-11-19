import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "React useEffect 의존성 배열 정리",
    content: "useEffect 의존성 배열을 어떻게 설정해야 하는지 정리했습니다...",
    author: "이경민",
    category: "study",
    tags: ["React", "useEffect", "에러해결"],
    createdAt: "2025-11-20",
    updatedAt: "2025-11-20",
    views: 12,
    likes: 3,
  },
  {
    id: 2,
    title: "프론트엔드 신입 면접에서 실제로 받은 질문들",
    content: "1. this는 무엇인가요?\n2. 클로저를 설명해보세요...",
    author: "경민의 친구",
    category: "job",
    tags: ["면접질문", "취준", "JavaScript"],
    createdAt: "2025-11-19",
    updatedAt: "2025-11-19",
    views: 50,
    likes: 10,
  },
];
