// ───────────────────────────────
// AdminPage
// 역할: 포스트 목록 관리 + 통계 카드
// TODO:
// [ ] 검색 기능 연결 (searchParams.q)
// [ ] lib/posts.ts 분리 (getAllPosts)
// [ ] Suspense fallback 스켈레톤 UI 고려
// [ ] force-dynamic → 최적화 방식 전환 고려
// ───────────────────────────────

export const dynamic = "force-dynamic";
// force-dynamic: searchParams 사용으로 매 요청마다 서버에서 새로 실행
// 탭 필터링이 정상 작동하려면 필요

import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminTable from "@/components/admin/dashboard/AdminTable";
import PublishTabs from "@/components/admin/dashboard/PublishTabs";
import StateCard from "@/components/admin/dashboard/StateCard";
import { createServerSupabaseClient } from "@/lib/supabase";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AdminTableFooter from "@/components/common/AdminTableFooter";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string; query?: string };
}) {
  const { status: statusParam, query: searchQuery } = await searchParams;
  const status = statusParam ?? "all";
  const query = searchQuery?.toLowerCase() ?? "";

  const supabase = await createServerSupabaseClient();

  // 포스트 호출
  // TODO: lib/posts.ts 분리 예정 (getAllPosts)
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  // 카운트 계산
  const total = posts?.length ?? 0;
  const published = posts?.filter((p) => p.published).length ?? 0;
  const drafts = total - published;

  // 탭 + 검색어 필터링 병합
  const filtered = posts?.filter((post) => {
    // 1. 상태 필터링
    const matchesStatus =
      status === "all"
        ? true
        : status === "published"
          ? post.published
          : !post.published;

    // 2. 검색어 필터링 (제목에서 검색)
    const matchesQuery =
      post.title_ko.toLowerCase().includes(query) ||
      (post.title_en ?? "").toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title={`게시물 관리`}
        component={
          <Button
            asChild
            className="h-9 w-32 rounded bg-zinc-900 text-xs leading-4 font-bold tracking-wider text-white uppercase"
          >
            <Link href="/admin/editor">
              <PlusIcon className="h-2.5 w-2.5 text-white" />
              New Post
            </Link>
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-6 overflow-hidden p-8">
        <section className="grid grid-cols-3 gap-4">
          <StateCard label="Total Posts" value={total} />
          <StateCard label="Published" value={published} />
          <StateCard label="Drafts" value={drafts} />
        </section>
        <section className="flex flex-1 flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
          {/* Suspense: useSearchParams() 사용하는 클라이언트 컴포넌트는
              서버 렌더링 시 URL 정보가 없을 수 있어서 Suspense 필요
              fallback={null} → 로딩 중 아무것도 안 보임
              TODO: 스켈레톤 UI 추가 고려 */}
          <Suspense fallback={null}>
            <PublishTabs />
          </Suspense>
          <div className="flex-1 overflow-hidden">
            <AdminTable posts={filtered ?? []} />
          </div>
          <AdminTableFooter filteredLength={filtered?.length ?? 0} />
        </section>
      </div>
    </div>
  );
}
