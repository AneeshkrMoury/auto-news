import { theme } from "@/lib/theme";
import SiteHeader from "@/components/gazette/SiteHeader";
import SiteFooter from "@/components/gazette/SiteFooter";

export default function About() {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ background: theme.paper, fontFamily: "var(--font-sans)" }}>
      <SiteHeader date={date} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl mb-8" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: theme.ink }}>
          About Daymark
        </h1>

        <div className="space-y-8" style={{ color: theme.ink2 }}>
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: theme.ink }}>
              What Daymark Is
            </h2>
            <p className="leading-relaxed">
              Daymark is an independent, automated news publication covering sports, movies, and breaking news.
              It's a personal project built and maintained by a solo developer, not a newsroom with a reporting staff.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: theme.ink }}>
              About Our AI-Rewritten Content
            </h2>
            <p className="leading-relaxed mb-3">
              Articles on Daymark are generated with AI assistance, based on publicly available news sources.
              While the system is designed to preserve facts accurately, AI-generated content can occasionally
              contain errors, omissions, or misinterpretations of the original source material.
            </p>
            <p className="leading-relaxed mb-3">
              Article images are also AI-generated illustrations, not photographs of real events or people.
            </p>
            <p className="leading-relaxed">
              Please treat Daymark articles as a starting point, not a final authority. For anything important,
              verify details against the original source or another established outlet before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: theme.ink }}>
              Privacy
            </h2>
            <p className="leading-relaxed">
              Daymark does not collect, store, or sell any personal user data. There are no accounts, no tracking
              cookies, and no analytics that identify individual visitors on this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: theme.ink }}>
              No Warranty
            </h2>
            <p className="leading-relaxed">
              Daymark is provided as-is, without warranty of any kind. The publisher is not liable for decisions
              made based on information found on this site. Content is provided for general informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: theme.ink }}>
              Built By
            </h2>
            <p className="leading-relaxed mb-2">
              Daymark is built and maintained by Aneesh Kumar Mourya, a solo software developer.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="https://github.com/AneeshkrMoury" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.press }}>GitHub</a>
              <a href="www.linkedin.com/in/aneesh-mourya-1b2a15375" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.press }}>LinkedIn</a>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}