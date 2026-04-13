import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex-1">{children}</div>
      <footer className="flex h-17 items-center justify-between border-t border-neutral-200 bg-white px-8 py-4">
        {/* TODO: 버튼들 기능 추가*/}
        <div>
          <Button variant={"ghost"}>
            <ArrowLeft /> 나가기
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant={"outline"}>임시저장</Button>
          <Button variant={"default"}>올리기</Button>
        </div>
      </footer>
    </div>
  );
}
