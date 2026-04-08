import { signOut } from "@/actions/auth";

export default function AdminPage() {
  return (
    <div>
      대시보드
      <form action={signOut}>
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
