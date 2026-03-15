/**
 * Sanity schema types.
 * Export all document and object schemas for use in sanity.config.
 */
import { projectSchema } from "./project";
import { experienceSchema } from "./experience";

export const schemaTypes = [projectSchema, experienceSchema];
