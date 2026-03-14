"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github, ExternalLink, Bot, Sparkles, Database, Globe } from "lucide-react"

const projects = [
  {
    title: "AI Chat Platform",
    description: "A sophisticated conversational AI platform with multi-model support, real-time streaming, and context-aware responses. Built with RAG architecture for enhanced knowledge retrieval.",
    tags: ["Next.js", "OpenAI", "LangChain", "Vector DB"],
    icon: Bot,
    color: "from-primary/10 to-accent/10",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Neural Code Assistant",
    description: "An intelligent code completion and review tool that understands context, suggests improvements, and explains complex code patterns using fine-tuned models.",
    tags: ["Python", "Transformers", "FastAPI", "React"],
    icon: Sparkles,
    color: "from-accent/10 to-primary/10",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Data Intelligence Hub",
    description: "A comprehensive analytics platform that transforms raw data into actionable insights using AI-powered visualization and natural language queries.",
    tags: ["TypeScript", "PostgreSQL", "AI SDK", "D3.js"],
    icon: Database,
    color: "from-primary/15 to-secondary/30",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Smart Content Generator",
    description: "Multi-modal content generation platform supporting text, images, and structured data with brand voice adaptation and SEO optimization.",
    tags: ["Next.js", "Stable Diffusion", "GPT-4", "AWS"],
    icon: Globe,
    color: "from-accent/15 to-secondary/30",
    github: "#",
    live: "#",
    featured: false,
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Building Intelligent Solutions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase my passion for AI and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-8 rounded-3xl bg-card border border-border group-hover:border-primary/30 transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div
                  animate={hoveredIndex === index ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                >
                  <project.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                    <ArrowUpRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <project.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-3">
                <a href={project.github} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={project.live} className="text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full hover:border-primary/50 hover:text-primary transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
