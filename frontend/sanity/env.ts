/**
 * Sanity environment variables.
 * Used by sanity.config and client; ensure these are set in .env.local
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const useCdn = process.env.NODE_ENV === "production";

export const isConfigured = !!projectId;
