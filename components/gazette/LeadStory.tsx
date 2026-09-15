// The dominant front-page lead story: kicker, headline, dek, image.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Post = { id: string; title: string; body: string; image_url: string; category: string };

export default function LeadStory({ post }: { post: Post }) {
  const dek = post.body.split("\n\n")[0];
  return (
    <article>
      <Link href={`/article/${post.id}`} className="block mb-4" style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", background: theme.band }}>
        <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </Link>
      <span
        className="text-xs uppercase tracking-wide font-semibold"
        style={{ fontFamily: "var(--font-mono)", color: theme.press }}
      >
        {post.category} · The Lead
      </span>
      <h1 className="mt-2 mb-3" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.1, color: theme.ink }}>
        <Link href={`/article/${post.id}`} className="hover:underline">{post.title}</Link>
      </h1>
      <p className="text-lg" style={{ color: theme.ink2 }}>{dek}</p>
    </article>
  );
}