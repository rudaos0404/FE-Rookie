// src/pages/PostListPage.tsx
import { useMemo, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { usePostStore, type Post } from "../store/postStore";

type CategoryFilter = "all" | "study" | "job";
type SortKey = "latest" | "views" | "likes";

function filterPosts(
  posts: Post[],
  category: CategoryFilter,
  sortKey: SortKey,
  keyword: string
): Post[] {
  let list = [...posts];

  // 카테고리 필터
  if (category !== "all") {
    list = list.filter((p) => p.category === category);
  }

  // 검색 (제목 + 내용 + 태그)
  const q = keyword.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const target =
        `${p.title} ${p.content} ${p.tags.join(" ")}`.toLowerCase();
      return target.includes(q);
    });
  }

  // 정렬
  list.sort((a, b) => {
    if (sortKey === "latest") {
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    if (sortKey === "views") {
      return b.views - a.views;
    }
    if (sortKey === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return list;
}

function PostListPage() {
  const posts = usePostStore((state) => state.posts);

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("latest");
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(
    () => filterPosts(posts, category, sortKey, keyword),
    [posts, category, sortKey, keyword]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50 pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-50">전체 글</h1>
            <p className="text-xs text-slate-400 mt-1">
              총 {posts.length}개의 기록이 있습니다.
            </p>
          </div>
          <Link
            to="/write"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 transition"
          >
            + 새 글 작성
          </Link>
        </div>

        {/* 필터 / 검색 바 */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-900/80 p-3 border border-slate-800/70">
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-full px-3 py-1.5 ${
                category === "all"
                  ? "bg-sky-500/90 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setCategory("study")}
              className={`rounded-full px-3 py-1.5 ${
                category === "study"
                  ? "bg-emerald-500/80 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              학습 / 에러
            </button>
            <button
              type="button"
              onClick={() => setCategory("job")}
              className={`rounded-full px-3 py-1.5 ${
                category === "job"
                  ? "bg-fuchsia-500/80 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              취준 / 면접
            </button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs text-slate-100 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500/70"
            >
              <option value="latest">최신순</option>
              <option value="views">조회수순</option>
              <option value="likes">좋아요순</option>
            </select>
            <div className="relative">
              <input
                className="w-40 rounded-full bg-slate-900 px-3 py-1.5 pr-8 text-xs text-slate-100 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500/70"
                placeholder="검색 (제목/내용/태그)"
                value={keyword}
                onChange={handleSearchChange}
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* 게시글 리스트 */}
        {filtered.length === 0 ? (
          <div className="mt-10 text-center text-sm text-slate-400">
            조건에 맞는 게시글이 없습니다.
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/posts/${post.id}`}
                  className="block rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4 md:p-5 shadow-sm
                             transition-transform transition-colors duration-200
                             hover:-translate-y-1 hover:bg-slate-900 hover:border-sky-500/60"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          post.category === "study"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                            : "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/40"
                        }`}
                      >
                        {post.category === "study" ? "학습 / 에러" : "취준 / 면접"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {post.author}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 space-x-2">
                      <span>조회 {post.views}</span>
                      <span>좋아요 {post.likes}</span>
                    </div>
                  </div>

                  <h2 className="mb-1 text-base md:text-lg font-semibold text-slate-50">
                    {post.title}
                  </h2>
                  <p className="mb-2 line-clamp-2 text-xs md:text-sm text-slate-300">
                    {post.content}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostListPage;
