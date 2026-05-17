import DashboardSidebar from "@/components/admin/dashboard/layout/DashboardSidebar";
import { SidebarProvider } from "@/components/admin/dashboard/layout/SidebarContext";
import { createServerSupabaseClient } from "@/lib/supabase";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminName = user?.user_metadata?.display_name ?? "User";

  return (
    <SidebarProvider>
      <main className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar adminName={adminName} />
        <section className="flex-1 overflow-hidden bg-neutral-50">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
