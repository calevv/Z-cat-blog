// ───────────────────────────────
// Diary 상세 페이지
// 역할: 개별 포스트 상세 내용
// TODO: Supabase 연결 후 더미 데이터 교체
// ───────────────────────────────
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 더미 데이터 — Supabase 연결 전 UI 확인용
const DUMMY_POST = {
  id: "1",
  slug: "the-entropy-of-managed-clusters",
  title_ko: "관리된 클러스터의 엔트로피",
  title_en: "The Entropy of Managed Clusters",
  excerpt: "집사가 또 useEffect를 남발했다. 의존성 배열 없이. 경이롭다.",
  date: "2026.01.15",
  tags: ["React", "Next.js"],
  authorType: "zetcat" as const,
  coverImage: "",
  content: `# 관리된 클러스터의 엔트로피
  
집사가 또 useEffect를 남발했다. 의존성 배열 없이.

## 문제 상황

\`\`\`js
useEffect(() => {
  fetchData();
}); // 의존성 배열이 없다
\`\`\`

매 렌더링마다 fetchData가 실행된다. 경이롭다.

## 해결

\`\`\`js
useEffect(() => {
  fetchData();
}, []); // 마운트 시 한 번만 실행
\`\`\`
  `,
};

// 더미 이전글/다음글 — Supabase 연결 후 교체
const DUMMY_PREV = {
  slug: "redundant-power-supplies",
  title_ko: "이중화의 환상과 단일 장애점",
};
const DUMMY_NEXT = {
  slug: "refactoring-legacy-database",
  title_ko: "후회의 레거시 데이터베이스 리팩토링",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-background w-full">
      {/* 헤더 영역 */}
      <section>
        <div className="border-border mx-auto max-w-3xl border-b px-6 py-16">
          {/* 메타 정보 */}
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground font-mono text-xs">
              {`[ARCHIVE_INDEX_${DUMMY_POST.id}]`}
            </p>
            <p className="text-muted-foreground font-mono text-xs">
              {DUMMY_POST.date}
            </p>
            {DUMMY_POST.tags.map((tag) => (
              <span key={tag} className="text-primary font-mono text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h1 className="text-foreground mt-4 text-4xl font-bold">
            {DUMMY_POST.title_ko}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {DUMMY_POST.title_en}
          </p>

          {/* author */}
          <div className="mt-6 flex justify-end">
            <span
              className={`font-mono text-xs ${
                DUMMY_POST.authorType === "zetcat"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {DUMMY_POST.authorType === "zetcat" ? "[ Z-cat ]" : "[ Human ]"}
            </span>
          </div>
        </div>
      </section>
      {/* 본문 — 마크다운 렌더링 */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        {/* prose: @tailwindcss/typography가 마크다운 태그에 스타일 자동 적용 */}
        <article className="prose prose-zinc max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {DUMMY_POST.content}
          </ReactMarkdown>
        </article>
      </section>{" "}
      {/* 댓글 */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="text-foreground font-mono text-xs font-bold">COMMENTS</p>
        {/* TODO: Supabase 연결 후 댓글 목록 렌더링 */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="관찰 소감을 남겨라, 인간."
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary flex-1 border px-4 py-2 font-mono text-sm transition-colors focus:outline-none"
          />
          <button className="bg-primary px-4 py-2 font-mono text-xs text-white transition-opacity hover:opacity-80">
            SEND
          </button>
        </div>
      </section>
      {/* 이전글 / 다음글 */}
      <section className="mx-auto max-w-3xl px-6 py-8">
        <div className="border-border flex justify-between border-y py-6">
          {/* 이전글 */}
          <a
            href={`/diary/${DUMMY_PREV.slug}`}
            className="group flex flex-col gap-1"
          >
            <span className="text-muted-foreground font-mono text-xs">
              ← PREV
            </span>
            <span className="group-hover:text-primary text-sm font-bold transition-colors">
              {DUMMY_PREV.title_ko}
            </span>
          </a>

          {/* 다음글 */}
          <a
            href={`/diary/${DUMMY_NEXT.slug}`}
            className="group flex flex-col items-end gap-1"
          >
            <span className="text-muted-foreground font-mono text-xs">
              NEXT →
            </span>
            <span className="group-hover:text-primary text-sm font-bold transition-colors">
              {DUMMY_NEXT.title_ko}
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
