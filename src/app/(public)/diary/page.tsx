// ───────────────────────────────
// Diary 목록 페이지
// 역할: 전체 포스트 목록 + 태그 사이드바 필터
// TODO:
// 태그 필터링
// 페이지네이션 혹은 스크롤
// 호버 이벤트 변경
// Supabase 연결 후 더미 데이터 교체(완)
// ───────────────────────────────
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

  console.log(posts, error);
  return (
    <div className="bg-background w-full">
      {/* 헤더 영역 */}
      <section className="border-border">
        <div className="mx-auto max-w-7xl border-b px-6 py-16">
          <p className="text-muted-foreground font-mono text-xs">
            [ARCHIVE_INDEX_04]
          </p>
          <h1 className="text-foreground mt-2 text-5xl font-bold">
            The Log Files
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Observations from the cold aisle. Occasionally interrupted by human
            intervention.
          </p>
        </div>
      </section>

      {/* 본문 — 목록 + 사이드바 */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex gap-16">
          {/* 포스트 목록 */}
          <ul className="divide-border flex flex-1 flex-col divide-y">
            {posts?.map((post) => (
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
                        {formatDate(post.published_at)}
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
            ))}
          </ul>

          {/* 사이드바 */}
          <aside className="w-48 shrink-0">
            <div className="sticky top-24">
              <p className="text-foreground font-mono text-xs font-bold">
                TAGS
              </p>
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
        </div>
      </section>
    </div>
  );
}
