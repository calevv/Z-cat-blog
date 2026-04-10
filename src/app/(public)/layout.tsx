import Footer from "@/components/public/layout/Footer";
import Navigation from "@/components/public/layout/Navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1"> {children}</main>
      <Footer />
    </div>
  );
}
