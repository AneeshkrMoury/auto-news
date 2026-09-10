// Author desk + publish date row, with hairline rules above/below.
import { theme } from "@/lib/theme";

export default function ArticleByline({ category, publishedAt }: { category: string; publishedAt: string }) {
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div
      className="flex items-center gap-2 text-sm italic py-2 mb-6"
      style={{ color: theme.gray, borderTop: "1px solid rgba(30,27,22,0.25)", borderBottom: "1px solid rgba(30,27,22,0.25)" }}
    >
      <span>DAYMARK {category.toUpperCase()} DESK</span>
      <span style={{ color: theme.gold }}>•</span>
      <span>{date}</span>
    </div>
  );
}