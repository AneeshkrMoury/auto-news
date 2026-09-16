// Sticky sidebar list — real "latest" data instead of the template's
// fake "Most Read" (no view-count tracking exists to back that claim).
import Link from "next/link";
import { theme } from "@/lib/theme";
import { getReadTime } from "@/lib/readTime";

type Post = { id: string; title: string; body: string; category: string };

export default function LatestHeadlines({ posts }: { posts: Post[] }) {
  return (
    <div className="sticky top-6" style={{ background: theme.card, border: `1px solid ${theme.rule}` }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: theme.ink }}>
        <span className="w-2 h-2 rounded-full" style={{ background: theme.press }} />
        <span className="text-xs uppercase tracking-wide font-bold" style={{ fontFamily: "var(--font-mono)", color: theme.ink }}>
          Latest Headlines
        </span>
      </div>
      <div className="px-4">
        {posts.map((post, i) => (
          <div key={post.id} className="flex gap-3 py-4 border-b" style={{ borderColor: theme.rule }}>
            <span className="text-2xl font-bold flex-shrink-0" style={{ fontFamily: "var(--font-serif)", color: theme.press }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <Link href={`/article/${post.id}`} className="text-sm leading-snug hover:underline block mb-1" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: theme.ink }}>
                {post.title}
              </Link>
              <span className="text-xs uppercase" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
                {post.category} · {getReadTime(post.body)} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}