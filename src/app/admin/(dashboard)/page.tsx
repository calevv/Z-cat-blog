import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminTable from "@/components/admin/dashboard/AdminTable";
import PublishTabs from "@/components/admin/dashboard/PublishTabs";
import StateCard from "@/components/admin/dashboard/StateCard";
import { createServerSupabaseClient } from "@/lib/supabase";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = await createServerSupabaseClient();

  // 포스트 호출
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // 카운트 계산
  const total = posts?.length ?? 0;
  const published = posts?.filter((p) => p.published).length ?? 0;
  const drafts = total - published;

  // 탭 필터링
  const status = searchParams.status ?? "all";
  const filtered = posts?.filter((post) => {
    if (status === "published") return post.published;
    if (status === "draft") return !post.published;
    return true;
  });

  return (
    <div className="flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <section className="grid grid-cols-3 gap-4">
          <StateCard label="Total Posts" value={total} />
          <StateCard label="Published" value={published} />
          <StateCard label="Drafts" value={drafts} />
        </section>
        <section className="flex min-h-96 flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
          <PublishTabs />
          <div className="flex-1">
            <AdminTable posts={filtered ?? []} />
          </div>
          <div className="flex h-10 items-center justify-between px-6">
            <p className="font-space text-[10px] leading-4 font-normal tracking-wide text-zinc-400 uppercase">
              {`${total} posts found`}
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
