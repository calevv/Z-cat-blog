import StateCard from "@/components/admin/dashboard/StateCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex flex-col">
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
      <div className="flex flex-1 flex-col gap-6 p-8">
        <section className="grid grid-cols-3 gap-4">
          <StateCard label="Total Posts" value={5} />
          <StateCard label="Published" value={3} />
          <StateCard label="Drafts" value={2} />
        </section>
        <section>테이블+탭</section>
      </div>
    </div>
  );
}
