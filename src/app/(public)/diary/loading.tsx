import PageHeader from "@/components/common/PageHeader";
import SectionContainer from "@/components/common/section/SectionContainer";

export default function Loading() {
  return (
    <div className="bg-background w-full">
      <PageHeader
        code="[ARCHIVE_INDEX_01]"
        title={<>The Log Files</>}
        description="Observations from the cold aisle. Occasionally interrupted by human
            intervention."
      />

      <SectionContainer className="gap-8">
        <ul className="divide-border flex flex-1 flex-col divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex gap-4 py-4 md:gap-8">
              <div className="flex flex-1 flex-col gap-3">
                <div className="bg-muted h-3 w-32 animate-pulse rounded" />
                <div className="bg-muted h-5 w-3/4 animate-pulse rounded" />
                <div className="bg-muted h-4 w-full animate-pulse rounded" />
              </div>
              <div className="bg-muted hidden aspect-video w-36 animate-pulse md:block" />
            </li>
          ))}
        </ul>

        <aside className="hidden md:block md:w-48 md:shrink-0" />
      </SectionContainer>
    </div>
  );
}