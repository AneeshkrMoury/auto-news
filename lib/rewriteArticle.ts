import { fetchWithRetry } from "./fetchWithRetry";

export async function rewriteArticle(article: {
  title: string;
  description: string;
  content: string;
}) {
const prompt = `Rewrite this news article in your own words, clear and engaging.
STRICT RULES:
- Only use facts, quotes, and details present in the original text below.
- Do NOT invent quotes, numbers, names, or details not explicitly stated.
- If the original is incomplete or vague on a detail, stay vague too — do not fill gaps with plausible-sounding content.

Original title: ${article.title}
Original content: ${article.description}\n${article.content}

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
      temperature: 0.5,
    }),
  });

  if (!res.ok) throw new Error(`Groq request failed: ${res.status}`);

  const data = await res.json();
  const raw = data.choices[0].message.content.trim();
  const parsed = JSON.parse(raw);

  return {
    title: parsed.title,
    body: parsed.body + "\n\n*This article was rewritten with AI assistance. Please verify details independently.*",
  };
}