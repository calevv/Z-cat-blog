import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navigation />
      <main className="flex-1"> {children}</main>
      <Footer />
    </div>
  );
}
