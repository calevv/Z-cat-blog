import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>에디터 레이아웃 수정합시다</div>
      {children}
    </div>
  );
}
