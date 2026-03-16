import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fontSans = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

const fontMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: 'Sean | Full Stack AI Engineer',
  description: 'Full Stack Software Engineer specializing in AI and building intelligent applications. Crafting the future through mindful code and elegant architectures.',
  keywords: ['Software Engineer', 'AI Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Python', 'Machine Learning'],
  authors: [{ name: 'Sean' }],
  openGraph: {
    title: 'Sean | Full Stack AI Engineer',
    description: 'Full Stack Software Engineer specializing in AI and building intelligent applications.',
    url: 'https://sean.dev',
    siteName: 'Sean Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sean | Full Stack AI Engineer',
    description: 'Full Stack Software Engineer specializing in AI and building intelligent applications.',
    creator: '@seany99',
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
