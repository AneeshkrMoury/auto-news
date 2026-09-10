import FrontPage from "@/components/newspaper/FrontPage";
import ArticlePage from "@/components/newspaper/ArticlePage";
import { getFrontPageData } from "@/lib/getEdition";

export default async function Home() {
  const data = await getFrontPageData();

  if (!data) {
    return <div className="p-10 text-center">No articles published yet.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 bg-neutral-400 p-10">
      <div className="w-[680px] shadow-2xl">
        <FrontPage edition={data.edition} date={data.date} featured={data.featured} teasers={data.teasers} />
      </div>
      {data.articles.map((article) => (
        <div key={article.id} className="w-[680px] shadow-2xl">
          <ArticlePage article={article} pageNumber={article.pageNumber} />
        </div>
      ))}
    </div>
  );
}