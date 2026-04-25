"use client";

// 클라이언트여서 커스텀훅 사용 가능
import EditorFooter from "@/components/admin/editor/EditorFooter";
import { savePost } from "@/lib/actions/posts.action";
import { toast } from "sonner";

import EditorHeader from "@/components/admin/editor/EditorHeader";
import EditorBody from "@/components/admin/editor/EditorBody";
import { useEditorForm } from "@/hooks/useEditorForm";
import { Post } from "@/types/database.types";
import { useRouter } from "next/navigation";
import EditorPreview from "./EditorPreview";
import { EditorContext } from "./EditorContext";

//TODO : 태그 없으면 등록 못하는 처리, 같은 제목 필터링

export default function EditorContainer({
  initialData,
}: {
  initialData?: Post;
}) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const editorForm = useEditorForm({ isEditMode, initialData });

  // 공통 저장 함수
  async function handleSave(published: boolean, coverImageUrl?: string) {
    editorForm.setSaveStatus("saving");

    const result = await savePost({
      id: editorForm.postId ?? undefined,
      ...editorForm.form,
      cover_image: coverImageUrl,
      published,
    });

    if (!result.success) {
      toast.error(result.message);
      editorForm.setSaveStatus("unsaved");
      return;
    }

    // 새 글이면 id 저장 (다음 저장부터 UPDATE로)
    if (result.id) editorForm.setPostId(result.id);

    editorForm.setSaveStatus("saved");
    toast.success(result.message);

    // 올리기면 대시보드로 이동
    if (published) router.push("/admin");
  }

  return (
    <EditorContext.Provider
      value={{
        ...editorForm,
        handleSave,
        isEditMode,
        initialCoverImage: initialData?.cover_image,
      }}
    >
      <div className="flex h-screen w-full flex-col">
        <main className="grid flex-1 grid-cols-2">
          {/* 에디터 메인 영역 (좌우 분할) */}
          {/* 좌측: 마크다운 입력창 */}
          <section className="flex flex-col border-r border-neutral-200 bg-white">
            <EditorHeader />
            <div className="border-border/40 flex-1 p-6">
              <EditorBody />
            </div>
          </section>

          {/* 우측: 실시간 미리보기 (마크다운 뷰어) */}

          <EditorPreview />
        </main>
        <EditorFooter />
      </div>
    </EditorContext.Provider>
  );
}
