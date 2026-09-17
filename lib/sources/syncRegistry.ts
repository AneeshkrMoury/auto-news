import { supabase } from "@/lib/supabase";
import { SOURCE_REGISTRY } from "./registry";

export async function syncSourceRegistry() {
  for (const source of SOURCE_REGISTRY) {
    await supabase.from("sources").upsert(
      {
        name: source.name,
        website_url: source.websiteUrl,
        feed_url: source.feedUrl,
        license_name: source.licenseName,
        license_url: source.licenseUrl,
        allows_commercial_use: source.allowsCommercialUse,
        allows_derivatives: source.allowsDerivatives,
        attribution_requirement: source.attributionRequirement,
        image_restrictions: source.imageRestrictions,
        republication_notes: source.republicationNotes,
        active: source.active,
      },
      { onConflict: "name" }
    );
  }
}