// Site-wide footer: AI-disclosure note + link to the about page.
import Link from "next/link";
import { theme } from "@/lib/theme";

export default function SiteFooter() {
  return (
    <footer
      className="mt-16 pt-8 pb-12 text-center text-xs"
      style={{ borderTop: `1px solid rgba(30,27,22,0.25)`, color: theme.gray }}
    >
      <p className="mb-2">
        Daymark articles are rewritten with AI assistance from third-party sources. Please verify details independently.
      </p>
      <Link href="/about" className="hover:underline" style={{ color: theme.red }}>
        About Daymark
      </Link>
    </footer>
  );
}