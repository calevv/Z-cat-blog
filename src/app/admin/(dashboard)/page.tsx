import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminTable from "@/components/admin/dashboard/AdminTable";
import PublishTabs from "@/components/admin/dashboard/PublishTabs";
import StateCard from "@/components/admin/dashboard/StateCard";
export default function AdminPage() {
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <section className="grid grid-cols-3 gap-4">
          <StateCard label="Total Posts" value={5} />
          <StateCard label="Published" value={3} />
          <StateCard label="Drafts" value={2} />
        </section>
        <section className="flex min-h-96 flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
          <PublishTabs />
          <div className="flex-1">
            <AdminTable />
          </div>
          <div className="flex h-10 items-center justify-between px-6">
            <p className="font-space text-[10px] leading-4 font-normal tracking-wide text-zinc-400 uppercase">
              5 posts found
            </p>
            <p className="font-space text-[10px] leading-4 font-normal tracking-wide text-zinc-400 uppercase">
              All entries logged by Z-cat.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
