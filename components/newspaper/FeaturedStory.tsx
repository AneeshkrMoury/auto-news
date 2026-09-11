// The single large lead story at the top of the front page, linking to
// its full article page.
import Link from "next/link";
import { theme } from "@/lib/theme";

type FeaturedProps = {
  id: string;
  title: string;
  snippet: string;
  imageUrl: string;
  category: string;
};

export default function FeaturedStory({ id, title, snippet, imageUrl, category }: FeaturedProps) {
  return (
    <Link href={`/article/${id}`} className="block mb-10 hover:opacity-90">
      <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: theme.red }}>
        {category}
      </div>
      <h2
        className="text-3xl leading-tight mb-3"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, color: theme.ink }}
      >
        {title}
      </h2>
      <p className="text-base italic mb-4" style={{ color: theme.gray }}>
        {snippet}
      </p>
      <img src={imageUrl} alt="" className="w-full h-40 object-cover block" style={{ filter: "sepia(8%) contrast(1.02)" }} />
    </Link>
  );
}