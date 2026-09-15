// Ported from The Gazette template — topbar, masthead nameplate, and
// primary nav combined. Weather/markets/search removed per decision;
// nav categories are dynamic, not hardcoded to the template's demo list.
import Link from "next/link";
import { theme } from "@/lib/theme";

const CATEGORIES = ["sports", "movies", "breaking"];

export default function SiteHeader({ date }: { date: string }) {
  return (
    <>
      <div
        className="text-xs tracking-wide uppercase py-2"
        style={{ background: theme.ink, color: "#cfd4dc", fontFamily: "var(--font-mono)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between">
          <span>{date}</span>
          <span style={{ color: "#9aa2ad" }}>Daymark Edition</span>
        </div>
      </div>

      <header style={{ borderBottom: `3px solid ${theme.press}` }}>
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <Link href="/" className="inline-block">
            <span
              className="text-5xl"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 800, color: theme.ink }}
            >
              Daymark
            </span>
          </Link>
        </div>
      </header>

      <nav
        className="border-b"
        style={{ borderColor: theme.rule, background: theme.card }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center gap-8 text-sm uppercase tracking-wide">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/category/${cat}`} style={{ color: theme.ink2 }} className="hover:opacity-70">
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}