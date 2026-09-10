import FrontPage from "@/components/newspaper/FrontPage";

const fakeFrontPage = {
  edition: "Morning" as const,
  date: "September 9, 2026",
  featured: {
    title: "A Healthier Planet Builds a Stronger Future",
    snippet: "Global leaders renew commitment to clean energy, green jobs and a more sustainable tomorrow.",
    imageUrl: "https://picsum.photos/id/1015/1200/675",
    category: "Climate",
  },
  teasers: [
    { title: "Nations Unite on Climate Goals", imageUrl: "https://picsum.photos/id/1016/200/200", pageNumber: 2 },
    { title: "The Power of a Kinder World", imageUrl: "https://picsum.photos/id/1018/200/200", pageNumber: 4 },
    { title: "Communities Lead the Way in Climate Action", imageUrl: "https://picsum.photos/id/1019/200/200", pageNumber: 6 },
    { title: "The Next Generation Takes the Stage", imageUrl: "https://picsum.photos/id/1020/200/200", pageNumber: 8 },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-400 p-10">
      <div className="w-[680px] shadow-2xl">
        <FrontPage {...fakeFrontPage} />
      </div>
    </div>
  );
}