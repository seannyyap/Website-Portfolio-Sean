"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Link from "next/link"
import { ExternalLink } from "@/components/ui/external-link"

type SiteSettings = any

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Footer({ site }: { site: SiteSettings | null }) {
  const brandName = site?.brandName?.trim() || "Sean"
  const brandAccent = site?.brandAccent?.trim() || ".dev"
  const socialLinks = site?.footer?.socialLinks ?? []

  return (
    <footer className="py-16 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-foreground tracking-tighter"
            >
              <Link href="/">
                {brandName}
                <span className="text-primary">{brandAccent}</span>
              </Link>
            </motion.div>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed font-medium">
              Building calm, high-impact products with care and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/70 font-bold">Navigation</span>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/70 font-bold">Social</span>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {socialLinks.map((item: any, idx: number) => (
                  <li key={item?.label ?? idx}>
                    <ExternalLink href={item?.url} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {item?.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium italic opacity-70">
            © {new Date().getFullYear()} Sean Yap. Built with <Heart className="w-3 h-3 text-accent fill-accent" /> and Next.js.
          </p>
          
          <motion.a
            href="#main-content"
            whileHover={{ y: -2 }}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest"
          >
            Back to Top ↑
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
