import { theme } from "@/lib/theme";
import SiteHeader from "@/components/newspaper/SiteHeader";
import TopStory from "@/components/newspaper/TopStory";
import CategorySection from "@/components/newspaper/CategorySection";
import { getFrontPageData } from "@/lib/getEdition";

export default async function Home() {
  const data = await getFrontPageData();

  if (!data) {
    return <div className="p-10 text-center">No articles published yet.</div>;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: `${theme.paperTexture}, ${theme.paper}`, color: theme.ink, fontFamily: "var(--font-newsreader)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        <SiteHeader edition={data.edition} date={data.date} />
        <TopStory
          id={data.topStory.id}
          title={data.topStory.title}
          body={data.topStory.body}
          imageUrl={data.topStory.image_url}
          category={data.topStory.category}
        />
        {Object.entries(data.byCategory).map(([category, posts]) => (
          <CategorySection key={category} category={category} posts={posts} />
        ))}
      </div>
    </div>
  );
}