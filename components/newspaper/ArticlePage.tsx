import { theme } from "@/lib/theme";
import ArticleKicker from "./ArticleKicker";
import ArticleHeadline from "./ArticleHeadline";
import ArticleByline from "./ArticleByline";
import ArticleImage from "./ArticleImage";
import ArticleBody from "./ArticleBody";
import ArticleDisclosure from "./ArticleDisclosure";
import ArticleNav from "./ArticleNav";
import ArticleSidebar from "./ArticleSidebar";

type Article = {
  id: string;
  title: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};

type NavItem = { id: string; title: string } | null;
type RelatedPost = { id: string; title: string; image_url: string };

type ArticlePageProps = {
  article: Article;
  previous: NavItem;
  next: NavItem;
  related: RelatedPost[];
};

export default function ArticlePage({ article, previous, next, related }: ArticlePageProps) {
  const paragraphs = article.body.split("\n\n").filter(Boolean);
  const disclosure = paragraphs[paragraphs.length - 1]?.startsWith("*This article")
    ? paragraphs.pop()
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16">
      <main>
        <ArticleKicker category={article.category} />
        <ArticleHeadline title={article.title} />
        <ArticleByline category={article.category} publishedAt={article.published_at} />
        <ArticleImage src={article.image_url} />
        <ArticleBody paragraphs={paragraphs} />
        {disclosure && <ArticleDisclosure text={disclosure} />}
        <ArticleNav previous={previous} next={next} />
      </main>
      <ArticleSidebar category={article.category} related={related} />
    </div>
  );
}