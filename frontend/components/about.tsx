"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Code2, Cpu, Sparkles } from "lucide-react"

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Python / FastAPI", level: 88 },
  { name: "AI/ML Integration", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "PostgreSQL / MongoDB", level: 82 },
]

const highlights = [
  {
    icon: Brain,
    title: "AI-First Mindset",
    description: "Crafting intelligent applications with thoughtful AI integration and human-centered design.",
  },
  {
    icon: Code2,
    title: "Full Stack Harmony",
    description: "Bringing balance to front-end elegance and back-end reliability.",
  },
  {
    icon: Cpu,
    title: "Mindful Architecture",
    description: "Designing systems that are both powerful and sustainable.",
  },
  {
    icon: Sparkles,
    title: "Continuous Growth",
    description: "Embracing learning and exploring new frontiers in technology.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Where Code Meets Creativity
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I&apos;m a full-stack software engineer with a deep passion for artificial intelligence 
                and its potential to transform how we interact with technology. My journey in tech 
                has been driven by a simple belief: the best software anticipates needs and adapts 
                intelligently.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From building AI-powered applications that understand natural language to creating 
                systems that learn and evolve, I thrive at the intersection of elegant code and 
                intelligent design. Every project is an opportunity to push boundaries and create 
                something meaningful.
              </p>
            </div>

            {/* Skills with animated progress bars */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
