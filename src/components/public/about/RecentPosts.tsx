import { Button } from "@/components/ui/button";
import { CardItem } from "./CardItem";
import { getRecentPosts } from "@/lib/queries/posts.query";
import Link from "next/link";

export default async function RecentPosts() {
  const posts = await getRecentPosts();
  return (
    <section className="bg-background w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex justify-between">
          <h2>LAST DIARIES</h2>
          <Button variant={"link"} asChild>
            <Link href={"/diary"}>VIEW ALL ARCHIVE →</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {posts.map((post) => {
            return (
              <Link
                href={`/diary/${post.slug}`}
                key={post.id}
                className="h-full"
              >
                <CardItem {...post} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
