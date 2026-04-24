import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import TrashTable from "@/components/admin/trash/TrashTable";
import SearchInput from "@/components/common/SearchInput";
import { createServerSupabaseClient } from "@/lib/supabase";
import { Suspense } from "react";

export default async function TrashPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const { query: searchQuery } = await searchParams;
  const query = searchQuery?.toLowerCase() ?? "";
  const supabase = await createServerSupabaseClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false });

  const filtered = posts?.filter(
    (post) =>
      post.title_ko.toLowerCase().includes(query) ||
      (post.title_en ?? "").toLowerCase().includes(query)
  );

  return (
    <div className="flex flex-col">
      <AdminHeader title={`삭제 보관함`} />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <section className="flex h-full flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
          <div className="flex justify-between px-6 py-4">
            <div></div>
            <Suspense fallback={null}>
              <SearchInput basePath="/admin/trash" />
            </Suspense>
          </div>
          <TrashTable posts={filtered ?? []} />
        </section>
      </div>
    </div>
  );
}
