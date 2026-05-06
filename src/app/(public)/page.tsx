export const revalidate = 3600;

import HeroSection from "@/components/public/about/HeroSection";
import RecentPosts from "@/components/public/about/RecentPosts";
import WhySection from "@/components/public/about/WhySection";
import ZcatBanner from "@/components/public/about/ZcatBanner";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <ZcatBanner />
      <WhySection />
      <RecentPosts />
    </div>
  );
}
