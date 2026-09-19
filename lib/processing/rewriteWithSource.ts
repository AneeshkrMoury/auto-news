// Rewrites a raw_article into an independent summary, using only the
// source's title+summary as material — never scraped full text.
import { fetchWithRetry } from "@/lib/fetchWithRetry";

export async function rewriteWithSource(article: {
  title: string;
  summary: string;
  sourceName: string;
}) {
  const prompt = `Write an original, independently-worded news summary based ONLY on the information below. Do not copy phrasing from the original — write it in your own words.

STRICT RULES:
- Only use facts, names, numbers, and details present in the material below.
- Do NOT invent quotes, statistics, names, or details not explicitly stated.
- If the material is thin, write a shorter but still accurate summary — do not pad with invented specifics.
- Remain neutral in tone. Do not add opinion or analysis.

Source: ${article.sourceName}
Title: ${article.title}
Summary: ${article.summary}

Respond ONLY as JSON, no markdown, no backticks:
{"title": "...", "body": "..."}`;

  const res = await fetchWithRetry("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });

  if (!res.ok) throw new Error(`Groq request failed: ${res.status}`);

  const data = await res.json();
  const raw = data.choices[0].message.content.trim();
  return JSON.parse(raw);
}