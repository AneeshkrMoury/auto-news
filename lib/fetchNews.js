const CATEGORY_QUERIES = {
  sports: "sports",
  movies: "movies OR entertainment",
  breaking: "breaking news",
};

export async function fetchNews(category) {
  const query = CATEGORY_QUERIES[category];
  if (!query) throw new Error(`Unknown category: ${category}`);

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GNews request failed: ${res.status}`);

  const data = await res.json();
  return data.articles; // each has title, description, content, url, image, publishedAt
}