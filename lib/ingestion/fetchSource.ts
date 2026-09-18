// Fetches and parses one source's RSS feed into a normalized shape.
import Parser from "rss-parser";
import crypto from "crypto";
import { Source } from "@/lib/sources/types";

const parser = new Parser();

export async function fetchSourceArticles(source: Source) {
  const res = await fetch(source.feedUrl);
  const xml = await res.text();
  const feed = await parser.parseString(xml);

  return (feed.items || []).map((item) => {
    const originalUrl = item.link || "";
    const contentHash = crypto.createHash("sha256").update(originalUrl).digest("hex");

    return {
      title: item.title || "Untitled",
      originalUrl,
      author: item.creator || item.author || null,
      publishedAt: item.isoDate || item.pubDate || null,
      summary: item.contentSnippet || item.content || "",
      category: source.defaultCategory, // ← was item.categories?.[0], now uses the source's assigned category
      imageUrl: item.enclosure?.url || null,
      contentHash,
    };
  });
}