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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteUrl ? new URL('/sitemap.xml', siteUrl).toString() : undefined,
  }
}

