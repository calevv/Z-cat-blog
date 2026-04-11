export default function StateCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <article className="flex flex-col gap-2 rounded-[10px] border border-neutral-200 bg-white px-6 py-5">
      <span className="font-space text-xs leading-4 font-normal tracking-wider text-zinc-500 uppercase">
        {label}
      </span>
      <p className={`text-3xl leading-12 font-bold text-zinc-900`}>{value}</p>
    </article>
  );
}
