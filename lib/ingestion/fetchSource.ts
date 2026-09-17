// Fetches and parses one source's RSS feed into a normalized shape.
import Parser from "rss-parser";
import crypto from "crypto";
import { Source } from "@/lib/sources/types";

const parser = new Parser();

export async function fetchSourceArticles(source: Source) {
  // Fetch manually instead of parser.parseURL() — Next.js's fetch()
  // decodes UTF-8 correctly by default, avoiding the mojibake
  // (garbled accented characters) that rss-parser's internal request
  // handling can produce.
  const res = await fetch(source.feedUrl);
  const xml = await res.text();
  const feed = await parser.parseString(xml);

  return (feed.items || []).map((item) => {
    const originalUrl = item.link || "";
    const contentHash = crypto
      .createHash("sha256")
      .update(originalUrl)
      .digest("hex");

    return {
      title: item.title || "Untitled",
      originalUrl,
      author: item.creator || item.author || null,
      publishedAt: item.isoDate || item.pubDate || null,
      summary: item.contentSnippet || item.content || "",
      category: item.categories?.[0] || null,
      imageUrl: item.enclosure?.url || null,
      contentHash,
    };
  });
}