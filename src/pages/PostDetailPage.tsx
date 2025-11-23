// src/pages/PostDetailPage.tsx
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import { useUserStore } from "../store/userStore";

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const postId = id ? Number(id) : NaN;

  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);
  const increaseLikes = usePostStore((state) => state.increaseLikes);
  const increaseViews = usePostStore((state) => state.increaseViews);
  const likedPostIds = usePostStore((state) => state.likedPostIds);
  const bookmarkedPostIds = usePostStore((state) => state.bookmarkedPostIds);
  const toggleBookmark = usePostStore((state) => state.toggleBookmark);

  const currentUser = useUserStore((state) => state.currentUser);

  const post = posts.find((p) => p.id === postId) || null;

  const hasCountedRef = useRef(false);

  // 조회수 1회만 증가
  useEffect(() => {
    if (!Number.isNaN(postId) && post && !hasCountedRef.current) {
      hasCountedRef.current = true;
      increaseViews(postId);
    }
  }, [postId, post, increaseViews]);

  // 잘못된 id
  if (!id || Number.isNaN(postId)) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-lg font-semibold">
          잘못된 접근입니다. 게시글 ID가 올바르지 않습니다.
        </p>
      </div>
    );
  }

  // 게시글 없음
  if (!post) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-lg font-semibold">
          게시글을 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const isAuthor = currentUser?.nickname === post.author;
  const hasLiked = likedPostIds.includes(postId);
  const isBookmarked = bookmarkedPostIds.includes(postId);

  const handleDelete = () => {
    if (!window.confirm("정말 이 게시글을 삭제할까요?")) return;
    deletePost(postId);
    navigate("/posts");
  };

  const handleLike = () => {
    if (hasLiked) {
      alert("이미 좋아요를 누른 게시글입니다.");
      return;
    }
    increaseLikes(postId);
  };

  const handleBookmark = () => {
    toggleBookmark(postId);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 pb-16 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-slate-300 hover:text-sky-400 transition-colors"
        >
          ← 뒤로가기
        </button>

        <article className="bg-slate-900/80 rounded-3xl border border-slate-800/60 p-6 md:p-8 shadow-lg">
          <header className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  post.category === "study"
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    : "bg-sky-500/10 text-sky-300 border border-sky-500/30"
                }`}
              >
                {post.category === "study" ? "학습 / 에러" : "취준 / 면접"}
              </span>

              <div className="space-x-3 text-xs text-slate-400">
                <span>조회 {post.views}</span>
                <span>좋아요 {post.likes}</span>
              </div>
            </div>

            <h1 className="mb-2 text-2xl md:text-3xl font-bold text-slate-50">
              {post.title}
            </h1>
            <div className="text-sm text-slate-400">
              <span>{post.author}</span>
              <span className="mx-2">·</span>
              <span>
                {new Date(post.createdAt).toLocaleString("ko-KR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-6">
              <img
                src={post.imageUrl}
                alt="대표 이미지"
                className="w-full max-h-80 rounded-2xl border border-slate-800 object-cover"
              />
            </div>
          )}

          <section className="prose prose-invert max-w-none text-[15px] leading-relaxed text-slate-100">
            {post.content.split("\n").map((line, idx) => (
              <p key={idx} className="mb-2">
                {line}
              </p>
            ))}
          </section>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {/* 좋아요 버튼 */}
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition
                border border-slate-700 bg-slate-800 hover:-translate-y-0.5 hover:bg-slate-700 active:scale-95 ${
                  hasLiked ? "border-amber-400 text-amber-300" : "text-slate-100"
                }`}
              >
                <span>👍</span>
                <span>좋아요 {post.likes}</span>
              </button>

              {/* 북마크 버튼 */}
              <button
                type="button"
                onClick={handleBookmark}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition
                border bg-slate-800 hover:-translate-y-0.5 hover:bg-slate-700 active:scale-95 ${
                  isBookmarked
                    ? "border-amber-400 text-amber-300"
                    : "border-slate-700 text-slate-100"
                }`}
              >
                <span>{isBookmarked ? "★" : "☆"}</span>
                <span>{isBookmarked ? "북마크 해제" : "북마크"}</span>
              </button>

              {isAuthor && (
                <>
                  <Link
                    to={`/edit/${postId}`}
                    className="flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition hover:-translate-y-0.5 active:scale-95"
                  >
                    수정
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 transition hover:-translate-y-0.5 active:scale-95"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default PostDetailPage;
