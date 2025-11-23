// src/App.tsx
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";
import BookmarkPage from "./pages/BookmarkPage";

import { useUserStore } from "./store/userStore";
import { useThemeStore } from "./store/themeStore";

function Header() {
  const location = useLocation();
  const { currentUser, login, logout } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  const [nicknameInput, setNicknameInput] = useState("");

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const handleLogin = () => {
    const nickname = nicknameInput.trim();
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    login(nickname);
    setNicknameInput("");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        {/* 로고 / 제목 */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/90 text-sm font-bold text-white">
            PB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-50">
              Portfolio Blog
            </span>
            <span className="text-xs text-slate-400">
              기록으로 만드는 취업 포트폴리오
            </span>
          </div>
        </Link>

        {/* 내비게이션 + 우측 영역 */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* 내비게이션 */}
          <nav className="hidden items-center gap-3 text-xs md:flex">
            <Link
              to="/"
              className={`rounded-full px-3 py-1.5 ${
                isActive("/")
                  ? "bg-sky-500/90 text-white"
                  : "text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              홈
            </Link>
            <Link
              to="/posts"
              className={`rounded-full px-3 py-1.5 ${
                isActive("/posts")
                  ? "bg-sky-500/90 text-white"
                  : "text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              전체 글
            </Link>
            <Link
              to="/bookmarks"
              className={`rounded-full px-3 py-1.5 ${
                isActive("/bookmarks")
                  ? "bg-sky-500/90 text-white"
                  : "text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              북마크
            </Link>
          </nav>

          {/* 테마 토글 버튼 */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-sm hover:border-sky-500/70 hover:text-sky-300"
            aria-label="테마 전환"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          {/* 로그인 영역 */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-slate-300 md:inline">
                {currentUser.nickname}님
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-100 hover:bg-slate-700"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                className="w-24 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 outline-none ring-1 ring-slate-700 placeholder:text-slate-500 focus:ring-sky-500/70"
                placeholder="닉네임"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleLogin}
                className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-400"
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function App() {
  const { theme } = useThemeStore();

  // ✅ theme 상태가 바뀔 때 html 클래스(light/dark) 동기화
  useEffect(() => {
    const root = document.documentElement;
    const next = theme === "light" ? "light" : "dark";
    const prev = next === "light" ? "dark" : "light";

    root.classList.remove(prev);
    root.classList.add(next);
  }, [theme]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/write" element={<PostWritePage />} />
          <Route path="/edit/:id" element={<PostEditPage />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
