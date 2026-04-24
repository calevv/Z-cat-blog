import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import TrashTable from "@/components/admin/trash/TrashTable";
import { createServerSupabaseClient } from "@/lib/supabase";

export default async function TrashPage() {
  const supabase = await createServerSupabaseClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false });
  return (
    <div className="flex flex-col">
      <AdminHeader title={`삭제 보관함`} />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <section className="flex h-full flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
          <TrashTable posts={posts ?? []} />
        </section>
      </div>
    </div>
  );
}
