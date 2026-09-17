// The source registry: every source's license terms recorded here,
// so ingestion can check permissions before processing anything.
// Add new sources here — nothing else in the pipeline needs editing.
import { Source } from "./types";

export const SOURCE_REGISTRY: Source[] = [
  {
    name: "Global Voices",
    websiteUrl: "https://globalvoices.org",
    feedUrl: "https://globalvoices.org/feed/",
    licenseName: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    allowsCommercialUse: true,
    allowsDerivatives: true,
    attributionRequirement: "Credit Global Voices with a link back to the original article.",
    imageRestrictions: "Images may be separately licensed by third-party photographers — verify per-image before reuse, do not assume CC BY applies to images.",
    republicationNotes: "See Global Voices Attribution Policy: https://globalvoices.org/about/global-voices-attribution-policy/",
    active: true,
  },
];