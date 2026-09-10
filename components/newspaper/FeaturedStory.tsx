// The single large lead story at the top of the front page.
// Shows headline, a short snippet (first paragraph only), and hero image.
import { theme } from "@/lib/theme";

type FeaturedProps = {
  title: string;
  snippet: string;
  imageUrl: string;
  category: string;
};

export default function FeaturedStory({ title, snippet, imageUrl, category }: FeaturedProps) {
  return (
    <div className="mb-10">
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
      <img src={imageUrl} alt="" className="w-full block" style={{ filter: "sepia(8%) contrast(1.02)" }} />
    </div>
  );
}