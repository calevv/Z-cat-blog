import { createClient } from "@/lib/supabase";

export async function getCachedPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data;
}

// posts.query.ts
export async function getRecentPosts(limit: number = 3) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
