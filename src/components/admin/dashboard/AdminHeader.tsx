import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-neutral-200 bg-white px-8">
      <div>
        <p className="font-space-grotesk text-xs leading-4 font-normal tracking-wider text-zinc-500 uppercase">
          [ADMIN_CONSOLE]
        </p>
        <h6 className="font-heading text-xl leading-8 font-bold text-zinc-900">
          게시물 관리
        </h6>
      </div>
      <Button className="h-9 w-32 rounded bg-zinc-900 text-xs leading-4 font-bold tracking-wider text-white uppercase">
        <PlusIcon /> New Post
      </Button>
    </header>
  );
}
