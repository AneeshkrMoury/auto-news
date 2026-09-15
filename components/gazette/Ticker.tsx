// Breaking news ticker, wired to real recent posts instead of the
// template's static demo items.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Post = { id: string; title: string; published_at: string };

export default function Ticker({ posts }: { posts: Post[] }) {
  return (
    <div className="border-b" style={{ borderColor: theme.rule, background: theme.card }}>
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4 overflow-x-auto text-sm">
        <span
          className="flex items-center gap-1.5 uppercase text-xs font-semibold flex-shrink-0"
          style={{ color: theme.press, fontFamily: "var(--font-mono)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.press }} />
          Live
        </span>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/article/${post.id}`}
            className="flex-shrink-0 hover:underline"
            style={{ color: theme.ink2 }}
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}