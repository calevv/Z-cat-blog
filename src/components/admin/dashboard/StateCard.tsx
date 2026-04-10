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
    <article className="inline-flex flex-col gap-2 rounded-[10px] bg-white px-6 py-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
      <span className="font-space text-xs leading-4 font-normal tracking-wider text-zinc-500 uppercase">
        {label}
      </span>
      <p className={`text-3xl leading-12 font-bold text-zinc-900`}>{value}</p>
    </article>
  );
}
