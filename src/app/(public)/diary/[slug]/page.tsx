// ───────────────────────────────
// Diary 상세 페이지
// 역할: 개별 포스트 상세 내용
// TODO:
// Supabase 연결 후 더미 데이터 교체(완)
// 상세페이지 인덱스와 날짜 수정예정
// .maybeSingle() 변경
// ───────────────────────────────
import CommentSection from "@/components/diary/CommentSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient();

  // slug로 해당 포스트 조회
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // 포스트 없으면 404
  if (!post || error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-muted-foreground font-mono text-xs">[ERROR_404]</p>
        <h1 className="mt-4 text-4xl font-bold">
          존재하지 않는 관찰 기록이다.
        </h1>
      </div>
    );
  }

  // 이전글 / 다음글 조회
  const { data: prevPost } = await supabase
    .from("posts")
    .select("slug, title_ko")
    .eq("published", true)
    .lt("published_at", post.published_at)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  const { data: nextPost } = await supabase
    .from("posts")
    .select("slug, title_ko")
    .eq("published", true)
    .gt("published_at", post.published_at)
    .order("published_at", { ascending: true })
    .limit(1)
    .single();

  return (
    <div className="bg-background w-full">
      {/* 헤더 영역 */}
      <section>
        <div className="border-border mx-auto max-w-3xl border-b px-6 py-16">
          {/* 메타 정보 */}
          <div className="flex items-center">
            <p className="text-muted-foreground font-mono text-xs">
              {`[ARCHIVE_INDEX]`}
              {formatDate(post.published_at)}
            </p>
          </div>

          {/* 제목 */}
          <h1 className="text-foreground mt-4 text-4xl font-bold">
            {post.title_ko}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">{post.title_en}</p>

          {/* author */}
          <div className="mt-6 flex justify-between">
            <p className="flex gap-1">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-primary font-mono text-xs">
                  #{tag}
                </span>
              ))}
            </p>
            <span
              className={`font-mono text-xs ${
                post.author_type === "zetcat"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {post.author_type === "zetcat" ? "[ Z-cat ]" : "[ Human ]"}
            </span>
          </div>
        </div>
      </section>
      {/* 본문 — 마크다운 렌더링 */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        {/* prose: @tailwindcss/typography가 마크다운 태그에 스타일 자동 적용 */}
        <article className="prose prose-zinc max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </section>{" "}
      {/* 댓글 */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <CommentSection />
      </section>
      {/* 이전글 / 다음글 */}
      <section className="mx-auto max-w-3xl px-6 py-8">
        <div className="border-border flex justify-between border-y py-6">
          {/* 이전글 */}
          {prevPost && (
            <a
              href={`/diary/${prevPost.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-muted-foreground font-mono text-xs">
                ← PREV
              </span>
              <span className="group-hover:text-primary text-sm font-bold transition-colors">
                {prevPost.title_ko}
              </span>
            </a>
          )}

          {/* 다음글 */}
          {nextPost && (
            <a
              href={`/diary/${nextPost.slug}`}
              className="group flex flex-col items-end gap-1"
            >
              <span className="text-muted-foreground font-mono text-xs">
                NEXT →
              </span>
              <span className="group-hover:text-primary text-sm font-bold transition-colors">
                {nextPost.title_ko}
              </span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
