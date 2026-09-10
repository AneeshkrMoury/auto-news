// Determines which edition (Morning/Evening) to show based on current
// time, and fetches today's "new" posts shaped for the front page +
// individual article pages.
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

  // Article pages start at page 2 (page 1 is the front page itself).
  const articles = posts.map((post, i) => ({ ...post, pageNumber: i + 2 }));

  const featuredPost = articles[0];
  const teaserPosts = articles.slice(1, 5);

  const featured = {
    title: featuredPost.title,
    snippet: featuredPost.body.split("\n\n")[0],
    imageUrl: featuredPost.image_url,
    category: featuredPost.category,
  };

  const teasers = teaserPosts.map((post) => ({
    title: post.title,
    imageUrl: post.image_url,
    pageNumber: post.pageNumber,
  }));

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return {
    edition: getCurrentEdition(),
    date,
    featured,
    teasers,
    articles, // full list, used to render each article's own page later
  };
}