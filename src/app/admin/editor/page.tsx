"use client";

import EditorFooter from "@/components/admin/editor/EditorFooter";
import { generateSlug } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { savePost } from "@/actions/posts";
import { toast } from "sonner";

import { redirect } from "next/navigation";
import EditorHeader from "@/components/admin/editor/EditorHeader";
import EditorBody from "@/components/admin/editor/EditorBody";
import EditorPreview from "@/components/admin/editor/EditorPreview ";

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

    // 1초 후 번역 실행
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
    }, 1000); // 1초
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
          <EditorHeader form={form} setForm={setForm} />
          <div className="border-border/40 flex-1 p-6">
            <EditorBody
              content={form.content}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, content: value }))
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
          <EditorPreview form={form} />
        </section>
      </main>
      <EditorFooter onSave={handleSave} status={saveStatus} />
    </div>
  );
}
