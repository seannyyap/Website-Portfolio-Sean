"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github, ExternalLink, Bot, Sparkles, Database, Globe } from "lucide-react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

interface Project {
  _id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  iconName?: string
  image?: any
}

interface ProjectsProps {
  projects: Project[]
}

const ICON_MAP: Record<string, any> = {
  "Bot": Bot,
  "Sparkles": Sparkles,
  "Database": Database,
  "Globe": Globe,
}

const DEFAULT_COLOR = "from-primary/10 to-accent/10"

export function Projects({ projects = [] }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const displayProjects = projects

  return (
    <section id="projects" className="py-28 md:py-36 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Projects</span>
          <h2 className="fluid-heading font-medium mt-6 text-balance tracking-tight">
            Building Intelligent Solutions
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto fluid-subheading">
            A selection of projects that showcase my passion for AI and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {displayProjects.length === 0 ? (
            <div className="lg:col-span-2 rounded-3xl border border-border/40 bg-card/20 p-10 text-center text-muted-foreground">
              No projects yet. Add or sync projects in <span className="text-foreground font-medium">/admin</span>.
            </div>
          ) : null}
          {displayProjects.filter(p => p.featured).map((project: any, index) => {
            const Icon = ICON_MAP[project.iconName] || Bot
            const imageUrl = project.image ? urlForImage(project.image).width(800).url() : null

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${DEFAULT_COLOR} opacity-0 group-hover:opacity-60 transition-opacity duration-1000`} />
                <div className="relative p-10 rounded-[2.5rem] bg-card/40 border border-border/40 group-hover:border-primary/20 backdrop-blur-md transition-all duration-700 h-full flex flex-col">
                  
                  {/* Image Preview if available */}
                  {imageUrl && (
                    <div className="relative w-full h-56 mb-8 rounded-2xl overflow-hidden border border-border/30">
                      <Image 
                        src={imageUrl} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-5 mb-6">
                    <motion.div
                      animate={hoveredIndex === index ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-lg text-muted-foreground leading-loose mb-8">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags?.map((tag: string) => (
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
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {displayProjects.filter(p => !p.featured).map((project: any, index) => {
             const Icon = ICON_MAP[project.iconName] || Bot
             return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-3xl bg-card/20 border border-border/40 hover:border-primary/20 backdrop-blur-md transition-all duration-700"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-primary opacity-80" />
                </div>
                <h3 className="text-lg font-medium mb-3 text-foreground group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-loose line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-primary/70 hover:text-primary transition-colors duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          {/* Intentionally removed "View All" dummy link; can be re-added when a real page exists */}
        </motion.div>
      </div>
    </section>
  )
}
