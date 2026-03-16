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
  Smartphone,
  Server,
  Workflow,
  Search,
  Paintbrush
} from "lucide-react"

const technologies = [
  { name: "React", category: "Frontend", icon: Layout },
  { name: "Next.js", category: "Framework", icon: Zap },
  { name: "TypeScript", category: "Language", icon: FileCode },
  { name: "Python", category: "Language", icon: Code2 },
  { name: "Node.js", category: "Runtime", icon: Terminal },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "MongoDB", category: "Database", icon: Database },
  { name: "OpenAI", category: "AI", icon: Cpu },
  { name: "LangChain", category: "AI", icon: Workflow },
  { name: "TensorFlow", category: "ML", icon: Cpu },
  { name: "Docker", category: "DevOps", icon: Box },
  { name: "AWS", category: "Cloud", icon: Cloud },
  { name: "Vercel", category: "Platform", icon: Cloud },
  { name: "Redis", category: "Cache", icon: Zap },
  { name: "GraphQL", category: "API", icon: Search },
  { name: "Tailwind", category: "CSS", icon: Paintbrush },
]

// Pre-defined reversed array to avoid hydration mismatch
const technologiesReversed = [...technologies].reverse()

export function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 px-8 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Tools of the Trade</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-balance">
            My Toolkit
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
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/50 transition-all shrink-0 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <tech.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{tech.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {tech.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second row - reverse direction */}
          <div className="flex gap-4 overflow-hidden mt-4">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: [-1920, 0] }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...technologiesReversed, ...technologiesReversed].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-rev-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors shrink-0"
                >
                  <span className="text-foreground font-medium">{tech.name}</span>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary/50 rounded-full">
                    {tech.category}
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
