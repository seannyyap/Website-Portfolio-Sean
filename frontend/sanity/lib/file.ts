import { getFileAsset } from "@sanity/asset-utils"
import { dataset, projectId } from "../env"

export type SanityFileValue = {
  _type?: "file"
  asset?: { _ref?: string; _type?: "reference" } | { _id?: string; url?: string }
}

export function urlForFile(source: SanityFileValue | null | undefined): string | null {
  if (!source) return null

  try {
    const asset = getFileAsset(source as any, {
      projectId: projectId || "",
      dataset: dataset || "",
    })
    return asset?.url ?? null
  } catch {
    return null
  }
}

