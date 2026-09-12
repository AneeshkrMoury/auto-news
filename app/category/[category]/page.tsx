import { theme } from "@/lib/theme";
import { getArticleWithNeighbors } from "@/lib/getEdition";
import ArticlePage from "@/components/newspaper/ArticlePage";
import { notFound } from "next/navigation";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArticleWithNeighbors(id);
  if (!data) notFound();

  return (
    <div
      className="min-h-screen"
      style={{
        background: `${theme.paperTexture}, ${theme.paper}`,
        color: theme.ink,
        fontFamily: "var(--font-newsreader)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
        <ArticlePage article={data.article} previous={data.previous} next={data.next} />
      </div>
    </div>
  );
}