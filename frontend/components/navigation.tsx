"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

import { MagneticButton } from "./ui/magnetic-button"
import { ThemeToggle } from "./theme-toggle"
import { urlForFile } from "@/sanity/lib/file"

type SiteSettings = any

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export function Navigation({ site }: { site: SiteSettings | null }) {
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const resumeUrl = urlForFile(site?.resume?.file)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
      setMobileMenuOpen(false)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => n.href.replace(/^#/, "")).filter(Boolean)
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-card/40 backdrop-blur-lg border border-border/40 transition-all duration-500">
          <motion.a
            href="#main-content"
            whileHover={{ scale: 1.02 }}
            className="text-xl font-medium text-foreground tracking-tight"
          >
            Sean<span className="text-primary">.dev</span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.05 }}
                    className={`relative px-4 py-2 text-sm transition-colors group ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                    }`} />
                  </motion.a>
                </li>
              )
            })}
            {resumeUrl ? (
              <li>
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="relative px-4 py-2 text-sm transition-colors group text-muted-foreground hover:text-foreground"
                >
                  Resume
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-1/2" />
                </motion.a>
              </li>
            ) : null}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton className="hidden md:block">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors block"
              >
                Say Hello
              </motion.a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0, 
            height: mobileMenuOpen ? "auto" : 0 
          }}
          className="md:hidden mt-2 mx-auto max-w-6xl overflow-hidden"
        >
          <div className="px-6 py-4 rounded-2xl bg-card/95 backdrop-blur-lg border border-border">
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {resumeUrl ? (
                <li>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    Resume
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 mt-2 bg-primary text-primary-foreground text-center font-medium rounded-lg"
                >
                  Say Hello
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
