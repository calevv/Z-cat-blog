import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

export interface PostForm {
  title_ko: string;
  title_en: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  author_type: "zcat" | "human";
  published: boolean;
}
export interface ChildProps {
  form: PostForm;
  // 리액트 상태 업데이트 함수 타입
  setForm: React.Dispatch<React.SetStateAction<PostForm>>;
}

export default function EditorPreview({ form, setForm }: ChildProps) {
  const toggleAuthor = () => {
    setForm((prev) => ({
      ...prev,
      author_type: prev.author_type === "zcat" ? "human" : "zcat",
    }));
  };
  return (
    <section className="flex flex-col">
      <header className="flex h-17 items-center justify-between border-b border-neutral-200 bg-white px-8 py-4">
        <div className="flex items-center gap-3">
          <p className="font-space text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
            STATUS_04 // PREVIEW
          </p>
          <div className="flex h-6 items-center gap-1.5 rounded border-orange-700/20 bg-orange-700/10 px-2">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-700 opacity-95"></div>
            <p className="font-space text-[9px] leading-3 font-normal tracking-wider text-orange-700 uppercase">
              LIVE
              {/* TODO: 기능 추가 후 로딩이 생기면 SYNCING 이랑 오가게 */}
            </p>
          </div>

          {/* TODO: 임시저장 추가 후 로딩이 생기면 수정 MODIFIED NOW*/}
          <div className="flex items-center gap-1 text-xs leading-4 font-normal tracking-wider text-zinc-500">
            <CheckIcon className="h-5 w-5 text-zinc-500" />
            <p>Autosaved at 12:00 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-space text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
            AUTHOR:
          </p>
          <div className="flex h-7 items-center overflow-hidden rounded border border-neutral-200">
            <button
              onClick={toggleAuthor}
              className={cn(
                "font-space px-4 py-1.5 text-[10px] leading-4 font-medium tracking-wide uppercase",
                form.author_type === "zcat"
                  ? "bg-primary text-white"
                  : "bg-white text-zinc-500"
              )}
            >
              ZCAT
            </button>

            <button
              onClick={toggleAuthor}
              className={cn(
                "font-space px-4 py-1.5 text-[10px] leading-4 font-medium tracking-wide uppercase",
                form.author_type === "human"
                  ? "bg-primary text-white"
                  : "bg-white text-zinc-500"
              )}
            >
              HUMAN
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto bg-neutral-50 p-6">
        <div className="flex flex-col">
          {/* 제목 동기화 */}
          {form.title_ko && (
            <h1 className="font-heading mb-2 text-3xl font-bold text-zinc-900">
              {form.title_ko}
            </h1>
          )}

          {/* 태그 동기화 */}
          {form.tags.length > 0 && (
            <div className="mb-6 flex gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="text-primary font-mono text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div>By {form.author_type}</div>
        {/* prose 클래스가 마크다운 스타일링을 담당, max-w-none으로 너비 제한 해제 */}
        <article className="prose prose-zinc max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {form.content}
          </ReactMarkdown>
        </article>
      </div>
    </section>
  );
}
