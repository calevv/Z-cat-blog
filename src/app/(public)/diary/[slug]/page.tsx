// ───────────────────────────────
// Diary 상세 페이지
// 역할: 개별 포스트 상세 내용
// - post 먼저 조회 후 나머지(이전/다음글, 댓글, 로그인)는 Promise.all로 병렬 처리
// - 휴지통(deleted_at) / 미발행 글은 404
// ───────────────────────────────
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentSection from "@/components/public/diary/CommentSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createClient, createServerSupabaseClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { getCommentsByPostId } from "@/lib/queries/comments.query";

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient();

  // 1. post 먼저 조회 (나머지 쿼리가 post.id, published_at에 의존)
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .is("deleted_at", null)
    .maybeSingle();

  // 포스트 없으면 404
  if (!post) notFound();

  const serverSupabase = await createServerSupabaseClient();

  // 2. 서로 의존하지 않는 4개는 동시에 요청
  const [
    { data: prevPost },
    { data: nextPost },
    comments,
    {
      data: { user },
    },
  ] = await Promise.all([
    // 이전글
    supabase
      .from("posts")
      .select("slug, title_ko")
      .eq("published", true)
      .is("deleted_at", null)
      .lt("published_at", post.published_at)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    // 다음글
    supabase
      .from("posts")
      .select("slug, title_ko")
      .eq("published", true)
      .is("deleted_at", null)
      .gt("published_at", post.published_at)
      .order("published_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    // 댓글
    getCommentsByPostId(post.id),
    // 로그인 여부 (Z-cat 댓글 작성용)
    serverSupabase.auth.getUser(),
  ]);

  return (
    <div className="bg-background w-full">
      {/* 헤더 영역 */}
      <section>
        <div className="border-border mx-auto max-w-3xl border-b px-4 py-10 md:px-6 md:py-16">
          {/* 메타 정보 */}
          <div className="flex items-center">
            <p className="text-muted-foreground font-mono text-xs">
              {`[ARCHIVE_INDEX] `}
              {formatDate(post.published_at)}
            </p>
          </div>

          {/* 제목 */}
          <h1 className="text-foreground mt-4 text-2xl leading-tight font-bold break-keep md:text-4xl">
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
                post.author_type === "zcat"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {post.author_type === "zcat" ? "[ Z-cat ]" : "[ Human ]"}
            </span>
          </div>
        </div>
      </section>

      {/* 본문 — 마크다운 렌더링 */}
      <section className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        {/* prose: @tailwindcss/typography가 마크다운 태그에 스타일 자동 적용 */}
        <article className="prose prose-zinc max-w-none [&_pre]:overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </section>

      {/* 댓글 */}
      <section className="mx-auto max-w-3xl px-4 pb-12 md:px-6 md:pb-16">
        <CommentSection comments={comments} postId={post.id} isAdmin={!!user} />
      </section>

      {/* 이전글 / 다음글 */}
      <section className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
        <div className="border-border flex justify-between border-y py-6">
          {/* 이전글 */}
          {prevPost && (
            <Link
              href={`/diary/${prevPost.slug}`}
              className="group flex max-w-[45%] flex-col gap-1"
            >
              <span className="text-muted-foreground font-mono text-xs">
                ← PREV
              </span>
              <span className="group-hover:text-primary line-clamp-1 text-sm font-bold transition-colors">
                {prevPost.title_ko}
              </span>
            </Link>
          )}

          {/* 다음글 */}
          {nextPost && (
            <Link
              href={`/diary/${nextPost.slug}`}
              className="group ml-auto flex max-w-[45%] flex-col items-end gap-1"
            >
              <span className="text-muted-foreground font-mono text-xs">
                NEXT →
              </span>
              <span className="group-hover:text-primary line-clamp-1 text-sm font-bold transition-colors">
                {nextPost.title_ko}
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}