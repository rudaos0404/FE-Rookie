// src/pages/PostWritePage.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import { useUserStore } from "../store/userStore";

function PostWritePage() {
  const navigate = useNavigate();

  const addPost = usePostStore((state) => state.addPost);
  const currentUser = useUserStore((state) => state.currentUser);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"study" | "job">("study");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(typeof reader.result === "string" ? reader.result : null);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const author = currentUser?.nickname ?? "익명";

    addPost(
      {
        title,
        content,
        category,
        tags,
        imageUrl,
      },
      author
    );

    navigate("/posts");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50 px-4 pb-16">
      <div className="max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>

      {/* ----- 이하 JSX는 그대로 ----- */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-slate-900/80 rounded-3xl border border-slate-800/60 p-6 md:p-8"
        >
          <div>
            <label className="block text-sm font-medium mb-2">제목</label>
            <input
              className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500/60"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">내용</label>
            <textarea
              className="w-full min-h-[180px] rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500/60 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">카테고리</label>
              <select
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500/60"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value === "job" ? "job" : "study")
                }
              >
                <option value="study">학습 / 에러</option>
                <option value="job">취준 / 면접</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                대표 이미지 (선택)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-slate-800 file:text-slate-50 hover:file:bg-slate-700"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="미리보기"
                  className="mt-3 w-full max-h-48 object-cover rounded-2xl border border-slate-800"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">태그</label>
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 rounded-2xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500/60"
                placeholder="예: React"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-100 text-sm font-medium hover:bg-slate-700"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-100 text-xs"
                >
                  <span>#{tag}</span>
                  <span className="ml-1 text-slate-400">×</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-full bg-slate-800 text-slate-100 text-sm font-medium hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostWritePage;
