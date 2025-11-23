// src/pages/HomePage.tsx
import { Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";

// 날짜 포맷 유틸 (실제로 사용됨)
function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
}

export default function HomePage() {
  const navigate = useNavigate();
  const posts = usePostStore((state) => state.posts);

  // 최신순 정렬
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latest = sorted.slice(0, 5);
  const recentStudy = sorted
    .filter((p) => p.category === "study")
    .slice(0, 3);
  const recentJob = sorted.filter((p) => p.category === "job").slice(0, 3);

  // 태그 카운트 → 상위 6개
  const tagCount = new Map<string, number>();
  posts.forEach((p) =>
    p.tags.forEach((t) => {
      tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
    })
  );
  const popularTags = [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag);

  const handleGoPosts = () => navigate("/posts");
  const handleGoWrite = () => navigate("/write");

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-10">
        {/* 🎨 Hero 카드 */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 p-[1px] shadow-[0_18px_45px_rgba(15,23,42,0.7)]">
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-950/95 px-8 py-8 text-slate-50 md:flex-row md:items-center md:px-10">
            <div className="space-y-4 md:max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-sky-200">
                FE ROOKIE HUB
              </p>
              <h1 className="text-2xl font-bold leading-snug md:text-3xl">
                프론트엔드 학습 · 에러 · 취준 정보를
                <br />
                함께 나누는 작은 허브입니다.
              </h1>
              <p className="text-sm leading-relaxed text-slate-200/85 md:text-[13px]">
                데브코스 풀스택 과정을 수강 중인 이경민이 직접 사용하기 위해 만든
                프로젝트로, 공부 기록과 실전 면접 경험을 편하게 정리하고 공유할 수
                있어요.
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleGoPosts}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 active:scale-95"
                >
                  전체 글 보러가기
                </button>
                <button
                  type="button"
                  onClick={handleGoWrite}
                  className="inline-flex items-center rounded-full bg-sky-300 px-4 py-2 font-semibold text-slate-950 shadow-sm transition hover:bg-sky-200 active:scale-95"
                >
                  새 글 작성하기
                </button>
              </div>
            </div>

            {/* 오른쪽 작은 카드 */}
                <div className="hidden shrink-0 md:block">
                  <div className="relative w-52">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-sky-200/80 to-fuchsia-200/80 blur-sm" />
                    <div className="relative flex w-full flex-col rounded-3xl bg-slate-950/90 p-4 text-[11px] text-slate-50 shadow-lg gap-1">
                      <p className="font-semibold text-sky-200">오늘의 한 줄</p>
                      <p className="break-words text-[11px] leading-relaxed text-slate-100/95 line-clamp-4">
                        “하루에 한 번이라도 기록하면, 1년 뒤엔 포트폴리오가 됩니다.”
                      </p>
                      <p className="break-words text-[10px] text-slate-400 line-clamp-2">
                        작은 기록 하나가 내일의 합격을 만듭니다.
                      </p>
                    </div>
                  </div>
                </div>
          </div>
        </section>

        {/* 📰 최근 글 + 🔥 인기 태그 */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* 최근 글 */}
          <div className="rounded-2xl bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900/85 dark:ring-slate-800">
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                📌 최근 올라온 글
              </h2>
              <Link
                to="/posts"
                className="text-[11px] font-medium text-sky-600 hover:underline dark:text-sky-400"
              >
                전체 보기
              </Link>
            </header>

            <ul className="space-y-2">
              {latest.length === 0 && (
                <li className="py-4 text-xs text-slate-400 dark:text-slate-500">
                  아직 작성된 글이 없습니다. 첫 글을 남겨보세요!
                </li>
              )}

              {latest.map((post) => (
                <li
                  key={post.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-xs text-slate-800 transition hover:border-sky-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-sky-500"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-200 px-2 py-[1px] text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {post.category === "study"
                          ? "학습 / 에러"
                          : "취준 / 면접"}
                      </span>
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <p className="line-clamp-1 text-[13px] font-semibold text-slate-900 dark:text-slate-50">
                      {post.title}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                      조회수 {post.views} · 좋아요 {post.likes}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 인기 태그 */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white/95 p-5 text-xs shadow-sm ring-1 ring-slate-100 dark:bg-slate-900/85 dark:text-slate-100 dark:ring-slate-800">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <span>🔥</span> 인기 태그
              </h2>
              {popularTags.length === 0 ? (
                <p className="text-[12px] text-slate-400 dark:text-slate-500">
                  아직 태그가 없습니다. 글을 작성할 때 태그를 달아보세요.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-slate-900/95 p-4 text-[12px] text-slate-100 shadow-sm ring-1 ring-slate-800">
              <p className="text-[11px] font-semibold text-sky-200">
                오늘의 팁
              </p>
              <p className="mt-2 leading-relaxed text-slate-100/90">
                에러를 캡처해서 정리해 두면, 나중에 포트폴리오에 넣을 수 있는
                좋은 사례가 됩니다.
              </p>
            </div>
          </aside>
        </section>

        {/* 카테고리별 최근 글 2열 */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* 학습 / 에러 */}
          <div className="rounded-2xl bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900/85 dark:ring-slate-800">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
              📚 학습 / 에러 관련 최근 글
            </h2>
            <ul className="space-y-2 text-xs">
              {recentStudy.length === 0 && (
                <li className="text-[12px] text-slate-400 dark:text-slate-500">
                  아직 학습 / 에러 관련 글이 없습니다.
                </li>
              )}
              {recentStudy.map((post) => (
                <li
                  key={post.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 transition hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-emerald-400"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    className="flex flex-col gap-1"
                  >
                    <p className="line-clamp-1 text-[13px] font-semibold text-slate-900 dark:text-slate-50">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      조회수 {post.views} · 좋아요 {post.likes}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 취준 / 면접 */}
          <div className="rounded-2xl bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900/85 dark:ring-slate-800">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
              💼 취준 / 면접 관련 최근 글
            </h2>
            <ul className="space-y-2 text-xs">
              {recentJob.length === 0 && (
                <li className="text-[12px] text-slate-400 dark:text-slate-500">
                  아직 취준 / 면접 관련 글이 없습니다.
                </li>
              )}
              {recentJob.map((post) => (
                <li
                  key={post.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 transition hover:border-pink-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-pink-400"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    className="flex flex-col gap-1"
                  >
                    <p className="line-clamp-1 text-[13px] font-semibold text-slate-900 dark:text-slate-50">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      조회수 {post.views} · 좋아요 {post.likes}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="mt-4 flex justify-center text-[11px] text-slate-400 dark:text-slate-500">
          © 2025 FE Rookie Hub – Created by 이경민
        </footer>
      </div>
    </main>
  );
}
