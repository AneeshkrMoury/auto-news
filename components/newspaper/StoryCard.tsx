// Compact story card used in the dense category grids. Thumbnail,
// headline, short snippet.
import Link from "next/link";
import { theme } from "@/lib/theme";

type StoryCardProps = {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
};

export default function StoryCard({ id, title, body, imageUrl }: StoryCardProps) {
  const snippet = body.split("\n\n")[0];
  return (
    <Link href={`/article/${id}`} className="block group">
      <img
        src={imageUrl}
        alt=""
        className="w-full h-40 object-cover block mb-3"
        style={{ filter: "sepia(8%) contrast(1.02)" }}
      />
      <h3
        className="text-base leading-snug mb-1 no-underline group-hover:underline"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, color: theme.ink }}
      >
        {title}
      </h3>
      <p className="text-sm line-clamp-2" style={{ color: theme.gray }}>{snippet}</p>
    </Link>
  );
}