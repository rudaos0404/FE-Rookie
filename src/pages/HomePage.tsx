import { Link } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import type { Post } from "../types/post";

function getLatestPosts(posts: Post[], limit: number) {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

function getPopularTags(posts: Post[], limit: number) {
  const countMap: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      countMap[tag] = (countMap[tag] || 0) + 1;
    });
  });

  const entries = Object.entries(countMap).sort((a, b) => b[1] - a[1]);

  return entries.slice(0, limit).map(([tag]) => tag);
}

function HomePage() {
  const posts = usePostStore((state) => state.posts);

  const latestPosts = getLatestPosts(posts, 5);
  const latestStudyPosts = getLatestPosts(
    posts.filter((p) => p.category === "study"),
    3
  );
  const latestJobPosts = getLatestPosts(
    posts.filter((p) => p.category === "job"),
    3
  );
  const popularTags = getPopularTags(posts, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 소개 + 액션 */}
      <section className="card">
        <h1>FE Rookie Hub</h1>
        <p>
          프론트엔드 학습 / 에러 / 취준 정보를 공유하는 커뮤니티입니다.
          <br />
          데브코스 풀스택 과정을 수강 중인 이경민이 직접 사용하기 위해
          만들었습니다.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <Link
            to="/posts"
            className="btn btn-secondary"
            style={{ textDecoration: "none" }}
          >
            전체 글 보러가기
          </Link>
          <Link
            to="/write"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            새 글 작성하기
          </Link>
        </div>
      </section>

      {/* 최근 글 + 카테고리별 */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr",
          gap: 20,
        }}
      >
        <div className="card">
          <h2>📝 최근 올라온 글</h2>
          {latestPosts.length === 0 ? (
            <p>아직 작성된 글이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {latestPosts.map((post) => (
                <li key={post.id} className="post-card">
                  <div className="post-card-title">
                    <Link to={`/posts/${post.id}`}>
                      [{post.category === "study" ? "학습" : "취준"}]{" "}
                      {post.title}
                    </Link>
                  </div>
                  <div className="post-card-meta">
                    작성자: {post.author} · 조회수 {post.views} · 좋아요{" "}
                    {post.likes}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>🔥 인기 태그</h2>
          {popularTags.length === 0 ? (
            <p>태그가 아직 없습니다.</p>
          ) : (
            <div style={{ marginTop: 8 }}>
              {popularTags.map((tag) => (
                <span key={tag} className="tag-badge">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 카테고리별 최근 글 */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <div className="card">
          <h2>📚 학습 / 에러 관련 최근 글</h2>
          {latestStudyPosts.length === 0 ? (
            <p>학습 관련 글이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {latestStudyPosts.map((post) => (
                <li key={post.id} className="post-card">
                  <div className="post-card-title">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </div>
                  <div className="post-card-meta">
                    조회수 {post.views} · 좋아요 {post.likes}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>💼 취준 / 면접 관련 최근 글</h2>
          {latestJobPosts.length === 0 ? (
            <p>취준 관련 글이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {latestJobPosts.map((post) => (
                <li key={post.id} className="post-card">
                  <div className="post-card-title">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </div>
                  <div className="post-card-meta">
                    조회수 {post.views} · 좋아요 {post.likes}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
