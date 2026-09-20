import { supabase } from "@/lib/supabase";
import { processRawArticle } from "@/lib/processing/processArticle";
import { sendAlert } from "@/lib/alert";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { data: pending } = await supabase
      .from("raw_articles")
      .select("*, sources(*)")
      .eq("review_status", "PENDING")
      .limit(5);

    if (!pending || pending.length === 0) {
      return Response.json({ message: "No pending articles" });
    }

    const results = await Promise.all(
      pending.map((article) => processRawArticle(article, article.sources))
    );

    return Response.json(results);
  } catch (err) {
    await sendAlert(`🚨 Daymark: article processing failed: ${String(err)}`);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}