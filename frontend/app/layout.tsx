import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import type { Metadata, Viewport } from 'next'

const fontSans = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

const fontMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

function getSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return null
  try {
    return new URL(raw)
  } catch {
    return null
  }
}

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'Sean Yap | Full Stack Software Engineer',
  description: 'Full Stack Software Engineer specializing in backend systems, AI integration, and real-time applications. Based in Petaling Jaya, Malaysia.',
  keywords: ['Sean Yap', 'Software Engineer', 'AI Engineer', 'Full Stack Developer', 'Malaysia', 'Java', 'Spring Boot', 'Python', 'FastAPI'],
  authors: [{ name: 'Sean Yap' }],
  metadataBase: siteUrl ?? new URL('http://localhost:3000'),
  alternates: {
    canonical: siteUrl ? '/' : undefined,
  },
  openGraph: {
    title: 'Sean Yap | Full Stack Software Engineer',
    description: 'Full Stack Software Engineer specializing in backend systems, AI integration, and real-time applications.',
    url: siteUrl?.toString(),
    siteName: 'Sean Yap Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sean Yap | Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sean Yap | Full Stack Software Engineer',
    description: 'Full Stack Software Engineer specializing in backend systems, AI integration, and real-time applications.',
    creator: '@seannyyap',
    images: ['/twitter-image'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfaf5' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
}

import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { Noise } from "@/components/noise"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground relative">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Toaster position="top-center" richColors />
          <Noise />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
