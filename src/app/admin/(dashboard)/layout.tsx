import { signOut } from "@/actions/auth";
import AvatarGroup from "@/components/admin/dashboard/layout/AvatarGroup";
import DashboardNav from "@/components/admin/dashboard/layout/DashboardNav";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabase";
import { SquareArrowRightExit } from "lucide-react";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminName = user?.user_metadata?.display_name ?? "User";

  return (
    <main className="flex min-h-screen w-full">
      <aside className="flex w-60 flex-col justify-between bg-zinc-900">
        <header className="text-background min-h-24 p-6">
          <h1 className="text-lg leading-7 font-bold text-white">Z-cat.</h1>
          <p className="font-space-grotesk text-xs leading-3 font-normal tracking-wider text-zinc-600 uppercase">
            Admin Console
          </p>
        </header>
        <DashboardNav />
        <footer className="flex min-h-24 flex-col gap-3 px-6 py-5">
          <AvatarGroup user={adminName} />
          <form action={signOut}>
            <Button
              variant={"ghost"}
              type="submit"
              className="w-full cursor-pointer justify-start text-[10px] leading-4 font-normal tracking-wide text-zinc-600 uppercase"
            >
              <SquareArrowRightExit />
              Logout
            </Button>
          </form>
        </footer>
      </aside>
      <section className="flex-1 bg-neutral-50">{children}</section>
    </main>
  );
}
