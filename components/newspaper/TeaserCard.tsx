// One small story preview in the front-page grid: thumbnail, headline,
// and the page number a reader would flip to for the full article.
import { theme } from "@/lib/theme";

type TeaserProps = {
  title: string;
  imageUrl: string;
  pageNumber: number;
};

export default function TeaserCard({ title, imageUrl, pageNumber }: TeaserProps) {
  return (
    <div className="flex gap-3 items-start">
      <img
        src={imageUrl}
        alt=""
        className="w-16 h-16 object-cover flex-shrink-0"
        style={{ filter: "sepia(8%) contrast(1.02)" }}
      />
      <div>
        <div
          className="text-sm leading-snug mb-1"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, color: theme.ink }}
        >
          {title}
        </div>
        <div className="text-xs italic" style={{ color: theme.gold }}>
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
}