import { useEditor } from "./EditorContext";

export default function EditorBody() {
  const { form, handleContentChange } = useEditor();
  return (
    <textarea
      className="h-full w-full resize-none bg-transparent font-mono outline-none"
      placeholder="마크다운을 입력하세요..."
      value={form.content}
      onChange={(e) => handleContentChange(e.target.value)}
    />
  );
}
