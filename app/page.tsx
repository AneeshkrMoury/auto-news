import ArticlePage from "@/components/newspaper/ArticlePage";

const fakeArticle = {
  title: "Ice Hockey Star Sues Over Head Injury That Affected Marital Intimacy",
  body: "A professional ice hockey player has filed a lawsuit against his former team's medical staff, alleging that a mishandled head injury led to lasting effects on his personal life.\n\nThe player, whose identity is being withheld pending further proceedings, is seeking damages related to ongoing medical care and lost income.\n\nThe team has not yet issued a public statement.\n\n*This article was rewritten with AI assistance. Please verify details independently.*",
  image_url: "https://picsum.photos/1200/675",
  category: "sports",
  published_at: "2026-09-08T00:00:00Z",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-400 p-10">
      <div className="w-[680px] shadow-2xl">
        <ArticlePage article={fakeArticle} pageNumber={3} />
      </div>
    </div>
  );
}