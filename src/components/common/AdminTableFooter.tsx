export default function AdminTableFooter({
  filteredLength,
}: {
  filteredLength: number;
}) {
  return (
    <div className="flex h-10 items-center justify-between px-6">
      <p className="font-space text-[10px] leading-4 font-normal tracking-wide text-zinc-400 uppercase">
        {`${filteredLength} posts found`}
      </p>
      <p className="font-space text-[10px] leading-4 font-normal tracking-wide text-zinc-400 uppercase">
        All entries logged by Z-cat.
      </p>
    </div>
  );
}
