interface AdminHeaderProps {
  title: string;
  component?: React.ReactNode;
  leftSlot?: React.ReactNode;
}

export default function AdminHeader({ title, component, leftSlot }: AdminHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-8">
      <div className="flex items-center gap-3">
        {leftSlot}
        <div>
          <p className="font-space-grotesk text-xs leading-4 font-normal tracking-wider text-zinc-500 uppercase">
            [ADMIN_CONSOLE]
          </p>
          <h6 className="font-heading text-xl leading-8 font-bold text-zinc-900">
            {title}
          </h6>
        </div>
      </div>
      {component}
    </header>
  );
}
