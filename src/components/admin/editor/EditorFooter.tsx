import { Button } from "@/components/ui/button";
import ExitEditorAlert from "./ExitEditorAlert";
import { useEditor } from "./EditorContext";

export default function EditorFooter() {
  const { form, handleSave, saveStatus } = useEditor();

  return (
    <footer className="flex h-17 items-center justify-between border-t border-neutral-200 bg-white px-8 py-4">
      <div>
        <ExitEditorAlert />
      </div>
      <div className="flex gap-3">
        {form.published || (
          <Button
            variant={"outline"}
            onClick={() => handleSave(false)}
            disabled={saveStatus === "saving"}
          >
            임시저장
          </Button>
        )}
        <Button
          variant={"default"}
          onClick={() => handleSave(true)}
          disabled={saveStatus === "saving"}
        >
          올리기
        </Button>
      </div>
    </footer>
  );
}
