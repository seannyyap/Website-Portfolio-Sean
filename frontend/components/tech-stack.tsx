"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

import { 
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  Cpu, 
  Cloud, 
  Globe, 
  Zap,
  Box,
  Layout,
  FileCode,
  Workflow,
  Search,
  Paintbrush
} from "lucide-react"

type SiteSettings = any

const ICONS: Record<string, any> = {
  Code2,
  Layers,
  Terminal,
  Database,
  Cpu,
  Cloud,
  Globe,
  Zap,
  Box,
  Layout,
  FileCode,
  Workflow,
  Search,
  Paintbrush,
}

export function TechStack({ site }: { site: SiteSettings | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const tech = site?.techStack
  const technologies = Array.isArray(tech?.technologies) ? tech.technologies : []
  const technologiesReversed = [...technologies].reverse()

  return (
    <section className="py-28 md:py-36 overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">
            {tech?.kicker ?? ""}
          </span>
          <h2 className="fluid-heading font-bold mt-4 text-balance">
            {tech?.headline ?? ""}
          </h2>
        </motion.div>

        {/* Infinite scroll animation */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex gap-4 overflow-hidden">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {technologies.length === 0 ? (
                <div className="rounded-2xl border border-border/40 bg-card/20 px-6 py-4 text-muted-foreground">
                  Add Tech Stack items in <span className="text-foreground font-medium">/admin</span>.
                </div>
              ) : null}
              {[...technologies, ...technologies].map((techItem: any, index) => {
                const Icon = ICONS[techItem?.iconName] ?? Zap
                return (
                <motion.div
                  key={`${techItem.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/50 transition-all shrink-0 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{techItem.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {techItem.category}
                    </span>
                  </div>
                </motion.div>
              )})}
            </motion.div>
          </div>

          {/* Second row - reverse direction */}
          <div className="flex gap-4 overflow-hidden mt-4">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...technologiesReversed, ...technologiesReversed].map((techItem: any, index) => (
                <motion.div
                  key={`${techItem.name}-rev-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors shrink-0"
                >
                  <span className="text-foreground font-medium">{techItem.name}</span>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary/50 rounded-full">
                    {techItem.category}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
