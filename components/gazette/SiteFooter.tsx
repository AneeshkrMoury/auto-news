import Link from "next/link";
import { theme } from "@/lib/theme";

const CATEGORIES = ["sports", "movies", "breaking"];

export default function SiteFooter() {
  return (
    <footer style={{ background: theme.ink, color: "#cfd4dc" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="text-2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 800, color: "#fff" }}>
            Daymark
          </span>
          <p className="mt-3 text-sm" style={{ color: "#9aa2ad" }}>
            Daymark articles are rewritten with AI assistance from third-party sources. Please verify details independently.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-mono)" }}>Sections</h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link href={`/category/${cat}`} className="hover:underline capitalize">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-mono)" }}>The Paper</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">About Daymark</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-mono)" }}>Built By</h4>
          <p className="text-sm mb-2">Aneesh Kumar Mourya</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://github.com/AneeshkrMoury" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
            <li><a href="https://linkedin.com/in/aneeshmourya-1b2a15375" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t text-center text-xs py-4" style={{ borderColor: "#2a2e36", color: "#78808c" }}>
        © 2026 Daymark. All rights reserved.
      </div>
    </footer>
  );
}