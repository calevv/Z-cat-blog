import { createClient } from "@/lib/supabase";

export async function getAllPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .is("deleted_at", null)
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getRecentPosts(limit: number = 3) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .is("deleted_at", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
