// Shared types for the source registry and ingestion pipeline.
export type Source = {
  name: string;
  websiteUrl: string;
  feedUrl: string;
  licenseName: string;
  licenseUrl: string;
  allowsCommercialUse: boolean;
  allowsDerivatives: boolean;
  attributionRequirement: string;
  imageRestrictions: string;
  republicationNotes: string;
  defaultCategory: string;
  active: boolean;
  // Optional: for a feed that mixes many categories (e.g. a general
  // government press feed), decide the output category from an item's raw
  // <category> tags, or return null to skip the item entirely. Sources
  // without this always use defaultCategory for every item — unchanged.
  categoryFilter?: (categories: string[]) => string | null;
};