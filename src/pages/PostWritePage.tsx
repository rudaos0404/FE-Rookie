import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import { usePostStore } from "../store/postStore";
import type { Post } from "../types/post";

function PostWritePage() {
  const navigate = useNavigate();
  const posts = usePostStore((state) => state.posts);
  const addPost = usePostStore((state) => state.addPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"study" | "job">("study");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const newId =
      posts.length > 0
        ? Math.max(...posts.map((p) => p.id)) + 1
        : 1;

    const now = new Date().toISOString();

    const newPost: Post = {
      id: newId,
      title,
      content,
      category,
      tags,
      author: "이경민",
      createdAt: now,
      updatedAt: now,
      views: 0,
      likes: 0,
    };

    addPost(newPost);
    alert("글이 등록되었습니다.");
    navigate("/posts");
  };

  return (
    <div>
      <h1>새 글 작성</h1>

      <label>
        제목
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
          {/* 태그 추가 버튼은 secondary (회색) */}
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

      {/* 태그 영역과 버튼 사이 간격 확보 */}
      <div style={{ marginTop: "24px" }}>
        <Button type="button" onClick={handleSubmit}>
          글 등록
        </Button>
      </div>
    </div>
  );
}

export default PostWritePage;
