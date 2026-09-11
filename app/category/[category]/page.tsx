import { theme } from "@/lib/theme";
import SiteHeader from "@/components/newspaper/SiteHeader";
import StoryCard from "@/components/newspaper/StoryCard";
import { getCategoryPosts, getCurrentEdition } from "@/lib/getEdition";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = await getCategoryPosts(category);

  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      className="min-h-screen"
      style={{ background: `${theme.paperTexture}, ${theme.paper}`, color: theme.ink, fontFamily: "var(--font-newsreader)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        <SiteHeader edition={getCurrentEdition()} date={date} />
        <h1
          className="text-3xl mb-8"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, color: theme.red }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <StoryCard key={post.id} id={post.id} title={post.title} body={post.body} imageUrl={post.image_url} />
          ))}
        </div>
      </div>
    </div>
  );
}