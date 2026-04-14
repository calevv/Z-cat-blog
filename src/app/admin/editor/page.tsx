"use client";

import EditorFooter from "@/components/admin/editor/EditorFooter";
import { generateSlug } from "@/lib/utils";
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
      <main className="grid flex-1 grid-cols-2">
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

        <EditorPreview form={form} setForm={setForm} />
      </main>
      <EditorFooter onSave={handleSave} status={saveStatus} />
    </div>
  );
}
