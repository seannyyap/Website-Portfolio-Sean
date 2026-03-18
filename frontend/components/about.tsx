"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Code2, Cpu, Sparkles, Layout, FileCode, Terminal, Layers, Database, Server } from "lucide-react"

const skills = [
  { 
    name: "Java / Spring Boot", 
    tag: "Enterprise Core", 
    description: "Developing scalable backend services and complex database migrations with Oracle.",
    color: "bg-primary/5",
    borderColor: "border-primary/20",
    icon: Server
  },
  { 
    name: "TypeScript / React", 
    tag: "Modern Frontend", 
    description: "Building responsive interfaces with Next.js, Angular, and type-safe systems.",
    color: "bg-accent/5",
    borderColor: "border-accent/20",
    icon: Layout
  },
  { 
    name: "AI / Python", 
    tag: "Intelligence", 
    description: "Integrating LLMs (Llama 3, Qwen2.5) with FastAPI and Whisper for STT apps.",
    color: "bg-secondary/10",
    borderColor: "border-secondary/30",
    icon: Cpu
  },
  { 
    name: "Node.js / MQTT", 
    tag: "Real-Time", 
    description: "Architecting low-latency systems for device tracking and real-time communication.",
    color: "bg-primary/5",
    borderColor: "border-primary/10",
    icon: Terminal
  },
  { 
    name: "Databases", 
    tag: "Data Harmony", 
    description: "Optimizing PostgreSQL, MongoDB, and Oracle for performance and reliability.",
    color: "bg-accent/5",
    borderColor: "border-accent/10",
    icon: Database
  },
  { 
    name: "DevOps / Cloud", 
    tag: "Scale", 
    description: "Deploying resilient applications using Docker, AWS, and modern CI/CD pipelines.",
    color: "bg-secondary/10",
    borderColor: "border-secondary/20",
    icon: Layers
  },
]

const highlights = [
  {
    title: "AI Integration",
    description: "Building conversational AI tools with real-time speech-to-text capabilities.",
    icon: Brain,
  },
  {
    title: "Real-Time Systems",
    description: "Experience with WebSockets, MQTT, and low-latency data streaming.",
    icon: Code2,
  },
  {
    title: "Published Researcher",
    description: "Contributor to Springer publications in distributed data and systems.",
    icon: Cpu,
  },
  {
    title: "Monash Alumnus",
    description: "Software Engineering (Hons) graduate with a focus on system reliability.",
    icon: Sparkles,
  },
]

import { ZenSand } from "./zen-sand"
import { SpotlightCard } from "./ui/spotlight-card"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
          <span className="text-primary text-sm font-mono uppercase tracking-widest opacity-80">About Me</span>
          <h2 className="fluid-heading font-light mt-6 text-balance tracking-tight">
            Where Code Meets Curiosity
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
                <p className="text-lg text-muted-foreground/80 leading-loose mb-8 font-light">
                  I&apos;m a Full Stack Software Engineer based in Petaling Jaya, Malaysia. 
                  My journey in tech is fueled by a relentless curiosity and the simple belief 
                  that the best software is built by people who aren't afraid to "build random stuff 
                  and see what happens."
                </p>
                <p className="text-lg text-muted-foreground/80 leading-loose font-light">
                  Whether it's optimizing enterprise-grade backend services with Spring Boot or 
                  integrating Llama 3 into a real-time interview simulator, I thrive on the challenge 
                  of building intelligent systems that are both robust and impactful.
                </p>
          </div>
        </motion.div>

        {/* Skills grid — symmetric 3-column */}
        <div className="mb-20">
          <h3 className="text-xl font-medium flex items-center justify-center gap-3 text-foreground/80 mb-10">
            <Sparkles className="w-5 h-5 text-primary opacity-70" />
            Technical Palette
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <SpotlightCard
                    key={skill.name}
                    className={`p-8 ${skill.color} border ${skill.borderColor}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 1.0, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full relative z-10"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center text-primary shadow-sm border border-border/20">
                           <skill.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 font-bold">
                          {skill.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground mb-3 text-lg tracking-tight">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-loose font-medium opacity-80">
                        {skill.description}
                      </p>
                    </motion.div>
                  </SpotlightCard>
                ))}
          </div>
        </div>

        {/* Highlights grid — symmetric 4-column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  )
}
