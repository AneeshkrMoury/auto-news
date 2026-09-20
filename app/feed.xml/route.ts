// RSS feed of the 20 most recent published articles.
import { supabasePublic } from "@/lib/supabasePublic";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const { data: posts } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .order("published_at", { ascending: false })
    .limit(20);

  const items = (posts || [])
    .map((post) => {
      const snippet = post.body.split("\n\n")[0];
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://daymark.vercel.app/article/${post.id}</link>
      <guid>https://daymark.vercel.app/article/${post.id}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(snippet)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Daymark</title>
    <link>https://daymark.vercel.app</link>
    <description>AI-assisted daily news — sports, movies, breaking, world, science, technology.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

