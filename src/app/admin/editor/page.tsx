"use client";
// 클라이언트여서 커스텀훅 사용 가능
import EditorFooter from "@/components/admin/editor/EditorFooter";
import { useState } from "react";
import { savePost } from "@/actions/posts";
import { toast } from "sonner";

import { redirect } from "next/navigation";
import EditorHeader from "@/components/admin/editor/EditorHeader";
import EditorBody from "@/components/admin/editor/EditorBody";
import EditorPreview from "@/components/admin/editor/EditorPreview ";
import { useEditorForm } from "@/hooks/useEditorForm";

export default function EditorPage() {
  // postId 상태 — null이면 새 글, 있으면 수정
  const [postId, setPostId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved"
  );
  const {
    form,
    handleTitleChange,
    handleContentChange,
    handleSlugChange,
    addTag,
    removeLastTag,
    toggleAuthor,
  } = useEditorForm();

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
          <EditorHeader
            title={form.title_ko}
            tags={form.tags}
            slug={form.slug}
            onTitleChange={handleTitleChange}
            onAddTag={addTag}
            onRemoveLastTag={removeLastTag}
            onSlugChange={handleSlugChange}
          />
          <div className="border-border/40 flex-1 p-6">
            <EditorBody content={form.content} onChange={handleContentChange} />
          </div>
        </section>

        {/* 우측: 실시간 미리보기 (마크다운 뷰어) */}

        <EditorPreview form={form} onToggleAuthor={toggleAuthor} />
      </main>
      <EditorFooter onSave={handleSave} status={saveStatus} />
    </div>
  );
}
