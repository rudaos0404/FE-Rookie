import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { usePostStore } from "../store/postStore";

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);
  const increaseViews = usePostStore((state) => state.increaseViews);
  const increaseLikes = usePostStore((state) => state.increaseLikes);

  const post = posts.find((p) => p.id === postId);

  const [liked, setLiked] = useState(false); // 이 세션에서 한 번만 좋아요 가능

  useEffect(() => {
    if (!Number.isNaN(postId)) {
      increaseViews(postId);
    }
  }, [postId, increaseViews]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleDelete = () => {
    if (!window.confirm("정말 이 글을 삭제할까요?")) return;
    deletePost(postId);
    alert("삭제되었습니다.");
    navigate("/posts");
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleLike = () => {
    if (liked) {
      alert("이미 좋아요를 누른 글입니다.");
      return;
    }
    increaseLikes(postId);
    setLiked(true);
  };

    return (
    <div className="card">
      <h1>{post.title}</h1>

      <p>
        작성자: {post.author} | 카테고리:{" "}
        {post.category === "study" ? "학습/에러" : "취준/면접"}
      </p>

      <p>태그: {post.tags.join(", ")}</p>

      <p>
        조회수: {post.views} | 좋아요: {post.likes}
      </p>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <Button type="button" onClick={handleLike}>
          좋아요 ❤️ {post.likes}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleEdit}
        >
          수정
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>

      <hr style={{ margin: "24px 0" }} />
      <pre style={{ whiteSpace: "pre-wrap" }}>{post.content}</pre>
    </div>
  );

}

export default PostDetailPage;
