import type { MetadataRoute } from 'next'

function getSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return null
  try {
    return new URL(raw)
  } catch {
    return null
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  // Keep this minimal and stable. Add more URLs as you add real routes.
  const base = siteUrl?.toString().replace(/\/$/, '')
  const home = base ? `${base}/` : '/'

  return [
    {
      url: home,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

