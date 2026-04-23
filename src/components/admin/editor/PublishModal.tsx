import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditor } from "./EditorContext";

export default function PublishModal() {
  const { handleSave, saveStatus } = useEditor();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={"default"} disabled={saveStatus === "saving"}>
            올리기
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          dddd
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => handleSave(true)} variant="outline">
                건너뛰기
              </Button>
            </DialogClose>
            <Button type="submit">발행하기</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
