import { Button } from "@/components/ui/button";
import { CardItem } from "./CardItem";
import { getRecentPosts } from "@/lib/queries/posts.query";
import Link from "next/link";

export default async function RecentPosts() {
  const posts = await getRecentPosts();
  return (
    <section className="bg-background w-full py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between">
          <h2>LAST DIARIES</h2>
          <Button variant={"link"} asChild>
            <Link href={"/diary"}>VIEW ALL ARCHIVE →</Link>
          </Button>
        </div>
        <div className="mt-20 grid grid-cols-3 gap-8">
          {posts.map((post) => {
            return (
              <Link href={`/diary/${post.slug}`} key={post.id}>
                <CardItem {...post} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
