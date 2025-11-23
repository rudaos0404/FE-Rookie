// src/pages/BookmarkPage.tsx
import { Link } from "react-router-dom";
import { usePostStore } from "../store/postStore";

function BookmarkPage() {
  // ✅ selector를 나눠서 안전하게 가져오기
  const posts = usePostStore((state) => state.posts);
  const bookmarkedPostIds =
    usePostStore((state) => state.bookmarkedPostIds) ?? [];
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  // ✅ bookmarkedPostIds가 비어 있어도 안전
  const bookmarkedPosts = posts.filter((p) => bookmarkedPostIds.includes(p.id));
  const hasBookmarks = bookmarkedPosts.length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50 pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-50">북마크</h1>
            <p className="mt-1 text-xs text-slate-400">
              나중에 다시 보고 싶은 글들을 모아둔 공간입니다.
            </p>
          </div>
          <Link
            to="/posts"
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:border-sky-500/70 hover:text-sky-200 transition"
          >
            전체 글 보러가기
          </Link>
        </div>

        {!hasBookmarks ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl">
              ⭐
            </div>
            <p className="text-sm font-medium text-slate-200">
              아직 북마크한 글이 없습니다.
            </p>
            <p className="text-xs text-slate-400">
              마음에 드는 글에서 북마크 버튼을 눌러 모아보세요.
            </p>
            <Link
              to="/posts"
              className="mt-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
            >
              글 보러가기
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {bookmarkedPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/posts/${post.id}`}
                  className="group block rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4 md:p-5 shadow-sm transition-transform transition-colors duration-200 hover:-translate-y-1 hover:bg-slate-900 hover:border-sky-500/60"
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // 링크 이동 막기
                        toggleBookmark(post.id);
                      }}
                      className="rounded-full bg-slate-800/80 px-3 py-1 text-[11px] text-amber-200 hover:bg-slate-700 transition flex items-center gap-1"
                    >
                      ★ 북마크 해제
                    </button>
                  </div>

                  <h2 className="mb-1 text-base md:text-lg font-semibold text-slate-50">
                    {post.title}
                  </h2>
                  <p className="mb-2 line-clamp-2 text-xs md:text-sm text-slate-300">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>
                      조회 {post.views} · 좋아요 {post.likes}
                    </span>
                    <span>
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

export default BookmarkPage;
