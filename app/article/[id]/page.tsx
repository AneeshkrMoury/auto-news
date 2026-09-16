import { theme } from "@/lib/theme";
import { getArticleWithNeighbors, getRelatedPosts } from "@/lib/getEdition";
import SiteHeader from "@/components/gazette/SiteHeader";
import SiteFooter from "@/components/gazette/SiteFooter";
import GazetteArticle from "@/components/gazette/GazetteArticle";
import { notFound } from "next/navigation";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArticleWithNeighbors(id);
  if (!data) notFound();

  const related = await getRelatedPosts(data.article.category, id);
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ background: theme.paper, fontFamily: "var(--font-sans)" }}>
      <SiteHeader date={date} />
      <GazetteArticle article={data.article} previous={data.previous} next={data.next} related={related} />
      <SiteFooter />
    </div>
  );
}