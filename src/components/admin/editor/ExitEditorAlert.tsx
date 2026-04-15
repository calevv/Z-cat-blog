"use client";

import { deleteDraft } from "@/actions/posts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExitAlertProp {
  postId: string | null;

  status: "saved" | "saving" | "unsaved";
  onSave: (published: boolean) => void;
}

export default function ExitEditorAlert({
  postId,
  status,
  onSave,
}: ExitAlertProp) {
  const router = useRouter();
  const handleExit = () => router.push("/admin");

  // 1. postId가 없으면: 다이얼로그 없이 바로 버튼 반환
  if (!postId) {
    return (
      <Button variant="ghost" onClick={handleExit}>
        <ArrowLeft /> 나가기
      </Button>
    );
  }

  // 2. postId가 있으면: 다이얼로그 로직 실행
  const handleDeleteAndExit = async () => {
    if (postId) {
      const res = await deleteDraft(postId);

      if (res.success) {
        router.push("/admin");
      } else {
        alert("삭제 실패");
      }
    } else {
      router.push("/admin");
    }
  };
  const handleDraftAndExit = () => {
    onSave(false);
    router.push("/admin");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <ArrowLeft /> 나가기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader className="relative">
          <AlertDialogCancel
            className="absolute top-0 right-0"
            variant={"ghost"}
          >
            <XIcon />
          </AlertDialogCancel>
          <AlertDialogMedia className="mt-4">
            <AlertTriangle />
          </AlertDialogMedia>
          <AlertDialogTitle>작성 중인 내용이 있습니다!</AlertDialogTitle>
          <AlertDialogDescription>
            작성 중인 내용이 저장되지 않았습니다.
            <br />
            지금 나가면 입력한 내용이 사라질 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant={"outline"} onClick={handleDeleteAndExit}>
            나가기
          </AlertDialogAction>
          <AlertDialogAction
            onClick={handleDraftAndExit}
            disabled={status === "saving"}
          >
            임시 저장
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
