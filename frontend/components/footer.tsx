"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-foreground tracking-tighter"
            >
              sean<span className="text-primary">.dev</span>
            </motion.a>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed font-medium">
              Building intelligent digital experiences at the intersection of AI and mindful code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/70 font-bold">Navigation</span>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {["About", "Projects", "Experience", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/70 font-bold">Social</span>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {[
                  { name: "GitHub", href: "https://github.com/seany99" },
                  { name: "LinkedIn", href: "#" },
                  { name: "Twitter", href: "#" },
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium italic opacity-70">
            © {new Date().getFullYear()} Sean. Built with <Heart className="w-3 h-3 text-accent fill-accent" /> and Next.js.
          </p>
          
          <motion.a
            href="#"
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
