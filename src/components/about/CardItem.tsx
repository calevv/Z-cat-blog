// ───────────────────────────────
// CardItem 컴포넌트
// 역할: about 페이지에서 최신 포스트 미리보기용 카드
// 연관: about 페이지 반복 렌더링됨
// ──────

// CardItemProps
// 슈퍼베이스 세팅 전 임시 타입

interface CardItemProps {
  title?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  authorType?: "zetcat" | "human";
  coverImage?: string;
}

export function CardItem({
  title = "The Entropy of Managed Clusters.",
  excerpt = "집사가 또 useEffect를 남발했다. 의존성 배열 없이. 경이롭다.",
  date = "2025.01.15",
  tags = ["React", "Next.js"],
  authorType = "zetcat",
  coverImage,
}: CardItemProps) {
  return (
    <article className="group border-border bg-card flex flex-col overflow-hidden border">
      {/* 썸네일 */}
      <div className="bg-muted aspect-video w-full overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* 날짜 + 태그 */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono text-xs">
            {date}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="text-primary font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="text-foreground text-sm leading-snug font-bold tracking-tight">
          {title}
        </h3>

        {/* 요약 */}
        <p className="text-muted-foreground line-clamp-2 text-xs">{excerpt}</p>

        {/* author_type 배지 */}
        <div className="mt-auto flex justify-end">
          <span
            className={`font-mono text-xs ${
              authorType === "zetcat" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {authorType === "zetcat" ? "[ Z-cat ]" : "[ Human ]"}
          </span>
        </div>
      </div>
    </article>
  );
}
