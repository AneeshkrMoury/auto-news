import LatestHeadlines from "@/components/gazette/LatestHeadlines";
import { theme } from "@/lib/theme";
import SiteHeader from "@/components/gazette/SiteHeader";
import FrontPageLead from "@/components/gazette/FrontPageLead";
import DeskSection from "@/components/gazette/DeskSection";
import SiteFooter from "@/components/gazette/SiteFooter";
import { getGazetteFrontPage } from "@/lib/getEdition";
import { getOnThisDay } from "@/lib/onThisDay";
import AcrossTheDesks from "@/components/gazette/AcrossTheDesks";
import MarketsBox from "@/components/gazette/MarketsBox";
import { getMetalPrices } from "@/lib/metalPrices";


export default async function Home() {
  const data = await getGazetteFrontPage();
    if (!data) return <div className="p-10 text-center">No articles published yet.</div>;

        const onThisDay = await getOnThisDay();
        const storyCount = Object.values(data.byCategory).flat().length;
        const metalPrices = await getMetalPrices();
      const lastUpdated = new Date(data.lead.published_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div style={{ background: theme.paper, fontFamily: "var(--font-sans)" }}>
      <SiteHeader date={data.date} storyCount={storyCount} lastUpdated={lastUpdated} onThisDay={onThisDay} />
      <FrontPageLead lead={data.lead} briefs={data.briefs} moreTop={data.moreTop} />
      <AcrossTheDesks posts={data.acrossDesks} />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
        <div>
        {Object.entries(data.byCategory).map(([category, posts]) => (
          <DeskSection key={category} category={category} posts={posts as any} />
        ))}
        
        </div>
        <LatestHeadlines posts={data.latestHeadlines} />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-6 pb-12 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
          <div />
          <MarketsBox prices={metalPrices} />
        </div>
      <SiteFooter />
    </div>
  );
}