"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

interface Milestone {
  _id: string
  year?: string
  period?: string
  title: string
  description: string
  tags?: string[]
  technologies?: string[]
}

interface ExperienceProps {
  milestones: Milestone[]
}

const defaultMilestones = [
  {
    _id: "default-1",
    year: "Year 1",
    title: "The 'Hello World' Epoch",
    description: "Wrote my first line of code. Felt like a wizard. Promptly spent 4 hours trying to center a div.",
    tags: ["HTML/CSS", "Humility", "StackOverflow"],
  },
  {
    _id: "default-2",
    year: "Year 2",
    title: "The Framework Awakening",
    description: "Discovered React. Realized I didn't have to manipulate the DOM manually anymore. Wept tears of joy.",
    tags: ["React", "State Management", "Epiphanies"],
  },
  {
    _id: "default-3",
    year: "Year 3",
    title: "The Setup Tragedy",
    description: "Deleted a development database. Learned the difference between `DELETE FROM users` and `DELETE FROM users WHERE id = 1` the hard way.",
    tags: ["SQL", "Panic", "Valuable Lessons"],
  },
  {
    _id: "default-4",
    year: "Year 4",
    title: "The Docker Enlightenment",
    description: "Finally understood containerization. 'It works on my machine' ceased to be an excuse. Started deploying real apps.",
    tags: ["Docker", "DevOps", "CI/CD"],
  },
  {
    _id: "default-5",
    year: "Present",
    title: "The Builder's Zenith",
    description: "Building resilient, AI-driven architectures. Still Googling how to exit Vim, but now I do it in the cloud.",
    tags: ["Next.js Router", "AI Systems", "Perspective"],
  },
]

export function Experience({ milestones = [] }: ExperienceProps) {
  const containerRef = useRef(null)
  const displayMilestones = milestones.length > 0 ? milestones : defaultMilestones

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  })

  // Desktop Path and Card Mappings
  const trunkProgress = useTransform(smoothProgress, [0, 1], [0, 1])
  const trunkOpacity = useTransform(smoothProgress, [0, 0.01], [0, 1])
  
  const b0Progress = useTransform(smoothProgress, [0.05, 0.2], [0, 1])
  const b0Opacity = useTransform(smoothProgress, [0.05, 0.06], [0, 1])

  const b1Progress = useTransform(smoothProgress, [0.25, 0.4], [0, 1])
  const b1Opacity = useTransform(smoothProgress, [0.25, 0.26], [0, 1])

  const b2Progress = useTransform(smoothProgress, [0.45, 0.6], [0, 1])
  const b2Opacity = useTransform(smoothProgress, [0.45, 0.46], [0, 1])

  const b3Progress = useTransform(smoothProgress, [0.65, 0.8], [0, 1])
  const b3Opacity = useTransform(smoothProgress, [0.65, 0.66], [0, 1])

  const b4Progress = useTransform(smoothProgress, [0.85, 1.0], [0, 1])
  const b4Opacity = useTransform(smoothProgress, [0.85, 0.86], [0, 1])

  const card0Opacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1])
  const card1Opacity = useTransform(smoothProgress, [0.35, 0.45], [0, 1])
  const card2Opacity = useTransform(smoothProgress, [0.55, 0.65], [0, 1])
  const card3Opacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1])
  const card4Opacity = useTransform(smoothProgress, [0.95, 1.0], [0, 1])

  const card0Scale = useTransform(smoothProgress, [0.15, 0.25], [0.9, 1])
  const card1Scale = useTransform(smoothProgress, [0.35, 0.45], [0.9, 1])
  const card2Scale = useTransform(smoothProgress, [0.55, 0.65], [0.9, 1])
  const card3Scale = useTransform(smoothProgress, [0.75, 0.85], [0.9, 1])
  const card4Scale = useTransform(smoothProgress, [0.95, 1.0], [0.9, 1])

  const MilestoneCard = ({ milestone, index, style, className }: any) => (
    <motion.div 
       style={style}
       className={`bg-card/40 backdrop-blur-2xl border border-border/30 p-6 lg:p-8 rounded-[2rem] shadow-sm hover:border-primary/20 transition-colors duration-700 ${className}`}
    >
       <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
            0{index + 1}
          </span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            {milestone.year || milestone.period}
          </span>
       </div>
       <h3 className="text-xl font-medium text-foreground mb-4 leading-tight">
         {milestone.title}
       </h3>
       <p className="text-muted-foreground leading-loose text-sm mb-6">
         {milestone.description}
       </p>
       <div className="flex flex-wrap gap-2 mt-auto">
          {(milestone.tags || milestone.technologies)?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-[10px] font-mono bg-secondary/50 text-secondary-foreground rounded-full border border-border/40 tracking-wide">
              {tag}
            </span>
          ))}
       </div>
    </motion.div>
  )

  return (
    <section 
      ref={containerRef} 
      id="experience" 
      className="relative bg-background h-[450vh] lg:h-[600vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-primary/5 pointer-events-none" />

        {/* Title */}
        <div className="z-20 relative text-center mt-24 mb-16 lg:mb-0 lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2 pointer-events-none">
          <span className="text-primary text-sm font-mono uppercase tracking-widest opacity-80 mb-4 block">
            The Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-balance tracking-tight">
            Growing the Tree
          </h2>
        </div>

        {/* =========================================
            MOBILE LAYOUT (BG Tree + Scroll Cards)
            ========================================= */}
        <div className="lg:hidden absolute inset-0 w-full h-full flex items-center justify-center z-0 pt-32">
           <div className="w-[300px] h-[400px] opacity-20 relative -translate-y-[10vh]">
              <svg viewBox="0 0 400 500" fill="none" className="w-full h-full text-primary">
                 <motion.path d="M200,480 C180,450 190,400 200,350 C210,300 180,250 170,200" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ pathLength: trunkProgress, opacity: trunkOpacity }} />
                 <motion.path d="M190,400 C150,400 100,380 60,420" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b0Progress, opacity: b0Opacity }} />
                 <motion.path d="M200,350 C240,330 280,360 350,320" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b1Progress, opacity: b1Opacity }} />
                 <motion.path d="M175,230 C130,220 80,250 40,180" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b2Progress, opacity: b2Opacity }} />
                 <motion.path d="M170,200 C190,150 240,140 320,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b3Progress, opacity: b3Opacity }} />
                 <motion.path d="M170,200 C150,150 140,100 120,20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ pathLength: b4Progress, opacity: b4Opacity }} />
              </svg>
           </div>
        </div>
        
        <div className="lg:hidden w-full max-w-md mx-auto px-6 h-full overflow-y-auto no-scrollbar relative z-10 space-y-24 pb-32">
          {displayMilestones.map((m, i) => (
             <MilestoneCard key={m._id} milestone={m} index={i} className="w-full relative top-[20vh]" />
          ))}
          <div className="h-[20vh] w-full" />
        </div>

        {/* =========================================
            DESKTOP LAYOUT (Interactive Canopy)
            ========================================= */}
        <div className="hidden lg:block absolute inset-0 w-full h-full max-w-[1200px] mx-auto pointer-events-none">
           {/* The SVG Tree in the center */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
              <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
                 <motion.path d="M200,480 C180,450 190,400 200,350 C210,300 180,250 170,200" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ pathLength: trunkProgress, opacity: trunkOpacity }} />
                 <motion.path d="M190,400 C150,400 100,380 60,420" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b0Progress, opacity: b0Opacity }} />
                 <motion.path d="M200,350 C240,330 280,360 350,320" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b1Progress, opacity: b1Opacity }} />
                 <motion.path d="M175,230 C130,220 80,250 40,180" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b2Progress, opacity: b2Opacity }} />
                 <motion.path d="M170,200 C190,150 240,140 320,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b3Progress, opacity: b3Opacity }} />
                 <motion.path d="M170,200 C150,150 140,100 120,20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ pathLength: b4Progress, opacity: b4Opacity }} />
              </svg>
           </div>

           {/* The Container for Absolute Cards */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
              {/* M0: End at (60, 420) -> ~15% left, 84% top */}
              <MilestoneCard 
                 milestone={displayMilestones[0]} index={0} 
                 style={{ opacity: card0Opacity, scale: card0Scale }}
                 className="absolute top-[84%] right-[85%] w-[260px] xl:w-[320px] -translate-y-1/2 mr-4 origin-right pointer-events-auto"
              />
              {/* M1: End at (350, 320) -> ~87.5% left, 64% top */}
              <MilestoneCard 
                 milestone={displayMilestones[1]} index={1} 
                 style={{ opacity: card1Opacity, scale: card1Scale }}
                 className="absolute top-[64%] left-[87.5%] w-[260px] xl:w-[320px] -translate-y-1/2 ml-4 origin-left pointer-events-auto"
              />
              {/* M2: End at (40, 180) -> ~10% left, 36% top */}
              <MilestoneCard 
                 milestone={displayMilestones[2]} index={2} 
                 style={{ opacity: card2Opacity, scale: card2Scale }}
                 className="absolute top-[36%] right-[90%] w-[260px] xl:w-[320px] -translate-y-1/2 mr-4 origin-right pointer-events-auto"
              />
              {/* M3: End at (320, 80) -> ~80% left, 16% top */}
              <MilestoneCard 
                 milestone={displayMilestones[3]} index={3} 
                 style={{ opacity: card3Opacity, scale: card3Scale }}
                 className="absolute top-[16%] left-[80%] w-[260px] xl:w-[320px] -translate-y-1/2 ml-4 origin-left pointer-events-auto"
              />
              {/* M4: End at (120, 20) -> ~30% left, 4% top */}
              <MilestoneCard 
                 milestone={displayMilestones[4]} index={4} 
                 style={{ opacity: card4Opacity, scale: card4Scale }}
                 className="absolute top-[4%] right-[70%] w-[260px] xl:w-[320px] -translate-y-1/2 mr-4 origin-bottom-right pointer-events-auto"
              />
           </div>
        </div>
      </div>
    </section>
  )
}
