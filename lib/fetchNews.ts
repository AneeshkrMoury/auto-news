import { fetchWithRetry } from "./fetchWithRetry";

export const MAX_ARTICLES_PER_CATEGORY = 5;

const CATEGORY_QUERIES: Record<string, string> = {
  sports: "sports",
  movies: "movies OR entertainment",
  breaking: "breaking news",
};

export async function fetchNews(category: string) {
  const query = CATEGORY_QUERIES[category];
  if (!query) throw new Error(`Unknown category: ${category}`);

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${MAX_ARTICLES_PER_CATEGORY}&apikey=${process.env.GNEWS_API_KEY}`;

  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`GNews request failed: ${res.status}`);

  const data = await res.json();
  return data.articles;
}