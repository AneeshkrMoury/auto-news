// Bundles all currently "staged" (processed, validated, not-yet-visible)
// posts into a new discrete edition, then flips them live all at once.
// This is the "publish" moment — content sits invisible until this runs.
import { supabase } from "@/lib/supabase";

export async function generateEdition(editionType: "morning" | "evening") {
  const { data: stagedPosts } = await supabase
    .from("posts")
    .select("id")
    .eq("status", "staged");

  if (!stagedPosts || stagedPosts.length === 0) {
    return { status: "skipped", reason: "No staged posts to publish" };
  }

  const { data: edition, error: editionError } = await supabase
    .from("editions")
    .insert({
      edition_type: editionType,
      edition_date: new Date().toISOString().split("T")[0],
    })
    .select()
    .single();

  if (editionError) throw editionError;

  const postIds = stagedPosts.map((p) => p.id);
  const { error: updateError } = await supabase
    .from("posts")
    .update({ status: "new", edition_id: edition.id })
    .in("id", postIds);

  if (updateError) throw updateError;

  return { status: "published", editionType, storyCount: postIds.length, editionId: edition.id };
}