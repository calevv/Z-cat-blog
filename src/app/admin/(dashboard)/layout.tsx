import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>어드민 레이아웃 수정합시다</div>
      {children}
    </div>
  );
}
