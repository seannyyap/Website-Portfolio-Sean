"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Code2, Cpu, Sparkles, Layout, Terminal, Layers, Database, Server } from "lucide-react"

import { ZenSand } from "./zen-sand"
import { SpotlightCard } from "./ui/spotlight-card"

type SiteSettings = any

const ICONS: Record<string, any> = {
  Brain,
  Code2,
  Cpu,
  Sparkles,
  Layout,
  Terminal,
  Layers,
  Database,
  Server,
}

const CARD_STYLES = [
  { color: "bg-primary/5", borderColor: "border-primary/20" },
  { color: "bg-accent/5", borderColor: "border-accent/20" },
  { color: "bg-secondary/10", borderColor: "border-secondary/30" },
]

export function About({ site }: { site: SiteSettings | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const about = site?.about
  const skills = Array.isArray(about?.skills) ? about.skills : []
  const highlights = Array.isArray(about?.highlights) ? about.highlights : []
  const bio = Array.isArray(about?.bio) ? about.bio : []

  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden group">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Interactive Zen Sand Canvas */}
      <ZenSand />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest opacity-80">
            About Me
          </span>
          <h2 className="fluid-heading font-light mt-6 text-balance tracking-tight">
            The Person Behind the Code
          </h2>
        </motion.div>

        {/* Bio text — full width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="prose prose-invert max-w-none text-center">
            {bio.length === 0 ? (
              <p className="text-lg text-muted-foreground/80 leading-loose font-light">
                Add your About content in <span className="text-foreground font-medium">/admin</span>.
              </p>
            ) : (
              bio.map((p: string, idx: number) => (
                <p
                  key={idx}
                  className={`text-lg text-muted-foreground/80 leading-loose font-light ${idx === 0 ? "mb-8" : ""}`}
                >
                  {p}
                </p>
              ))
            )}
          </div>
        </motion.div>

        {/* Skills grid — symmetric 3-column */}
        <div className="mb-20">
          <h3 className="text-xl font-medium flex items-center justify-center gap-3 text-foreground/80 mb-10">
            <Sparkles className="w-5 h-5 text-primary opacity-70" />
            Technical Palette
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill: any, index: number) => {
                  const Icon = ICONS[skill?.iconName] ?? Sparkles
                  const style = CARD_STYLES[index % CARD_STYLES.length]
                  return (
                  <SpotlightCard
                    key={skill.name ?? index}
                    className={`p-8 ${style.color} border ${style.borderColor}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 1.0, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full relative z-10"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center text-primary shadow-sm border border-border/20">
                           <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 font-bold">
                          {skill.tag ?? ""}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground mb-3 text-lg tracking-tight">
                        {skill.name ?? ""}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-loose font-medium opacity-80">
                        {skill.description ?? ""}
                      </p>
                    </motion.div>
                  </SpotlightCard>
                )})}
          </div>
        </div>

        {/* Highlights grid — symmetric 4-column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight: any, index: number) => {
              const Icon = ICONS[highlight?.iconName] ?? Sparkles
              return (
              <SpotlightCard
                key={highlight.title ?? index}
                className="p-8 bg-card"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors relative z-10">
                    <Icon className="w-5 h-5 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 relative z-10 text-foreground">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-loose relative z-10">
                    {highlight.description}
                  </p>
                </motion.div>
              </SpotlightCard>
            )})}
        </div>
      </div>
    </section>
  )
}
