// ───────────────────────────────
// 어드민 로그인 유저 정보 사이드바 하단
// 역할: 로그인 유저 정보 표시
// TODO:
// [ ] Access Level : 00 수정 고려
// ───────────────────────────────

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
        {/* TODO: 일단은 고정값 계정이 늘어나면 수정고려 */}
        <dd className="font-space text-[10px] leading-3 font-normal tracking-wide text-zinc-600">
          Access Level : 00
        </dd>
      </dl>
    </article>
  );
}
