import { supabase } from "@/lib/supabase";
import { rewriteWithSource } from "./rewriteWithSource";
import { validateClaims } from "./validateClaims";
import { generateImage } from "@/lib/generateImage";

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

    const imageBuffer = await generateImage(
      `Editorial illustration for a news article, no readable text, no logos: ${rewritten.title}`
    );

    const fileName = `${rawArticle.category}-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, { contentType: "image/png" });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

    const body = rewritten.body + `\n\n*This article was rewritten with AI assistance from ${source.name}. Please verify details independently.*`;

    const { error: insertError } = await supabase.from("posts").insert({
      title: rewritten.title,
      body,
      image_url: urlData.publicUrl,
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

    return { title: rawArticle.title, status: "published" };
  } catch (err) {
    return { title: rawArticle.title, status: "failed", error: String(err) };
  }
}