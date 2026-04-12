interface PageHeaderProps {
  code: string;
  title: React.ReactNode;
  description?: string;
  rightContent?: React.ReactNode;
}

export default function PageHeader({
  code,
  title,
  description,
  rightContent,
}: PageHeaderProps) {
  return (
    <header className="mx-auto flex max-w-7xl items-end justify-between px-8 py-16">
      <div className="flex flex-col gap-3">
        <p className="font-space text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
          {code}
        </p>
        <h1 className="font-heading text-5xl font-bold text-zinc-900">
          {title}
        </h1>
        <p className="font-serif text-base leading-7 font-normal text-zinc-500">
          {description}
        </p>
      </div>

      {rightContent && (
        <div className="font-serif text-base leading-7 font-normal text-zinc-500">
          {rightContent}
        </div>
      )}
    </header>
  );
}
