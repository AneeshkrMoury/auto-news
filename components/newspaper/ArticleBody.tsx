// Justified body text. First paragraph gets a large drop-cap first letter,
// matching classic print newspaper styling.
export default function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="text-lg leading-relaxed text-justify [hyphens:auto]">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "mb-4 first-letter:font-bold first-letter:text-[68px] first-letter:leading-[0.75] first-letter:float-left first-letter:pr-2 first-letter:pt-1"
              : "mb-4"
          }
        >
          {p}
        </p>
      ))}
    </div>
  );
}