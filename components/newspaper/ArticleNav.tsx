// Previous/Next story navigation at the bottom of each article.
import Link from "next/link";
import { theme } from "@/lib/theme";

type NavItem = { id: string; title: string } | null;

export default function ArticleNav({ previous, next }: { previous: NavItem; next: NavItem }) {
  return (
    <div
      className="flex justify-between mt-12 pt-6 text-sm gap-4"
      style={{ borderTop: `1px solid rgba(30,27,22,0.25)` }}
    >
      {previous ? (
        <Link href={`/article/${previous.id}`} className="hover:underline" style={{ color: theme.red }}>
          ← {previous.title}
        </Link>
      ) : <span />}
      {next ? (
        <Link href={`/article/${next.id}`} className="hover:underline text-right" style={{ color: theme.red }}>
          {next.title} →
        </Link>
      ) : <span />}
    </div>
  );
}