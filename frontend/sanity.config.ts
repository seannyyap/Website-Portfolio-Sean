"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio CMS",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
