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
  active: boolean;
};