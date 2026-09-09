import { fetchWithRetry } from "./fetchWithRetry";

export const MAX_ARTICLES_PER_CATEGORY = 5;

const CATEGORY_QUERIES: Record<string, string> = {
  sports: "sports",
  movies: "movies OR entertainment",
  breaking: "breaking news",
};

export async function fetchNews(category: string, limit: number = MAX_ARTICLES_PER_CATEGORY) {
  if (process.env.MOCK_MODE === "true") {
    return [{
      title: `Mock ${category} article`,
      description: "This is a fake article for local testing.",
      content: "Fake content body for testing the pipeline without burning API quota.",
      url: `https://example.com/mock-${category}-${Date.now()}`,
    }];
  }

  const query = CATEGORY_QUERIES[category];
  if (!query) throw new Error(`Unknown category: ${category}`);

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${limit}&apikey=${process.env.GNEWS_API_KEY}`;

  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`GNews request failed: ${res.status}`);

  const data = await res.json();
  return data.articles;
}