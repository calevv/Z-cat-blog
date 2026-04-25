// ───────────────────────────────
// CardItem 컴포넌트
// 역할: about 페이지에서 최신 포스트 미리보기용 카드
// 연관: about 페이지 반복 렌더링됨
// ──────

import { formatDate } from "@/lib/utils";

// CardItemProps
// 슈퍼베이스 세팅 전 임시 타입

interface CardItemProps {
  title_ko?: string;
  excerpt?: string;
  created_at?: string;
  tags?: string[];
  author_type?: "zcat" | "human";
  cover_image?: string;
}

export function CardItem({
  title_ko,
  excerpt,
  created_at,
  tags,
  author_type,
  cover_image,
}: CardItemProps) {
  return (
    <article className="group border-border bg-card flex flex-col overflow-hidden rounded-2xl border">
      {/* 썸네일 */}
      <div className="bg-muted aspect-video w-full overflow-hidden">
        {cover_image ? (
          <img
            src={cover_image}
            alt={title_ko}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* 날짜 + 태그 */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono text-xs">
            {created_at ? formatDate(created_at) : "No Date"}
          </span>
          {tags?.map((tag) => (
            <span key={tag} className="text-primary font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="text-foreground text-sm leading-snug font-bold tracking-tight">
          {title_ko}
        </h3>

        {/* 요약 */}
        <p className="text-muted-foreground line-clamp-1 text-xs">{excerpt}</p>

        {/* author_type 배지 */}
        <div className="mt-auto flex justify-end">
          <span
            className={`font-mono text-xs ${
              author_type === "zcat" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {author_type === "zcat" ? "[ Z-cat ]" : "[ Human ]"}
          </span>
        </div>
      </div>
    </article>
  );
}
