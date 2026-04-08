import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>로그인 레이아웃 수정합시다</div>
      {children}
    </div>
  );
}
