import Link from "next/link";
import { theme } from "@/lib/theme";

const CATEGORIES = ["sports", "movies", "breaking", "world", "science", "technology"];

type SiteHeaderProps = {
  date: string;
  activeCategory?: string;
  storyCount?: number;
  lastUpdated?: string;
  onThisDay?: string | null;
};

export default function SiteHeader({ date, activeCategory, storyCount, lastUpdated, onThisDay }: SiteHeaderProps) {
  return (
    <>
      <div style={{ background: theme.ink, color: "#cfd4dc" }} className="py-2">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-xs uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
          <span>{date}</span>
          <span style={{ color: "#9aa2ad" }}>Daymark Edition</span>
        </div>
      </div>

      <div className="py-8" style={{ background: theme.paper }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
            {storyCount !== undefined && <div>Morning Edition</div>}
            {storyCount !== undefined && <div>{storyCount} stories today</div>}
            {lastUpdated && <div>Updated {lastUpdated}</div>}
          </div>

          <Link href="/" className="text-center">
            <div className="text-xs tracking-[0.3em] mb-1" style={{ fontFamily: "var(--font-mono)", color: theme.press }}>
              THE
            </div>
            <div className="text-6xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 800, color: theme.ink }}>
              Daymark
            </div>
            <div className="text-xs uppercase tracking-widest mt-2" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
              Sports · Movies · Breaking — Rewritten Daily by AI
            </div>
          </Link>

          <div className="text-xs text-right" style={{ fontFamily: "var(--font-mono)", color: theme.ink3 }}>
            {onThisDay && (
              <>
                <div style={{ color: theme.press }}>On This Day</div>
                <div className="mt-1 leading-snug">{onThisDay}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav style={{ borderTop: `3px solid ${theme.press}`, borderBottom: `1px solid ${theme.rule}`, background: theme.card }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-center gap-10 text-sm uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Link
                key={cat}
                href={`/category/${cat}`}
                className="py-3"
                style={{
                  color: isActive ? theme.press : theme.ink2,
                  fontWeight: isActive ? 700 : 500,
                  borderBottom: isActive ? `2px solid ${theme.press}` : "2px solid transparent",
                }}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}