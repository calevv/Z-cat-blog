import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { SquareArrowRightExit } from "lucide-react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full">
      <aside className="flex w-60 flex-col justify-between bg-zinc-900">
        <header className="text-background min-h-24 p-6">
          <h1 className="text-lg leading-7 font-bold text-white">Z-cat.</h1>
          <p className="font-space-grotesk text-xs leading-3 font-normal tracking-wider text-zinc-600 uppercase">
            Admin Console
          </p>
        </header>
        <nav className="flex-1 px-3 py-4">
          <ul className="text-white">
            <li>게시물 관리</li>
          </ul>
        </nav>
        <footer className="flex min-h-24 flex-col gap-3 px-6 pt-5">
          <article className="text-white">login user</article>
          <form action={signOut}>
            <Button
              variant={"ghost"}
              type="submit"
              className="cursor-pointer text-[10px] leading-4 font-normal tracking-wide text-zinc-600 uppercase"
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
