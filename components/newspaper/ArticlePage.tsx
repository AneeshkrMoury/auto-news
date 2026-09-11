import { theme } from "@/lib/theme";
import ArticleKicker from "./ArticleKicker";
import ArticleHeadline from "./ArticleHeadline";
import ArticleByline from "./ArticleByline";
import ArticleImage from "./ArticleImage";
import ArticleBody from "./ArticleBody";
import ArticleDisclosure from "./ArticleDisclosure";
import ArticleNav from "./ArticleNav";

type Article = {
  id: string;
  title: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};

type NavItem = { id: string; title: string } | null;

type ArticlePageProps = {
  article: Article;
  previous: NavItem;
  next: NavItem;
};

export default function ArticlePage({ article, previous, next }: ArticlePageProps) {
  const paragraphs = article.body.split("\n\n").filter(Boolean);
  const disclosure = paragraphs[paragraphs.length - 1]?.startsWith("*This article")
    ? paragraphs.pop()
    : null;

  return (
    <div
      className="px-6 md:px-14 py-12"
      style={{
        background: `${theme.paperTexture}, ${theme.paper}`,
        color: theme.ink,
        fontFamily: "var(--font-newsreader)",
      }}
    >
      <ArticleKicker category={article.category} />
      <ArticleHeadline title={article.title} />
      <ArticleByline category={article.category} publishedAt={article.published_at} />

      <div>
        <ArticleImage src={article.image_url} side="right" />
        <ArticleBody paragraphs={paragraphs} />
      </div>

      {disclosure && <ArticleDisclosure text={disclosure} />}

      <ArticleNav previous={previous} next={next} />
    </div>
  );
}