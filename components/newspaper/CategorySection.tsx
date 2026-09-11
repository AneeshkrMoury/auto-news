// One category's section on the homepage: red section label + up to 3
// story cards, with a link to the full category page for the rest.
import Link from "next/link";
import { theme } from "@/lib/theme";
import StoryCard from "./StoryCard";

type Post = { id: string; title: string; body: string; image_url: string };

export default function CategorySection({ category, posts }: { category: string; posts: Post[] }) {
  if (posts.length === 0) return null;
  const preview = posts.slice(0, 3);

  return (
    <section id={category} className="mb-12 pt-8" style={{ borderTop: `1px solid rgba(30,27,22,0.25)` }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xs tracking-widest uppercase font-medium" style={{ color: theme.red }}>
          {category}
        </h2>
        {posts.length > 3 && (
          <Link href={`/category/${category}`} className="text-xs uppercase tracking-wide hover:underline" style={{ color: theme.gray }}>
            See all →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {preview.map((post) => (
          <StoryCard key={post.id} id={post.id} title={post.title} body={post.body} imageUrl={post.image_url} />
        ))}
      </div>
    </section>
  );
}