import { supabase } from "@/lib/supabase";
import { Source } from "@/lib/sources/types";
import { fetchSourceArticles } from "./fetchSource";

export async function ingestSource(source: Source, sourceId: string) {
  if (!source.allowsDerivatives) {
    return { source: source.name, status: "skipped", reason: "License does not permit derivative works" };
  }

  const articles = await fetchSourceArticles(source);
  const results = [];

  for (const article of articles) {
    const { error } = await supabase.from("raw_articles").insert({
      source_id: sourceId,
      title: article.title,
      original_url: article.originalUrl,
      author: article.author,
      published_at: article.publishedAt,
      summary: article.summary,
      category: article.category,
      image_url: article.imageUrl,
      content_hash: article.contentHash,
      review_status: "PENDING",
    });

    if (error) {
      if (error.code === "23505") {
        results.push({ title: article.title, status: "skipped (duplicate)" });
        continue;
      }
      results.push({ title: article.title, status: "failed", error: error.message });
      continue;
    }

    results.push({ title: article.title, status: "ingested" });
  }

  return { source: source.name, status: "completed", articles: results };
}