// Site-wide header: masthead name, category nav links, and current date.
import Link from "next/link";
import { theme } from "@/lib/theme";

const CATEGORIES = ["sports", "movies", "breaking"];

export default function SiteHeader({ edition, date }: { edition: string; date: string }) {
  return (
    <header className="border-b pb-4 mb-8" style={{ borderColor: "rgba(30,27,22,0.25)" }}>
      <div className="flex justify-between items-center mb-2">
        <Link href="/">
          <h1 className="text-3xl" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, color: theme.ink }}>
            DAYMARK
          </h1>
        </Link>
        <nav className="flex gap-6 text-sm uppercase tracking-wide" style={{ color: theme.gray }}>
          {CATEGORIES.map((cat) => (
            <a key={cat} href={`#${cat}`} className="hover:underline">{cat}</a>
          ))}
        </nav>
      </div>
      <div className="text-xs uppercase tracking-widest" style={{ color: theme.gray }}>
        {edition} Edition &middot; {date}
      </div>
    </header>
  );
}