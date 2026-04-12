export default function AvatarGroup({ user }: { user: string }) {
  return (
    <article className="flex gap-3">
      <div className="font-heading bg-primary flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white">
        {user.charAt(0).toUpperCase()}
      </div>
      <dl>
        <dt className="font-heading text-xs leading-4 font-bold text-white">
          {user}
        </dt>
        <dd className="font-space text-[10px] leading-3 font-normal tracking-wide text-zinc-600">
          Access Level : 00
        </dd>
      </dl>
    </article>
  );
}
