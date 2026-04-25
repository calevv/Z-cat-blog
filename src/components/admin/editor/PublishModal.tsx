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
import { useRef, useState } from "react";
import { toast } from "sonner";
import { uploadCoverImage } from "@/lib/actions/posts.action";

export default function PublishModal() {
  const { form, handleSave, saveStatus, initialCoverImage } = useEditor();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialCoverImage ?? null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => {
    // 여기서 먼저 체크
    if (!form.title_ko.trim()) {
      toast.error("제목을 입력해라, 인간.");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("slug가 없다. 번역을 기다려라.");
      return;
    }
    setOpen(true);
  };

  // 파일 선택 시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // 미리보기 URL 생성
  };
  const handlePublish = async () => {
    let coverImageUrl: string | undefined;

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadCoverImage(formData);
      if (!result.success) {
        toast.error(result.message ?? "이미지 업로드 실패");
        return;
      }
      coverImageUrl = result.url;
    }

    await handleSave(true, coverImageUrl);
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
          <DialogTitle>READY TO TRANSMIT?</DialogTitle>
          <DialogDescription>
            썸네일을 등록하거나 건너뛰고 바로 발행할 수 있습니다.
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
        {/* 클릭 영역 */}
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
        <DialogFooter>
          <Button
            onClick={async () => {
              await handleSave(true);
              setOpen(false);
            }}
            variant="outline"
          >
            건너뛰기
          </Button>
          <Button onClick={handlePublish}>발행하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
