"use client";

import { createContext, useContext } from "react";
import { useEditorForm } from "@/hooks/useEditorForm";

// useEditorForm 반환 타입 + handleSave + isEditMode
type EditorContextValue = ReturnType<typeof useEditorForm> & {
  handleSave: (published: boolean) => Promise<void>;
  isEditMode: boolean;
};

export const EditorContext = createContext<EditorContextValue | null>(null);

// 커스텀 훅으로 감싸두면 null 체크 한 번만 하면 됨
export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("EditorContext 밖에서 사용됨");
  return ctx;
}
