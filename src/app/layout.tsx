import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z-cat | A Cat's Dev Log",
  description:
    "고양이 Z-cat이 운영하는 프론트엔드 블로그. 집사(개발자)의 코드와 일상을 냉정하게 관찰 중.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        geistMono.variable,
        notoSans.variable,
        interHeading.variable
      )}
    >
      <body className={cn("min-h-screen font-sans antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
