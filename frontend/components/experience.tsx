"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const experiences = [
  {
    period: "2023 — Present",
    title: "Senior Full Stack Engineer",
    company: "AI Startup",
    description: "Leading development of AI-powered products, building scalable infrastructure for ML workloads, and architecting RAG systems for enterprise clients.",
    technologies: ["Next.js", "Python", "LangChain", "AWS"],
  },
  {
    period: "2021 — 2023",
    title: "Full Stack Developer",
    company: "Tech Company",
    description: "Built and maintained multiple web applications, implemented CI/CD pipelines, and led migration to microservices architecture.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    period: "2019 — 2021",
    title: "Software Engineer",
    company: "Digital Agency",
    description: "Developed custom solutions for clients across various industries, focusing on performance optimization and user experience.",
    technologies: ["JavaScript", "Python", "MongoDB", "Redis"],
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-card/30" />
      
      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={`relative pl-8 md:pl-0 pb-12 last:pb-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.15 }}
                className={`absolute top-0 w-4 h-4 rounded-full bg-primary border-4 border-background ${
                  index % 2 === 0 
                    ? "left-0 md:left-auto md:right-0 md:translate-x-1/2" 
                    : "left-0 md:-translate-x-1/2"
                } -translate-x-1/2`}
              />

              {/* Content */}
              <div className="group">
                <span className="text-sm font-mono text-primary">{exp.period}</span>
                <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {exp.description}
                </p>
                <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
