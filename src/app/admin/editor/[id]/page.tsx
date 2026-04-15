import EditorContainer from "@/components/admin/editor/EditorContainer";
import { createServerSupabaseClient } from "@/lib/supabase";

// Todo:수정페이지용 알럿과 저장버튼 수정

export default async function EditEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log("getPostById error:", error);
    return null;
  }
  console.log(data);
  return <EditorContainer initialData={data} />;
}
