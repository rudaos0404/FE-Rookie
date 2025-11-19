import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { usePostStore } from "../store/postStore";
import type { Post } from "../types/post";

type CategoryFilter = "all" | "study" | "job";
type SortBy = "latest" | "views" | "likes";

function PostListPage() {
  const posts = usePostStore((state) => state.posts);

  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("latest");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredByCategory = posts.filter((post) => {
    if (categoryFilter === "all") return true;
    return post.category === categoryFilter;
  });

  const filteredBySearch = filteredByCategory.filter((post) => {
    if (!keyword.trim()) return true;

    const lower = keyword.toLowerCase();
    const inTitle = post.title.toLowerCase().includes(lower);
    const inContent = post.content.toLowerCase().includes(lower);
    const inTags = post.tags.some((tag) =>
      tag.toLowerCase().includes(lower)
    );

    return inTitle || inContent || inTags;
  });

  const filteredByTag = filteredBySearch.filter((post) => {
    if (!selectedTag) return true;
    return post.tags.includes(selectedTag);
  });

  const sortedPosts = [...filteredByTag].sort((a: Post, b: Post) => {
    if (sortBy === "latest") {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    }
    if (sortBy === "views") {
      return b.views - a.views;
    }
    if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const handleResetTag = () => {
    setSelectedTag(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* 제목 + 우측 글 작성 버튼 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0 }}>전체 글 목록</h1>
        <div style={{ marginLeft: "auto" }}>
          <Link
            to="/write"
            className="btn btn-primary"
            style={{
              textDecoration: "none",
              padding: "6px 14px",
              fontSize: 13,
            }}
          >
            글 작성
          </Link>
        </div>
      </div>

      {/* 🔍 필터 카드 */}
      <div className="card">
        {/* 검색 인풋 */}
        <div className="toolbar-row">
          <div style={{ flex: "1 1 260px", minWidth: "260px" }}>
            <label style={{ fontSize: 14, fontWeight: 500 }}>
              검색
              <Input
                placeholder="제목, 내용, 태그로 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="toolbar-input"
                style={{ marginTop: 4 }}
              />
            </label>
          </div>
        </div>

        {/* 카테고리 / 정렬 */}
        <div
          className="toolbar-row"
          style={{ marginTop: 10 }}
        >
          <div>
            <label style={{ fontSize: 14, fontWeight: 500 }}>
              카테고리
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value as CategoryFilter
                  )
                }
                className="toolbar-select"
                style={{ marginTop: 4 }}
              >
                <option value="all">전체</option>
                <option value="study">학습 / 에러</option>
                <option value="job">취준 / 면접</option>
              </select>
            </label>
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 500 }}>
              정렬
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortBy)
                }
                className="toolbar-select"
                style={{ marginTop: 4 }}
              >
                <option value="latest">최신순</option>
                <option value="views">조회수순</option>
                <option value="likes">좋아요순</option>
              </select>
            </label>
          </div>
        </div>

        {/* 선택된 태그 */}
        {selectedTag && (
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 13 }}>
              선택된 태그:{" "}
              <strong style={{ fontWeight: 600 }}>
                #{selectedTag}
              </strong>
            </span>
            <Button
              type="button"
              variant="secondary"
              onClick={handleResetTag}
            >
              태그 초기화
            </Button>
          </div>
        )}
      </div>

      {/* 📄 글 목록 카드 */}
      <div className="card">
        {sortedPosts.length === 0 ? (
          <p>조건에 해당하는 게시글이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sortedPosts.map((post) => (
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
                <div style={{ marginTop: 4 }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-badge"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostListPage;
