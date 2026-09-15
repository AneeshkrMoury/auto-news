// One category "desk": a featured story + a short list, styled after
// the template's World/Business/Tech/Culture desk sections.
import Link from "next/link";
import { theme } from "@/lib/theme";

type Post = { id: string; title: string; body: string; image_url: string; category: string };

export default function DeskSection({ category, posts }: { category: string; posts: Post[] }) {
  if (posts.length === 0) return null;
  const [feature, ...rest] = posts;
  const list = rest.slice(0, 3);
  const dek = feature.body.split("\n\n")[0];

  return (
    <div id={category} className="mb-14">
      <div className="flex justify-between items-center pb-2 mb-6 border-b-2" style={{ borderColor: theme.ink }}>
        <h2 className="text-xl capitalize" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: theme.ink }}>
          {category}
        </h2>
        <Link href={`/category/${category}`} className="text-xs uppercase tracking-wide hover:underline" style={{ fontFamily: "var(--font-mono)", color: theme.ink2 }}>
          More {category} →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
        <article>
          <Link href={`/article/${feature.id}`} className="block mb-3" style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", background: theme.band }}>
            <img src={feature.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </Link>
          <h3 className="text-2xl leading-tight mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: theme.ink }}>
            <Link href={`/article/${feature.id}`} className="hover:underline">{feature.title}</Link>
          </h3>
          <p style={{ color: theme.ink2 }}>{dek}</p>
        </article>

        <ul className="space-y-4">
          {list.map((post) => (
            <li key={post.id} className="flex gap-3 pb-4 border-b" style={{ borderColor: theme.rule }}>
              <Link href={`/article/${post.id}`} className="flex-shrink-0" style={{ position: "relative", width: 90, height: 90, overflow: "hidden", background: theme.band }}>
                <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </Link>
              <Link href={`/article/${post.id}`} className="text-sm leading-snug hover:underline" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: theme.ink }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}