import { theme } from "@/lib/theme";
import SiteHeader from "@/components/gazette/SiteHeader";
import Ticker from "@/components/gazette/Ticker";
import FrontPageLead from "@/components/gazette/FrontPageLead";
import DeskSection from "@/components/gazette/DeskSection";
import SiteFooter from "@/components/gazette/SiteFooter";
import { getGazetteFrontPage } from "@/lib/getEdition";

export default async function Home() {
  const data = await getGazetteFrontPage();
  if (!data) return <div className="p-10 text-center">No articles published yet.</div>;

  return (
    <div style={{ background: theme.paper, fontFamily: "var(--font-sans)" }}>
      <SiteHeader date={data.date} />
      <Ticker posts={data.ticker} />
      <FrontPageLead lead={data.lead} briefs={data.briefs} moreTop={data.moreTop} />
      <div className="max-w-6xl mx-auto px-6">
        {Object.entries(data.byCategory).map(([category, posts]) => (
          <DeskSection key={category} category={category} posts={posts as any} />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}