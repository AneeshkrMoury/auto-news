// The paper's front page: masthead, one featured story, and a fixed grid
// of 4 smaller teasers. This is a fixed-slot template, not a freeform
// layout — always exactly 1 featured + 4 teasers, by design.
import { theme } from "@/lib/theme";
import Masthead from "./Masthead";
import FeaturedStory from "./FeaturedStory";
import TeaserCard from "./TeaserCard";

type TeaserItem = {
  title: string;
  imageUrl: string;
  pageNumber: number;
};

type FrontPageProps = {
  edition: "Morning" | "Evening";
  date: string;
  featured: {
    title: string;
    snippet: string;
    imageUrl: string;
    category: string;
  };
  teasers: TeaserItem[]; // expects exactly 4
};

export default function FrontPage({ edition, date, featured, teasers }: FrontPageProps) {
  return (
    <div
      className="w-full h-full px-14 py-10 overflow-hidden"
      style={{ background: theme.paper, color: theme.ink }}
    >
      <Masthead edition={edition} date={date} />
      <FeaturedStory {...featured} />
      <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: `1px solid rgba(30,27,22,0.25)` }}>
        {teasers.map((teaser, i) => (
          <TeaserCard key={i} {...teaser} />
        ))}
      </div>
    </div>
  );
}