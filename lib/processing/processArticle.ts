import { supabase } from "@/lib/supabase";
import { rewriteWithSource } from "./rewriteWithSource";
import { validateClaims } from "./validateClaims";
import { searchEditorialImage } from "@/lib/images/getEditorialImage";

export async function processRawArticle(rawArticle: any, source: any) {
  try {
    const rewritten = await rewriteWithSource({
      title: rawArticle.title,
      summary: rawArticle.summary || "",
      sourceName: source.name,
    });

    const sourceText = `${rawArticle.title} ${rawArticle.summary || ""}`;
    const validation = validateClaims(rewritten.body, sourceText);

    if (!validation.passed) {
      await supabase
        .from("raw_articles")
        .update({
          review_status: "REJECTED",
          review_note: `Unverified claims: ${validation.unverified.join(", ")}`,
        })
        .eq("id", rawArticle.id);

      return { title: rawArticle.title, status: "rejected", reason: validation.unverified };
    }

    // Tier 1: real, relevance-checked photo via Openverse
    const editorialImage = await searchEditorialImage(rewritten.title, rawArticle.category);
    // Tier 2 (curated category pool) not built yet — falls through to Tier 3 for now.
    // Tier 3: Daymark logo, has_real_image stays false, excluded from prominent slots.
    const imageUrl = editorialImage?.url || "/daymark-logo.png";
    const hasRealImage = !!editorialImage;
    const imageAttribution = editorialImage?.attribution || null;

    const body = rewritten.body + `\n\n*This article was rewritten with AI assistance from ${source.name}. Please verify details independently.*`;

    const { error: insertError } = await supabase.from("posts").insert({
      title: rewritten.title,
      body,
      image_url: imageUrl,
      has_real_image: hasRealImage,
      image_attribution: imageAttribution,
      category: rawArticle.category,
      source_url: rawArticle.original_url,
      source_name: source.name,
      license_name: source.license_name,
      license_url: source.license_url,
      status: "staged",
    });

    if (insertError) throw insertError;

    await supabase
      .from("raw_articles")
      .update({ review_status: "PUBLISHED" })
      .eq("id", rawArticle.id);

    return { title: rawArticle.title, status: "published", hasRealImage };
  } catch (err) {
    return { title: rawArticle.title, status: "failed", error: String(err) };
  }
}