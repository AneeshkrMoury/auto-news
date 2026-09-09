import { supabase } from "./supabase";

export async function updateLifecycle() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data: toHighlight, error: highlightError } = await supabase
    .from("posts")
    .update({ status: "highlight" })
    .eq("status", "new")
    .lt("published_at", sevenDaysAgo)
    .select("id");

  if (highlightError) throw highlightError;

  const { data: toDelete, error: deleteError } = await supabase
    .from("posts")
    .update({ status: "deleted" })
    .neq("status", "deleted")
    .lt("published_at", thirtyDaysAgo)
    .select("id");

  if (deleteError) throw deleteError;

  return {
    movedToHighlight: toHighlight?.length ?? 0,
    markedDeleted: toDelete?.length ?? 0,
  };
}