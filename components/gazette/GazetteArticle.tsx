// Article page, ported from The Gazette template: breadcrumb, kicker,
// title, byline (adapted to our "Daymark [Category] Desk" model
// instead of individual reporters), cover image, body, related stories.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Article = {
  id: string;
  title: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};

type NavItem = { id: string; title: string } | null;
type RelatedPost = { id: string; title: string; image_url: string };

type GazetteArticleProps = {
  article: Article;
  previous: NavItem;
  next: NavItem;
  related: RelatedPost[];
};

export default function GazetteArticle({ article, previous, next, related }: GazetteArticleProps) {
  const paragraphs = article.body.split("\n\n").filter(Boolean);
  const disclosure = paragraphs[paragraphs.length - 1]?.startsWith("*This article")
    ? paragraphs.pop()
    : null;
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-xs uppercase tracking-wide mb-6" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${article.category}`} className="hover:underline capitalize">{article.category}</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14">
        <main>
          <span className="text-xs uppercase tracking-wide font-semibold" style={{ fontFamily: "var(--font-mono)", color: theme.press }}>
            {article.category}
          </span>
          <h1 className="mt-2 mb-4" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "2.75rem", lineHeight: 1.1, color: theme.ink }}>
            {article.title}
          </h1>

          <div
            className="flex items-center gap-3 text-sm py-3 mb-6 border-t border-b"
            style={{ borderColor: theme.rule, color: theme.ink2 }}
          >
            <span style={{ fontFamily: "var(--font-mono)" }}>Daymark {article.category} Desk</span>
            <span>·</span>
            <span>{date}</span>
          </div>

          <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: theme.band }} className="mb-8">
            <img src={article.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div
            className="space-y-5"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", lineHeight: 1.75, color: theme.ink }}
          >
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {disclosure && (
            <p className="text-sm italic mt-6 pt-4 border-t" style={{ borderColor: theme.rule, color: theme.ink3 }}>
              {disclosure.replace(/\*/g, "")}
            </p>
          )}

          <div className="flex justify-between gap-6 mt-12 pt-6 border-t text-sm" style={{ borderColor: theme.rule }}>
            {previous ? (
              <Link href={`/article/${previous.id}`} style={{ color: theme.ink2 }} className="hover:underline max-w-[46%]">
                <span className="block text-xs uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>Previous</span>
                {previous.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/article/${next.id}`} style={{ color: theme.ink2 }} className="hover:underline max-w-[46%] text-right">
                <span className="block text-xs uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>Next</span>
                {next.title}
              </Link>
            ) : <span />}
          </div>
        </main>

        {related.length > 0 && (
          <aside>
            <h2 className="text-sm uppercase tracking-wide pb-2 mb-4 border-b-2 capitalize" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, borderColor: theme.ink, color: theme.ink }}>
              More in {article.category}
            </h2>
            {related.map((post) => (
              <Link key={post.id} href={`/article/${post.id}`} className="flex gap-3 mb-4">
                <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0, overflow: "hidden", background: theme.band }}>
                  <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <span className="text-sm leading-snug" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: theme.ink }}>
                  {post.title}
                </span>
              </Link>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}