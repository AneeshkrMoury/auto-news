import { getArticleWithNeighbors } from "@/lib/getEdition";
import ArticlePage from "@/components/newspaper/ArticlePage";
import { notFound } from "next/navigation";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArticleWithNeighbors(id);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-neutral-300 py-10">
      <div className="max-w-2xl mx-auto min-h-[900px] shadow-2xl">
        <ArticlePage article={data.article} previous={data.previous} next={data.next} />
      </div>
    </div>
  );
}