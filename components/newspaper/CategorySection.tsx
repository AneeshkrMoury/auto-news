// One category's section: red section label + a grid of however many
// story cards exist for that category today (no fixed count).
import { theme } from "@/lib/theme";
import StoryCard from "./StoryCard";

type Post = { id: string; title: string; body: string; image_url: string };

export default function CategorySection({ category, posts }: { category: string; posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section id={category} className="mb-12 pt-8" style={{ borderTop: `1px solid rgba(30,27,22,0.25)` }}>
      <h2
        className="text-xs tracking-widest uppercase mb-6 font-medium"
        style={{ color: theme.red }}
      >
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <StoryCard key={post.id} id={post.id} title={post.title} body={post.body} imageUrl={post.image_url} />
        ))}
      </div>
    </section>
  );
}