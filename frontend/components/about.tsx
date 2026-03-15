"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Code2, Cpu, Sparkles } from "lucide-react"

const skills = [
  { 
    name: "React / Next.js", 
    tag: "Core Expert", 
    description: "Architecting high-performance web apps with App Router & Server Components.",
    color: "bg-primary/10"
  },
  { 
    name: "TypeScript", 
    tag: "Daily Practice", 
    description: "Writing type-safe, maintainable codebases that scale with complex requirements.",
    color: "bg-accent/10"
  },
  { 
    name: "AI / Python", 
    tag: "Active Focus", 
    description: "Integrating LLMs, LangChain, and FastAPI for intelligent system logic.",
    color: "bg-secondary/20"
  },
  { 
    name: "Node.js", 
    tag: "Reliable Flows", 
    description: "Building efficient, scalable backend architectures and real-time APIs.",
    color: "bg-primary/5"
  },
  { 
    name: "Architecture", 
    tag: "Mindful Design", 
    description: "Designing modular, clean systems following SOLID and Clean Architecture.",
    color: "bg-accent/5"
  },
  { 
    name: "Databases", 
    tag: "Data Harmony", 
    description: "Optimizing PostgreSQL and MongoDB for speed, reliability, and scale.",
    color: "bg-secondary/10"
  },
]

const highlights = [
  {
    title: "AI First Approach",
    description: "Building applications with intelligence at the core, not as an afterthought.",
    icon: Brain,
  },
  {
    title: "Clean Architecture",
    description: "Scalable, maintainable codebases that follow industry best practices.",
    icon: Code2,
  },
  {
    title: "Performance Expert",
    description: "Optimized delivery for lightning-fast user experiences and SEO.",
    icon: Cpu,
  },
  {
    title: "Modern Stack",
    description: "Leveraging the latest features in React, Next.js, and TypeScript.",
    icon: Sparkles,
  },
]

import { ZenSand } from "./zen-sand"
import { SpotlightCard } from "./ui/spotlight-card"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden group">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Interactive Zen Sand Canvas */}
      <ZenSand />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:pl-8"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest opacity-80">About Me</span>
          <h2 className="text-3xl md:text-5xl font-light mt-6 text-balance tracking-tight">
            Where Code Meets Creativity
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio & Zen Bento Garden */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="prose prose-invert max-w-none md:pl-8">
                <p className="text-lg text-muted-foreground/80 leading-loose mb-8 font-light">
                  I&apos;m a full-stack software engineer with a deep passion for artificial intelligence 
                  and its potential to transform how we interact with technology. My journey in tech 
                  has been driven by a simple belief: the best software anticipates needs and adapts 
                  intelligently.
                </p>
                <p className="text-lg text-muted-foreground/80 leading-loose font-light">
                  From building AI-powered applications that understand natural language to creating 
                  systems that learn and evolve, I thrive at the intersection of elegant code and 
                  intelligent architecture.
                </p>
              </div>
            </motion.div>

            <div className="space-y-8 md:pl-8">
              <h3 className="text-xl font-medium flex items-center gap-3 text-foreground/80">
                <Sparkles className="w-5 h-5 text-primary opacity-70" />
                Technical Palette
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <SpotlightCard
                    key={skill.name}
                    className={`p-8 ${skill.color}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 1.0, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-foreground transition-colors relative z-10">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-primary relative z-10">
                          {skill.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-loose relative z-10">
                        {skill.description}
                      </p>
                    </motion.div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 lg:pt-0">
            {highlights.map((highlight, index) => (
              <SpotlightCard
                key={highlight.title}
                className="p-8 bg-card"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors relative z-10">
                    <highlight.icon className="w-5 h-5 text-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 relative z-10 text-foreground">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-loose relative z-10">
                    {highlight.description}
                  </p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
