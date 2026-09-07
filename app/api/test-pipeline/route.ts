import { fetchNews } from "@/lib/fetchNews";
import { rewriteArticle } from "@/lib/rewriteArticle";
import { generateImage } from "@/lib/generateImage";

export async function GET() {
  const articles = await fetchNews("sports");
  const rewritten = await rewriteArticle(articles[0]);
  const imageBuffer = await generateImage(
  `Poster-style sports illustration, dynamic action pose, no readable text, no jersey numbers, no logos, cinematic lighting: ${rewritten.title}`
);
  return new Response(new Uint8Array(imageBuffer), { headers: { "Content-Type": "image/png" } });
}