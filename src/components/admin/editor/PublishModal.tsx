"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditor } from "./EditorContext";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadCoverImage } from "@/lib/actions/posts.action";

export default function PublishModal() {
  const { form, handleSave, saveStatus, initialCoverImage, isEditMode } = useEditor();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialCoverImage ?? null
  );
  const [localExcerpt, setLocalExcerpt] = useState(form.excerpt);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => {
    if (!form.title_ko.trim()) {
      toast.error("제목을 입력해라, 인간.");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("slug가 없다. 번역을 기다려라.");
      return;
    }
    setLocalExcerpt(form.excerpt); // 모달 열 때 현재 excerpt로 초기화
    setOpen(true);
  };

  // 새 파일 선택 시 이전 blob URL 해제
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // 파일 선택 시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };
  const handlePublish = async () => {
    let coverImageUrl: string | undefined;

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadCoverImage(formData, initialCoverImage ?? undefined);
      if (!result.success) {
        toast.error(result.message ?? "이미지 업로드 실패");
        return;
      }
      coverImageUrl = result.url;
    }

    await handleSave(true, coverImageUrl, localExcerpt || undefined);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant={"default"}
        onClick={handleOpenModal}
        disabled={saveStatus === "saving"}
      >
        올리기
      </Button>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "READY TO UPDATE?" : "READY TO TRANSMIT?"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "썸네일을 변경하거나 바로 수정을 완료할 수 있습니다."
              : "썸네일을 등록하거나 바로 발행할 수 있습니다."}
          </DialogDescription>
        </DialogHeader>
        {/* 숨겨진 파일 input */}
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* 썸네일 클릭 영역 */}
        <div
          onClick={() => inputRef.current?.click()}
          className="hover:border-primary cursor-pointer border-2 border-dashed border-neutral-200 p-8 text-center"
        >
          {preview ? (
            <img src={preview} className="w-full object-cover" />
          ) : (
            <p className="text-muted-foreground text-xs">
              클릭해서 썸네일 선택
            </p>
          )}
        </div>
        {/* excerpt 편집 */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs text-zinc-500">EXCERPT</label>
          <textarea
            value={localExcerpt}
            onChange={(e) => setLocalExcerpt(e.target.value)}
            placeholder="비우면 본문 앞 100자 자동 생성"
            rows={3}
            className="w-full resize-none rounded border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-xs text-zinc-700 placeholder:text-zinc-400 focus:border-orange-600 focus:outline-none"
          />
        </div>
        <DialogFooter>
          <Button onClick={handlePublish}>
            {isEditMode ? "수정 완료" : "발행하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
