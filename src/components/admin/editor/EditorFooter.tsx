import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ExitEditorAlert from "./ExitEditorAlert";
interface EditorFooterProps {
  onSave: (published: boolean) => void;
  status: "saved" | "saving" | "unsaved";
}
export default function EditorFooter({ onSave, status }: EditorFooterProps) {
  return (
    <footer className="flex h-17 items-center justify-between border-t border-neutral-200 bg-white px-8 py-4">
      {/* TODO: 버튼들 기능 추가*/}
      <div>
        <ExitEditorAlert />
      </div>
      <div className="flex gap-3">
        <Button
          variant={"outline"}
          onClick={() => onSave(false)}
          disabled={status === "saving"}
        >
          임시저장
        </Button>
        <Button
          variant={"default"}
          onClick={() => onSave(true)}
          disabled={status === "saving"}
        >
          올리기
        </Button>
      </div>
    </footer>
  );
}
