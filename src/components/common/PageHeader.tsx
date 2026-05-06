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
    <header className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
      <div className="flex flex-col gap-3">
        <p className="font-space text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
          {code}
        </p>
        <h1 className="font-heading text-3xl font-bold text-zinc-900 md:text-5xl">
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
