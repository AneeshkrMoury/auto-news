import BriefRail from "./BriefRail";
import LeadStory from "./LeadStory";
import MoreTopRail from "./MoreTopRail";

type Post = any;

type FrontPageLeadProps = {
  lead: Post;
  briefs: Post[];
  moreTop: Post[];
};

export default function FrontPageLead({ lead, briefs, moreTop }: FrontPageLeadProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr_260px] gap-10">
      <BriefRail posts={briefs} />
      <LeadStory post={lead} />
      <MoreTopRail posts={moreTop} />
    </div>
  );
}