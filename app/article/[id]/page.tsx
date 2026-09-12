import { theme } from "@/lib/theme";
import { getArticleWithNeighbors, getRelatedPosts, getCurrentEdition } from "@/lib/getEdition";
import SiteHeader from "@/components/newspaper/SiteHeader";
import SiteFooter from "@/components/newspaper/SiteFooter";
import ArticlePage from "@/components/newspaper/ArticlePage";
import { notFound } from "next/navigation";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArticleWithNeighbors(id);
  if (!data) notFound();

  const related = await getRelatedPosts(data.article.category, id);
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      className="min-h-screen"
      style={{
        background: `${theme.paperTexture}, ${theme.paper}`,
        color: theme.ink,
        fontFamily: "var(--font-newsreader)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SiteHeader edition={getCurrentEdition()} date={date} />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ArticlePage article={data.article} previous={data.previous} next={data.next} related={related} />
      </div>
      <SiteFooter />
    </div>
  );
}