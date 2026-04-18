import { Database } from "./supabase";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];
type PostInsertRow = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdateRow = Database["public"]["Tables"]["posts"]["Update"];

export type AuthorType = "human" | "zcat";

export interface Post extends Omit<PostRow, "author_type"> {
  author_type: AuthorType;
}

export interface PostInsert extends Omit<PostInsertRow, "author_type"> {
  author_type?: AuthorType;
}

export interface PostUpdate extends Omit<PostUpdateRow, "author_type"> {
  author_type?: AuthorType;
}

/* Posts Server Action 전용 타입*/
export interface PostForm extends Omit<
  PostRow,
  | "author_type"
  | "cover_image"
  | "id"
  | "created_at"
  | "updated_at"
  | "published_at"
  | "deleted_at"
> {
  id?: string;
  author_type: AuthorType;
}

/* 어드민 테이블 전용 타입*/
export interface AdminTableProps extends Omit<
  PostRow,
  "cover_image" | "updated_at" | "deleted_at"
> {
  author_type: AuthorType;
}
