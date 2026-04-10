"use client";

import {
  FileText,
  MessageSquare,
  Tag,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();

  const ADMIN_MENU = [
    {
      title: "게시물 관리",
      icon: FileText,
      href: "/admin",
      isReady: true,
    },
    {
      title: "댓글 관리",
      icon: MessageSquare,
      href: "/admin/comments",
      isReady: false,
    },
    {
      title: "태그 관리",
      icon: Tag,
      href: "/admin/tags",
      isReady: false,
    },
    {
      title: "통계",
      icon: BarChart3,
      href: "/admin/stats",
      isReady: false,
    },
    {
      title: "설정",
      icon: Settings,
      href: "/admin/settings",
      isReady: false,
    },
  ];
  return (
    <nav className="flex-1 px-3 py-4">
      <ul className="flex flex-col gap-1">
        {ADMIN_MENU.map((menu) => {
          const isActive = menu.href === pathname;

          return (
            <li key={menu.title}>
              {menu.isReady ? (
                <Link
                  href={menu.href}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-zinc-500 hover:bg-zinc-800/50"
                  } `}
                >
                  <div className="flex items-center gap-3">
                    <menu.icon size={20} />
                    <span className="text-sm font-medium">{menu.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-zinc-500 opacity-80 transition-colors">
                  <div className="flex items-center gap-3">
                    <menu.icon size={20} />
                    <span className="text-sm font-medium">{menu.title}</span>
                  </div>

                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold tracking-tighter text-zinc-600">
                    SOON
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
