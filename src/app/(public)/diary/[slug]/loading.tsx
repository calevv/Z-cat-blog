export default function Loading() {
  return (
    <div className="bg-background w-full">
      {/* 헤더 */}
      <div className="border-border mx-auto max-w-3xl border-b px-4 py-10 md:px-6 md:py-16">
        <div className="bg-muted h-3 w-40 animate-pulse rounded" />
        <div className="bg-muted mt-4 h-8 w-3/4 animate-pulse rounded md:h-10" />
        <div className="bg-muted mt-3 h-4 w-1/2 animate-pulse rounded" />
      </div>

      {/* 본문 */}
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 md:px-6 md:py-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted h-4 animate-pulse rounded"
            style={{ width: `${90 - (i % 3) * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}