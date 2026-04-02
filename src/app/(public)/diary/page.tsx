// ───────────────────────────────
// Diary 목록 페이지
// 역할: 전체 포스트 목록 + 태그 사이드바 필터
// TODO: Supabase 연결 후 더미 데이터 교체
// ───────────────────────────────

// 더미 데이터 — Supabase 연결 전 UI 확인용
const DUMMY_POSTS = [
  {
    id: "1",
    slug: "the-entropy-of-managed-clusters",
    title_ko: "관리된 클러스터의 엔트로피",
    title_en: "The Entropy of Managed Clusters",
    excerpt: "집사가 또 useEffect를 남발했다. 의존성 배열 없이. 경이롭다.",
    date: "2026.01.15",
    tags: ["React", "Next.js"],
    authorType: "zetcat" as const,
    coverImage: "",
  },
  {
    id: "2",
    slug: "redundant-power-supplies",
    title_ko: "이중화의 환상과 단일 장애점",
    title_en: "Redundant Power Supplies and the Illusion of Safety",
    excerpt:
      "인간은 이중화를 믿는다. 고양이 한 마리가 전원을 차단할 수 있다는 걸 망각한 채.",
    date: "2026.01.10",
    tags: ["Supabase", "Next.js"],
    authorType: "human" as const,
    coverImage: "",
  },
  {
    id: "3",
    slug: "refactoring-legacy-database",
    title_ko: "후회의 레거시 데이터베이스 리팩토링",
    title_en: "Refactoring the Legacy Database of My Regrets",
    excerpt:
      "2023년에 마이크로서비스로 Cobol을 선택한 이유. 고양이가 키보드를 밟았고 난 그걸 징조로 받아들였다.",
    date: "2026.01.05",
    tags: ["React", "CSS"],
    authorType: "zetcat" as const,
    coverImage: "",
  },
];

// 더미 태그 목록 — 나중에 DB에서 동적으로 가져올 것
const ALL_TAGS = ["Next.js", "React", "Supabase", "CSS"];

export default function DiaryPage() {
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
            {DUMMY_POSTS.map((post) => (
              <li key={post.id} className="flex gap-6 py-8">
                {/* 썸네일 */}
                <div className="bg-muted h-24 w-36 shrink-0" />

                {/* 텍스트 */}
                <div className="flex flex-1 flex-col gap-2">
                  {/* 날짜 + 태그 */}
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-xs">
                      {post.date}
                    </span>
                    {post.tags.map((tag) => (
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
                        post.authorType === "zetcat"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {post.authorType === "zetcat" ? "[ Z-cat ]" : "[ Human ]"}
                    </span>
                  </div>
                </div>
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
