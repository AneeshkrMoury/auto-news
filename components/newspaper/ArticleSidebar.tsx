// Right-rail sidebar shown next to an article: related stories in the
// same category, plus the AI-disclosure note styled as a pull-box.
import Link from "next/link";
import { theme } from "@/lib/theme";

type RelatedPost = { id: string; title: string; image_url: string };

export default function ArticleSidebar({ category, related }: { category: string; related: RelatedPost[] }) {
  return (
    <aside>
      {related.length > 0 && (
        <div className="mb-10">
          <div
            className="text-xs tracking-widest uppercase mb-4 pb-2 font-medium"
            style={{ color: theme.red, borderBottom: `1px solid rgba(30,27,22,0.25)` }}
          >
            More in {category}
          </div>
          {related.map((post) => (
            <Link key={post.id} href={`/article/${post.id}`} className="flex gap-3 mb-4 group">
              <img
                src={post.image_url}
                alt=""
                className="w-16 h-16 object-cover flex-shrink-0"
                style={{ filter: "sepia(8%) contrast(1.02)" }}
              />
              <div
                className="text-sm leading-snug group-hover:underline"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, color: theme.ink }}
              >
                {post.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}