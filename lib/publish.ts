import { fetchNews } from "./fetchNews";
import { rewriteArticle } from "./rewriteArticle";
import { generateImage } from "./generateImage";
import { supabase } from "./supabase";

async function uploadWithRetry(fileName: string, imageBuffer: Buffer, retries = 1): Promise<void> {
  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, imageBuffer, { contentType: "image/png" });

  if (error) {
    if (retries <= 0) throw error;
    await new Promise((r) => setTimeout(r, 1000));
    return uploadWithRetry(fileName, imageBuffer, retries - 1);
  }
}

export async function publishCategory(category: "sports" | "movies" | "breaking") {
  const articles = await fetchNews(category);
  const results = [];

  for (const article of articles) {
    try {
      const rewritten = await rewriteArticle(article);
      const imageBuffer = await generateImage(
        `Poster-style sports illustration, dynamic action pose, no readable text, no jersey numbers, no logos, cinematic lighting: ${rewritten.title}`
      );

      const fileName = `${category}-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
      await uploadWithRetry(fileName, imageBuffer);

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("posts").insert({
        title: rewritten.title,
        body: rewritten.body,
        image_url: urlData.publicUrl,
        category,
        source_url: article.url,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          // duplicate source_url — already published, skip quietly
          results.push({ title: rewritten.title, status: "skipped (duplicate)" });
          continue;
        }
        throw insertError;
      }

      results.push({ title: rewritten.title, status: "published" });
    } catch (err) {
      // one bad article shouldn't kill the whole batch
      results.push({ title: article.title, status: "failed", error: String(err) });
    }
  }

  return results;
}

export async function publishAllCategories() {
  const categories: ("sports" | "movies" | "breaking")[] = ["sports", "movies", "breaking"];
  const summary: Record<string, unknown> = {};

  for (const category of categories) {
    summary[category] = await publishCategory(category);
  }

  return summary;
}