// ───────────────────────────────
// Diary 목록 페이지
// 역할: 전체 포스트 목록 + 태그 사이드바 필터 (searchParams 기반)
// TODO:
// 페이지네이션 혹은 무한스크롤
// ───────────────────────────────
import PageHeader from "@/components/common/PageHeader";
import SectionContainer from "@/components/common/section/SectionContainer";
import { getAllPosts } from "@/lib/queries/posts.query";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

export default async function DiaryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getAllPosts();

  // 태그 알파벳 정렬 + etc는 마지막
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => {
    if (a === "etc") return 1;
    if (b === "etc") return -1;
    return a.localeCompare(b);
  });

  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

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
        {filtered.length === 0 ? (
          <p className="text-muted-foreground flex-1 py-16 text-center font-mono text-sm">
            [NO_RECORDS_FOUND]
          </p>
        ) : (
          <ul className="divide-border flex flex-1 flex-col divide-y">
            {filtered.map((post) => {
              // 발행일 없으면 생성일로 대체
              const displayDate = post.published_at ?? post.created_at;

              return (
                <li key={post.id}>
                  <Link
                    href={`/diary/${post.slug}`}
                    className="group flex gap-4 py-4 transition-opacity hover:opacity-70 md:gap-8"
                  >
                    {/* 텍스트 */}
                    <div className="flex flex-1 flex-col gap-2">
                      {/* 날짜 + 태그 */}
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground font-mono text-xs">
                          {formatDate(displayDate)}
                        </span>
                        {post.tags.map((t: string) => (
                          <span
                            key={t}
                            className="text-primary font-mono text-xs"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* 제목 */}
                      <h2 className="text-foreground text-lg leading-snug font-bold">
                        {post.title_ko}
                      </h2>

                      {/* 요약 */}
                      <p className="text-muted-foreground line-clamp-2 text-sm break-keep">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="hidden shrink-0 md:block">
                      {/* 썸네일 */}
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title_ko}
                          className="aspect-video w-36 object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="aspect-video w-36 bg-white" />
                      )}

                      {/* author 배지 */}
                      <div className="mt-3 flex justify-end">
                        <span
                          className={`font-mono text-xs ${
                            post.author_type === "zcat"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {post.author_type === "zcat"
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
        )}

        {/* 사이드바 */}
        <aside className="hidden md:block md:w-48 md:shrink-0">
          <div className="sticky top-24">
            <p className="text-foreground font-mono text-xs font-bold">TAGS</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link
                  href="/diary"
                  className={`font-mono text-sm transition-colors ${
                    !tag
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ALL POST
                </Link>
              </li>
              <li className="my-1 border-t border-neutral-200" />
              {allTags.map((t) => (
                <Fragment key={t}>
                  {/* etc 앞 구분선 */}
                  {t === "etc" && (
                    <li className="my-1 border-t border-neutral-200" />
                  )}
                  <li>
                    <Link
                      href={t === tag ? "/diary" : `/diary?tag=${t}`}
                      prefetch={false} // 태그별 서버 호출 방지 (선택사항)
                      className={`font-mono text-sm transition-colors ${
                        t === tag
                          ? "text-primary font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      #{t}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </aside>
      </SectionContainer>
    </div>
  );
}