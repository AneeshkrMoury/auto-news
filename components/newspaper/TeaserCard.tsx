// One small story preview in the front-page grid: thumbnail, headline,
// linking to that story's full article page.
import Link from "next/link";
import { theme } from "@/lib/theme";

type TeaserProps = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function TeaserCard({ id, title, imageUrl }: TeaserProps) {
  return (
    <Link href={`/article/${id}`} className="flex gap-3 items-start hover:opacity-80">
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
      </div>
    </Link>
  );
}