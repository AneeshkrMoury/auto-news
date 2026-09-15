// Right rail: a short list of additional top stories with thumbnails.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Post = { id: string; title: string; image_url: string; category: string };

export default function MoreTopRail({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h2
        className="text-sm uppercase tracking-wide pb-2 mb-4 border-b-2"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700, borderColor: theme.ink, color: theme.ink }}
      >
        More Top Stories
      </h2>
      <div className="space-y-5">
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/article/${post.id}`} className="block mb-2" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: theme.band }}>
              <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </Link>
            <span
              className="text-xs uppercase tracking-wide font-semibold block mb-1"
              style={{ fontFamily: "var(--font-mono)", color: theme.ink2 }}
            >
              {post.category}
            </span>
            <Link href={`/article/${post.id}`} className="text-sm leading-snug hover:underline" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: theme.ink }}>
              {post.title}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}