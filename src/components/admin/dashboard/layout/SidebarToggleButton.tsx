"use client";

import { useSidebar } from "./SidebarContext";
import { Menu } from "lucide-react";

export default function SidebarToggleButton() {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className="-ml-1 p-1.5 text-zinc-500 transition-colors hover:text-zinc-900 lg:hidden"
    >
      <Menu size={20} />
    </button>
  );
}
