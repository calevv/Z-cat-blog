"use client";

import EditorFooter from "@/components/admin/editor/EditorFooter";
import { generateSlug } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost } from "@/actions/posts";
import { toast } from "sonner";

import { redirect } from "next/navigation";

export default function EditorPage() {
  const [form, setForm] = useState({
    title_ko: "",
    title_en: "", // 번역 결과
    slug: "",
    content: "",
    excerpt: "",
    tags: [] as string[],
    author_type: "zcat" as "zcat" | "human",
    published: false,
  });
  useEffect(() => {
    // title_ko가 없으면 실행 안 함
    if (!form.title_ko.trim()) return;

    // 2초 후 번역 실행
    const timer = setTimeout(async () => {
      try {
        // MyMemory API 호출
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(form.title_ko)}&langpair=ko|en`
        );
        const data = await res.json();
        const translated = data.responseData.translatedText as string;

        // 번역 결과로 slug 생성
        const slug = generateSlug(translated);

        setForm((prev) => ({
          ...prev,
          title_en: translated,
          slug,
        }));
      } catch (error) {
        console.error("번역 실패:", error);
      }
    }, 2000); // 2초
    // Todo: 몇초가 적당한지 고민...

    // 클린업: title_ko가 또 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [form.title_ko]);

  const toggleAuthor = () => {
    setForm((prev) => ({
      ...prev,
      author_type: prev.author_type === "zcat" ? "human" : "zcat",
    }));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      form.tags.length > 0
    ) {
      setForm((prev) => ({ ...prev, tags: prev.tags.slice(0, -1) })); // 마지막 태그 제거
    }
    {
      /* TODO: 동일 태그 입력시 표시 확실하게 */
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !form.tags.includes(value)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, value] }));
        e.currentTarget.value = "";
      }
    }
  };

  // postId 상태 — null이면 새 글, 있으면 수정
  const [postId, setPostId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved"
  );

  // 공통 저장 함수
  async function handleSave(published: boolean) {
    // 필수값 체크
    if (!form.title_ko.trim()) {
      toast.error("제목을 입력해라, 인간.");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("slug가 없다. 번역을 기다려라.");
      return;
    }

    setSaveStatus("saving");

    const result = await savePost({
      id: postId ?? undefined,
      ...form,
      published,
    });

    if (!result.success) {
      toast.error(result.message);
      setSaveStatus("unsaved");
      return;
    }

    // 새 글이면 id 저장 (다음 저장부터 UPDATE로)
    if (result.id) setPostId(result.id);

    setSaveStatus("saved");
    toast.success(result.message);

    // 올리기면 대시보드로 이동
    if (published) redirect("/admin");
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <main className="grid h-full flex-1 grid-cols-2">
        {/* 에디터 메인 영역 (좌우 분할) */}
        {/* 좌측: 마크다운 입력창 */}
        <section className="flex flex-col border-r border-neutral-200 bg-white">
          <header className="flex h-44 flex-col gap-4 border-b border-neutral-200 px-8 pt-6">
            {/* TODO: 타이틀과 태그는 이후 보여주기창과 동기화 기능 필요*/}

            <input
              value={form.title_ko}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title_ko: e.target.value }))
              }
              type="text"
              name="title"
              placeholder="POST_TITLE"
              className="font-heading text-3xl font-bold text-zinc-500 placeholder:text-zinc-300"
            />
            <div className="flex flex-wrap items-center gap-1">
              <label className="text-muted-foreground font-mono text-xs">
                TAGS:
              </label>
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-600 uppercase"
                >
                  # {tag}
                </span>
              ))}

              {/* 실제 입력창 */}
              <input
                type="text"
                onKeyDown={handleKeyDown}
                name={"tags"}
                placeholder={form.tags.length === 0 ? "ADD_TAGS..." : ""}
                className="font-space text-xs font-normal tracking-wide text-zinc-500 placeholder:text-zinc-300"
              />
            </div>
            <div className="flex gap-1">
              <label className="text-muted-foreground font-mono text-xs">
                URL_SLUG:
              </label>
              <input
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slug: e.target.value }))
                }
                type="text"
                name="slug"
                placeholder="POST_URL_SLUG"
                className="font-space flex-1 text-xs font-normal tracking-wide text-red-500 transition-colors placeholder:text-red-300 focus:outline-none"
              />
            </div>
          </header>
          <div className="border-border/40 flex-1 p-6">
            <textarea
              className="h-full w-full resize-none bg-transparent font-mono outline-none"
              placeholder="마크다운을 입력하세요..."
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
        </section>

        {/* 우측: 실시간 미리보기 (마크다운 뷰어) */}
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
      </main>{" "}
      <EditorFooter onSave={handleSave} status={saveStatus} />
    </div>
  );
}
