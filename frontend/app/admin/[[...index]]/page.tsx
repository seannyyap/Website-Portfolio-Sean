import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Sanity Studio at /admin.
 * All routes under /admin are handled by this catch-all so the Studio can manage its own navigation.
 */
export default function AdminPage() {
  return <NextStudio config={config} />;
}
