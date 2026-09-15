// Short list of recent headlines, styled as the template's
// "World in Brief" rail.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Post = { id: string; title: string; category: string };

export default function BriefRail({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h2
        className="text-sm uppercase tracking-wide pb-2 mb-4 border-b-2"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700, borderColor: theme.ink, color: theme.ink }}
      >
        In Brief
      </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="pb-4 border-b" style={{ borderColor: theme.rule }}>
            <span
              className="block text-xs uppercase tracking-wide mb-1"
              style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}
            >
              {post.category}
            </span>
            <Link
              href={`/article/${post.id}`}
              className="text-base leading-snug hover:underline"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: theme.ink }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}