// The "rewritten with AI assistance" notice appended to every article body.
// Kept as its own component so the accuracy disclaimer is never accidentally
// dropped or restyled by changes elsewhere in the article layout.
import { theme } from "@/lib/theme";

export default function ArticleDisclosure({ text }: { text: string }) {
  return (
    <div className="text-sm italic mt-4" style={{ color: theme.gray }}>
      {text.replace(/\*/g, "")}
    </div>
  );
}