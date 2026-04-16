import { Button } from "@/components/ui/button";
import ExitEditorAlert from "./ExitEditorAlert";
interface EditorFooterProps {
  onSave: (published: boolean) => void;
  status: "saved" | "saving" | "unsaved";
  postId: string | null;
  isEditMode: boolean;
  published: boolean;
}
export default function EditorFooter({
  onSave,
  isEditMode,
  status,
  postId,
  published,
}: EditorFooterProps) {
  return (
    <footer className="flex h-17 items-center justify-between border-t border-neutral-200 bg-white px-8 py-4">
      {/* TODO: 버튼들 기능 추가*/}
      <div>
        <ExitEditorAlert
          published={published}
          isEditMode={isEditMode}
          postId={postId}
          status={status}
          onSave={onSave}
        />
      </div>
      <div className="flex gap-3">
        {published || (
          <Button
            variant={"outline"}
            onClick={() => onSave(false)}
            disabled={status === "saving"}
          >
            임시저장
          </Button>
        )}
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
