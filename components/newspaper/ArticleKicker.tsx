// Small category label (e.g. "SPORTS") shown above the headline.
// Print newspapers call this a "kicker" — hence the name.
import { theme } from "@/lib/theme";

export default function ArticleKicker({ category }: { category: string }) {
  return (
    <div
      className="text-xs tracking-widest uppercase mb-3 font-medium"
      style={{ color: theme.red }}
    >
      {category}
    </div>
  );
}