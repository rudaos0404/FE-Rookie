import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import { usePostStore } from "../store/postStore";
import type { Post } from "../types/post";

function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  const posts = usePostStore((state) => state.posts);
  const updatePost = usePostStore((state) => state.updatePost);

  const target = posts.find((p) => p.id === postId);

  const [title, setTitle] = useState(() => target?.title ?? "");
  const [content, setContent] = useState(() => target?.content ?? "");
  const [category, setCategory] = useState<"study" | "job">(
    target?.category ?? "study"
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(() => target?.tags ?? []);

  if (!target) {
    return <div>수정할 게시글을 찾을 수 없습니다.</div>;
  }

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = () => {
    const updated: Post = {
      ...target,
      title,
      content,
      category,
      tags,
      updatedAt: new Date().toISOString(),
    };

    updatePost(updated);

    alert("수정되었습니다.");
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>글 수정</h1>

      <label>
        제목
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label style={{ display: "block", marginTop: "16px" }}>
        내용
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label style={{ display: "block", marginTop: "16px" }}>
        카테고리
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "study" | "job")
          }
          style={{
            padding: "8px",
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <option value="study">학습 / 에러</option>
          <option value="job">취준 / 면접</option>
        </select>
      </label>

      <label style={{ display: "block", marginTop: "16px" }}>
        태그
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="예: React"
          />
          <Button type="button" variant="secondary" onClick={addTag}>
            추가
          </Button>
        </div>

        <div style={{ marginTop: "8px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-badge"
              onClick={() => removeTag(tag)}
              style={{ cursor: "pointer" }}
              title="클릭하면 태그가 제거됩니다"
            >
              #{tag}
            </span>
          ))}
        </div>
      </label>

      <div style={{ marginTop: "24px" }}>
        <Button type="button" onClick={handleSubmit}>
          수정 완료
        </Button>
      </div>
    </div>
  );
}

export default PostEditPage;
