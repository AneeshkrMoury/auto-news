// Large banner for the day's most recent story, shown above the
// category grid sections.
import Link from "next/link";
import { theme } from "@/lib/theme";

type TopStoryProps = {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  category: string;
};

export default function TopStory({ id, title, body, imageUrl, category }: TopStoryProps) {
  const snippet = body.split("\n\n")[0];
  return (
    <Link href={`/article/${id}`} className="block mb-10 group">
      <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: theme.red }}>
        {category}
      </div>
      <div className="relative">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-[320px] object-cover block"
          style={{ filter: "sepia(8%) contrast(1.02)" }}
        />
      </div>
      <h2
        className="text-3xl leading-tight mt-4 mb-2 no-underline group-hover:underline"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, color: theme.ink }}
      >
        {title}
      </h2>
      <p className="text-base italic" style={{ color: theme.gray }}>{snippet}</p>
    </Link>
  );
}