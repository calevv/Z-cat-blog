interface EditorBodyProps {
  content: string;
  onChange: (value: string) => void;
}
export default function EditorBody({ content, onChange }: EditorBodyProps) {
  return (
    <textarea
      className="h-full w-full resize-none bg-transparent font-mono outline-none"
      placeholder="마크다운을 입력하세요..."
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
