// ───────────────────────────────
// Diary 목록 페이지
// 역할: 전체 포스트 목록 + 태그 사이드바 필터
// TODO:
// 태그 필터링
// 페이지네이션 혹은 스크롤
// 호버 이벤트 변경
// Supabase 연결 후 더미 데이터 교체(완)
// ───────────────────────────────
import PageHeader from "@/components/common/PageHeader";
import SectionContainer from "@/components/common/section/SectionContainer";
import { createClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

// 더미 태그 목록 — 나중에 DB에서 동적으로 가져올 것
const ALL_TAGS = ["Next.js", "React", "Supabase", "CSS"];

export default async function DiaryPage() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  console.log("post_error", error);
  return (
    <div className="bg-background w-full">
      {/* 헤더 영역 */}
      <PageHeader
        code="[ARCHIVE_INDEX_01]"
        title={<>The Log Files</>}
        description="Observations from the cold aisle. Occasionally interrupted by human
            intervention."
      />

      {/* 본문 — 목록 + 사이드바 */}
      <SectionContainer className="gap-8">
        {/* 포스트 목록 */}
        <ul className="divide-border flex flex-1 flex-col divide-y">
          {posts?.map((post) => {
            const displayDate =
              post.published_at ?? post.created_at ?? "NO_DATE_ERROR";
            // 날짜가 없으면 생성일(created_at)을 보여주고, 그것도 없으면 에러 메시지
            return (
              <li key={post.id}>
                <Link
                  href={`/diary/${post.slug}`}
                  className="flex gap-6 py-8 transition-opacity hover:opacity-70"
                >
                  {/* 썸네일 */}
                  <div className="bg-muted h-24 w-36 shrink-0" />
                  {/* 텍스트 */}
                  <div className="flex flex-1 flex-col gap-2">
                    {/* 날짜 + 태그 */}
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-mono text-xs">
                        {formatDate(displayDate)}
                      </span>
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-primary font-mono text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 제목 */}
                    <h2 className="text-foreground text-lg leading-snug font-bold">
                      {post.title_ko}
                    </h2>

                    {/* 요약 */}
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>

                    {/* author 배지 */}
                    <div className="mt-auto flex justify-end">
                      <span
                        className={`font-mono text-xs ${
                          post.author_type === "zetcat"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {post.author_type === "zetcat"
                          ? "[ Z-cat ]"
                          : "[ Human ]"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 사이드바 */}
        <aside className="w-48 shrink-0">
          <div className="sticky top-24">
            <p className="text-foreground font-mono text-xs font-bold">TAGS</p>
            {/* TODO: 클릭 시 필터 기능 — 클라이언트 컴포넌트로 분리 예정 */}
            <ul className="mt-4 flex flex-col gap-2">
              {ALL_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-sm transition-colors"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </SectionContainer>
    </div>
  );
}
