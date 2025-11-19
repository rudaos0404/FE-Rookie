import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="app-logo">
            FE Rookie Hub
          </Link>
          <nav className="app-nav">
            <Link to="/posts" className="app-nav-link">
              전체 글
            </Link>
            <Link
              to="/write"
              className="app-nav-link app-nav-link-primary"
            >
              글 작성
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/write" element={<PostWritePage />} />
            <Route path="/edit/:id" element={<PostEditPage />} />
          </Routes>
        </div>
      </main>

      <footer className="app-footer">
        © 2025 FE Rookie Hub – Created by 이경민
      </footer>
    </div>
  );
}

export default App;
