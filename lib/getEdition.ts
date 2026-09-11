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