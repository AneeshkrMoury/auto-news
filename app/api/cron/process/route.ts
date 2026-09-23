import { supabase } from "@/lib/supabase";
import { processRawArticle } from "@/lib/processing/processArticle";
import { sendAlert } from "@/lib/alert";

export const maxDuration = 60;

const BATCH_SIZE = 5;

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
      .order("ingested_at", { ascending: true })
      .limit(200); // safety cap on the read, not the batch — round-robin below picks the real batch

    if (!pending || pending.length === 0) {
      return Response.json({ message: "No pending articles" });
    }

    // Round-robin across categories so one category (whichever sorts
    // first) can't eat the whole batch cap while others starve. Previous
    // flat .limit(5) with no ordering always grabbed the same category.
    const byCategory = new Map<string, typeof pending>();
    for (const article of pending) {
      const list = byCategory.get(article.category) ?? [];
      list.push(article);
      byCategory.set(article.category, list);
    }

    const batch: typeof pending = [];
    while (batch.length < BATCH_SIZE) {
      let addedAny = false;
      for (const list of byCategory.values()) {
        if (batch.length >= BATCH_SIZE) break;
        const next = list.shift();
        if (next) {
          batch.push(next);
          addedAny = true;
        }
      }
      if (!addedAny) break; // every category's pending list is empty
    }

    const results = await Promise.all(
      batch.map((article) => processRawArticle(article, article.sources))
    );

    return Response.json(results);
  } catch (err) {
    await sendAlert(`🚨 Daymark: article processing failed: ${String(err)}`);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}