import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";

/**
 * Sanity client for GROQ queries (Phase 2).
 * Use in server components or API routes via sanityFetch or getClient().
 */
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;
