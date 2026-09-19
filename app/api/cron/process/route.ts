import { supabase } from "@/lib/supabase";
import { processRawArticle } from "@/lib/processing/processArticle";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: pending } = await supabase
    .from("raw_articles")
    .select("*, sources(*)")
    .eq("review_status", "PENDING")
    .limit(5); // small batch per run, same volume-control principle as before

  if (!pending || pending.length === 0) {
    return Response.json({ message: "No pending articles" });
  }

  const results = await Promise.all(
    pending.map((article) => processRawArticle(article, article.sources))
  );

  return Response.json(results);
}