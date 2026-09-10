// Site title banner at the top of the front page — edition type and date
// sit on either side of the paper's name, like a real print masthead.
import { theme } from "@/lib/theme";

export default function Masthead({ edition, date }: { edition: "Morning" | "Evening"; date: string }) {
  return (
    <div className="text-center mb-8 pb-4" style={{ borderBottom: `2px solid ${theme.ink}` }}>
      <div className="flex justify-between items-center text-xs tracking-widest uppercase mb-2" style={{ color: theme.gray }}>
        <span>Trusted News, Freshly Rewritten</span>
        <span>{edition} Edition</span>
      </div>
      <h1
        className="text-5xl tracking-tight"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, color: theme.ink }}
      >
        DAYMARK
      </h1>
      <div className="text-xs tracking-widest uppercase mt-2" style={{ color: theme.gray }}>
        {date}
      </div>
    </div>
  );
}