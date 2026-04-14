import { Database } from "./supabase";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];
type PostInsertRow = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdateRow = Database["public"]["Tables"]["posts"]["Update"];

export type AuthorType = "human" | "zcat";

export interface Post extends Omit<PostRow, "author_type" | "tags"> {
  author_type: AuthorType;
  tags: string[]; // null 허용 안 함
}

// 4. Insert와 Update도 마찬가지로 처리하면 안전합니다.
export interface PostInsert extends Omit<
  PostInsertRow,
  "author_type" | "tags"
> {
  author_type?: AuthorType;
  tags?: string[]; // null 허용 안 함
}

export interface PostUpdate extends Omit<
  PostUpdateRow,
  "author_type" | "tags"
> {
  author_type?: AuthorType;
  tags?: string[]; // null 허용 안 함
}
