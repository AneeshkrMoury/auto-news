// Searches Openverse for a real, properly-licensed photo. Tries the
// specific article headline first (most precise when it hits); if
// nothing relevant comes back, falls through to a broader, generic
// category-level search before giving up entirely.
const PREFERRED_SOURCES = ["wikimedia", "nasa", "smithsonian"];

const CATEGORY_FALLBACK_TERMS: Record<string, string> = {
  sports: "athletes sports competition",
  movies: "film cinema screening",
  breaking: "news event crowd",
  world: "world news politics international",
  science: "scientific research laboratory",
  technology: "computer technology software",
};

function isRelevant(query: string, result: any): boolean {
  const queryWords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const tags = (result.tags || []).map((t: any) => t.name).join(" ");
  const resultText = `${result.title} ${tags}`.toLowerCase();
  return queryWords.some((word) => resultText.includes(word));
}

async function searchOpenverse(query: string) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license_type=commercial&page_size=20`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Daymark News (editorial image search)" },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const results = (data.results || []).filter((r: any) => isRelevant(query, r));
    if (results.length === 0) return null;

    const preferred = results.find((r: any) => PREFERRED_SOURCES.includes(r.source));
    const pick = preferred || results[0];

    return {
      url: pick.url,
      attribution: `Photo: ${pick.creator || pick.source} via Openverse (${pick.license.toUpperCase()})`,
      license: pick.license,
      sourceUrl: pick.foreign_landing_url,
    };
  } catch {
    return null;
  }
}

export async function searchEditorialImage(headline: string, category: string) {
  // Attempt 1: the specific article headline
  const specific = await searchOpenverse(headline);
  if (specific) return specific;

  // Attempt 2: a broader, generic term for the category
  const fallbackTerm = CATEGORY_FALLBACK_TERMS[category];
  if (fallbackTerm) {
    const generic = await searchOpenverse(fallbackTerm);
    if (generic) return generic;
  }

  return null; // caller falls through to the logo
}