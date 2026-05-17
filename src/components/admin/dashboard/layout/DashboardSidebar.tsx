"use client";

import { signOut } from "@/lib/actions/auth.action";
import AvatarGroup from "@/components/admin/dashboard/layout/AvatarGroup";
import DashboardNav from "@/components/admin/dashboard/layout/DashboardNav";
import { useSidebar } from "@/components/admin/dashboard/layout/SidebarContext";
import { Button } from "@/components/ui/button";
import { House, SquareArrowRightExit, X } from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar({ adminName }: { adminName: string }) {
  const { open, close } = useSidebar();

  return (
    <>
      {/* 오버레이 — 모바일에서 사이드바 열렸을 때만 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-60 flex-col justify-between bg-zinc-900 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex min-h-24 items-start justify-between p-6">
          <div>
            <h1 className="text-lg leading-7 font-bold text-white">Z-cat.</h1>
            <p className="font-space-grotesk text-xs leading-3 font-normal tracking-wider text-zinc-600 uppercase">
              Admin Console
            </p>
          </div>
          {/* 모바일 닫기 버튼 */}
          <button
            onClick={close}
            className="p-1 text-zinc-500 transition-colors hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </header>
        <DashboardNav onNavigate={close} />
        <footer className="flex min-h-24 flex-col gap-3 px-6 py-5">
          <AvatarGroup user={adminName} />
          <Button
            asChild
            variant={"ghost"}
            className="w-full cursor-pointer justify-start text-[10px] leading-4 font-normal tracking-wide text-zinc-600 uppercase"
          >
            <Link href={"/"}>
              <House />
              Go to Site
            </Link>
          </Button>
          <form action={signOut}>
            <Button
              variant={"ghost"}
              className="w-full cursor-pointer justify-start text-[10px] leading-4 font-normal tracking-wide text-zinc-600 uppercase"
            >
              <SquareArrowRightExit />
              Logout
            </Button>
          </form>
        </footer>
      </aside>
    </>
  );
}
