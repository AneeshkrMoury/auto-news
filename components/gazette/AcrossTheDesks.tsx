// Ported from The Gazette's "Across the Desks" section: a 4-card grid
// with a boxed category tag, date, headline, snippet, and a real
// read-time estimate instead of the template's fake individual bylines.
import Link from "next/link";
import { theme } from "@/lib/theme";
import { getReadTime } from "@/lib/readTime";

type Post = { id: string; title: string; body: string; image_url: string; category: string; published_at: string };

export default function AcrossTheDesks({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <span className="w-3 h-3" style={{ background: theme.press }} />
        <h2 className="text-sm uppercase tracking-wide font-bold" style={{ fontFamily: "var(--font-mono)", color: theme.ink }}>
          Across the Desks
        </h2>
        <span className="flex-1 border-t" style={{ borderColor: theme.rule }} />
        <Link href="/category/sports" className="text-xs uppercase tracking-wide flex items-center gap-1 hover:underline" style={{ fontFamily: "var(--font-mono)", color: theme.ink2 }}>
          Full Front Page →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => {
          const dek = post.body.split("\n\n")[0];
          const date = new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const readMin = getReadTime(post.body);

          return (
            <article key={post.id} style={{ background: theme.card, border: `1px solid ${theme.rule}` }}>
              <Link href={`/article/${post.id}`} style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", display: "block", background: theme.band }}>
                <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs uppercase tracking-wide px-2 py-0.5 capitalize"
                    style={{ fontFamily: "var(--font-mono)", border: `1px solid ${theme.ink}`, color: theme.ink }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>{date}</span>
                </div>
                <h3 className="text-base leading-snug mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: theme.ink }}>
                  <Link href={`/article/${post.id}`} className="hover:underline">{post.title}</Link>
                </h3>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: theme.ink2 }}>{dek}</p>
                <p className="text-xs" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
                  Daymark {post.category} Desk · {readMin} min
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}