// Determines edition (Morning/Evening) and fetches today's posts,
// grouped by category, for a dense homepage grid (not a fixed slot count).
import { supabasePublic } from "./supabasePublic";

export function getCurrentEdition(): "Morning" | "Evening" {
  const hour = new Date().getUTCHours();
  return hour < 12 ? "Morning" : "Evening";
}

export async function getFrontPageData() {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .order("published_at", { ascending: false });

  if (error) throw error;
  if (!posts || posts.length === 0) return null;

  // Group all of today's posts by category — however many exist per
  // category, no fixed count.
  const byCategory: Record<string, typeof posts> = {};
  for (const post of posts) {
    if (!byCategory[post.category]) byCategory[post.category] = [];
    byCategory[post.category].push(post);
  }

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return {
    edition: getCurrentEdition(),
    date,
    topStory: posts[0], // most recent post overall, shown large at the top
    byCategory, // e.g. { sports: [...], movies: [...], breaking: [...] }
  };
}

export async function getArticleWithNeighbors(id: string) {
  const { data: allPosts, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .order("published_at", { ascending: false });

  if (error) throw error;
  if (!allPosts) return null;

  const index = allPosts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  return {
    article: allPosts[index],
    previous: index > 0 ? allPosts[index - 1] : null,
    next: index < allPosts.length - 1 ? allPosts[index + 1] : null,
  };
}

// Fetches all "new" posts for a single category, for the category page.
export async function getCategoryPosts(category: string) {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return posts || [];
}

// Fetches up to 3 other posts in the same category, excluding the
// current article, for the "More in [Category]" sidebar.
export async function getRelatedPosts(category: string, excludeId: string) {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .eq("category", category)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) throw error;
  return posts || [];
}

// Front page needs more structure than a simple category grid: one
// dominant lead story, a short "brief" rail, a "more top stories" rail,
// plus the existing per-category desk sections.
export async function getGazetteFrontPage() {
  const { data: posts, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "new")
    .order("published_at", { ascending: false });

  if (error) throw error;
  if (!posts || posts.length === 0) return null;

  const byCategory: Record<string, typeof posts> = {};
  for (const post of posts) {
    if (!byCategory[post.category]) byCategory[post.category] = [];
    byCategory[post.category].push(post);
  }

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return {
    date,
    lead: posts[0],
    briefs: posts.slice(1, 6),
    moreTop: posts.slice(6, 9),
    ticker: posts.slice(0, 6),
    // ...inside getGazetteFrontPage, alongside the existing returns:
    acrossDesks: posts.slice(9, 13),
    latestHeadlines: posts.slice(0, 5),
    byCategory,
    
  };
}