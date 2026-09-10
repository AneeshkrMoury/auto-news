// The main article title, set in the display serif (Fraunces).
export default function ArticleHeadline({ title }: { title: string }) {
  return (
    <h1
      className="text-4xl leading-tight mb-4"
      style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, letterSpacing: "-0.01em" }}
    >
      {title}
    </h1>
  );
}