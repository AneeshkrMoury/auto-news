// Full newspaper-style article page. Composes the smaller pieces above.
// This is the only file that touches the raw Supabase article shape —
// everything below it works with plain, already-split props.
import { theme } from "@/lib/theme";
import ArticleKicker from "./ArticleKicker";
import ArticleHeadline from "./ArticleHeadline";
import ArticleByline from "./ArticleByline";
import ArticleImage from "./ArticleImage";
import ArticleBody from "./ArticleBody";
import ArticleDisclosure from "./ArticleDisclosure";
import PageFooter from "./PageFooter";

type Article = {
  title: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};

export default function ArticlePage({ article, pageNumber }: { article: Article; pageNumber: number }) {
  const paragraphs = article.body.split("\n\n").filter(Boolean);
  const disclosure = paragraphs[paragraphs.length - 1]?.startsWith("*This article")
    ? paragraphs.pop()
    : null;

  return (
    <div
      className="w-full h-full px-14 py-12 overflow-hidden"
      style={{ background: theme.paper, color: theme.ink, fontFamily: "var(--font-newsreader)" }}
    >
      <ArticleKicker category={article.category} />
      <ArticleHeadline title={article.title} />
      <ArticleByline category={article.category} publishedAt={article.published_at} />
      <ArticleImage src={article.image_url} />
      <ArticleBody paragraphs={paragraphs} />
      {disclosure && <ArticleDisclosure text={disclosure} />}
      <PageFooter pageNumber={pageNumber} />
    </div>
  );
}