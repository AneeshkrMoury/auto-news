import { theme } from "@/lib/theme";
import SiteHeader from "@/components/gazette/SiteHeader";
import SiteFooter from "@/components/gazette/SiteFooter";
import { getCategoryPosts } from "@/lib/getEdition";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = await getCategoryPosts(category);
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ background: theme.paper, fontFamily: "var(--font-sans)" }}>
      <SiteHeader date={date} />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl capitalize mb-8 pb-3 border-b-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, borderColor: theme.ink, color: theme.ink }}>
          {category}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/article/${post.id}`}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: theme.band }} className="mb-3">
                <img src={post.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 className="text-lg leading-snug" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: theme.ink }}>
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}