"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"

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

export function Experience({ milestones = [] }: ExperienceProps) {
  const containerRef = useRef(null)
  const displayMilestones = milestones
  const [petals, setPetals] = useState<{ id: number; size: number; left: string; top: string; duration: number; delay: number; rotate: number }[]>([])

  useEffect(() => {
    // Generate petals for the experience section
    const newPetals = [...Array(12)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      rotate: Math.random() * 360
    }))
    setPetals(newPetals)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  })

  // Desktop Path and Card Mappings - Synchronized for organic growth
  // Trunk path length is roughly 280 units. Trunk scroll goes [0, 0.85]
  const trunkProgress = useTransform(smoothProgress, [0, 0.85], [0, 1])
  const trunkOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1])
  
  // M0: Sprouting at ~28% path length -> Trunk reaches here at scroll 0.24
  const b0Progress = useTransform(smoothProgress, [0.24, 0.32], [0, 1])
  const b0Opacity = useTransform(smoothProgress, [0.24, 0.25], [0, 1])
  const card0Opacity = useTransform(smoothProgress, [0.32, 0.38], [0, 1])
  const card0Scale = useTransform(smoothProgress, [0.32, 0.38], [0.9, 1])

  // M1: Sprouting at ~46% path length -> Trunk reaches here at scroll 0.39
  const b1Progress = useTransform(smoothProgress, [0.39, 0.47], [0, 1])
  const b1Opacity = useTransform(smoothProgress, [0.39, 0.40], [0, 1])
  const card1Opacity = useTransform(smoothProgress, [0.47, 0.53], [0, 1])
  const card1Scale = useTransform(smoothProgress, [0.47, 0.53], [0.9, 1])

  // M2: Sprouting at ~89% path length -> Trunk reaches here at scroll 0.75
  const b2Progress = useTransform(smoothProgress, [0.75, 0.82], [0, 1])
  const b2Opacity = useTransform(smoothProgress, [0.75, 0.76], [0, 1])
  const card2Opacity = useTransform(smoothProgress, [0.82, 0.88], [0, 1])
  const card2Scale = useTransform(smoothProgress, [0.82, 0.88], [0.9, 1])

  // M3: Sprouting at 100% path length -> Trunk reaches here at scroll 0.85
  const b3Progress = useTransform(smoothProgress, [0.85, 0.92], [0, 1])
  const b3Opacity = useTransform(smoothProgress, [0.85, 0.86], [0, 1])
  const card3Opacity = useTransform(smoothProgress, [0.92, 0.98], [0, 1])
  const card3Scale = useTransform(smoothProgress, [0.92, 0.98], [0.9, 1])

  // M4: Also sprouting at tip -> trunk reaches at 0.85
  const b4Progress = useTransform(smoothProgress, [0.86, 0.93], [0, 1])
  const b4Opacity = useTransform(smoothProgress, [0.86, 0.87], [0, 1])
  const card4Opacity = useTransform(smoothProgress, [0.93, 0.99], [0, 1])
  const card4Scale = useTransform(smoothProgress, [0.93, 0.99], [0.9, 1])

  const MilestoneCard = ({ milestone, index, style, className, side = "left", ...props }: any) => (
    <motion.div 
       style={{ ...style, originX: side === 'left' ? 1 : 0, originY: 0.5 }}
       className={`bg-card/30 backdrop-blur-3xl border-[0.5px] border-border/20 p-4 lg:p-5 rounded-[2rem] shadow-2xl hover:border-primary/40 transition-all duration-700 group ${className}`}
       {...props}
    >
       {/* Connection Node */}
       <div className={`hidden lg:block absolute top-1/2 ${side === 'left' ? '-right-[1.5px]' : '-left-[1.5px]'} -translate-y-1/2 w-6 h-6 rounded-full bg-primary/20 blur-lg group-hover:bg-primary/50 transition-colors pointer-events-none`} />
       <div className={`hidden lg:block absolute top-1/2 ${side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/30 group-hover:scale-150 transition-all pointer-events-none shadow-[0_0_15px_rgba(var(--primary),0.5)]`} />

       <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs shadow-inner group-hover:border-primary/30 transition-colors">
            {index + 1}
          </div>
          <span className="text-[10px] font-mono text-primary/70 tracking-[0.2em] uppercase font-semibold">
            {milestone.year || milestone.period}
          </span>
       </div>
       <h3 className="text-lg font-bold text-foreground mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-500">
         {milestone.title}
       </h3>
       <p className="text-muted-foreground/90 leading-relaxed text-xs lg:text-sm mb-4 font-medium">
         {milestone.description}
       </p>
       <div className="flex flex-wrap gap-2 mt-auto">
          {(milestone.tags || milestone.technologies)?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-[9px] font-bold font-mono bg-primary/5 text-primary/80 rounded-full border border-primary/10 tracking-widest uppercase transition-all hover:bg-primary/20 hover:text-primary hover:scale-105">
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
      className="relative bg-background h-[600vh] lg:h-[1000vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/10 pointer-events-none" />

        {/* Environmental Particles - Drifting Petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {petals.map((petal) => (
            <motion.div
              key={`petal-${petal.id}`}
              className="absolute rounded-full bg-primary/15 blur-[1px]"
              style={{
                width: petal.size + "px",
                height: petal.size * 1.5 + "px", // Elongated leaf shape
                left: petal.left,
                top: petal.top,
                rotate: petal.rotate,
                willChange: "transform, opacity"
              }}
              animate={{
                y: [0, -150],
                x: [0, Math.random() * 40 - 20],
                opacity: [0, 0.4, 0],
                rotate: [petal.rotate, petal.rotate + 45]
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: petal.delay
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="z-20 relative text-center mt-24 mb-16 lg:mb-0 lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2 pointer-events-none">
          <span className="text-primary text-sm font-mono uppercase tracking-widest opacity-80 mb-4 block">
            The Journey
          </span>
          <h2 className="fluid-heading font-medium text-balance tracking-tight">
            Growing the Tree
          </h2>
        </div>

        {displayMilestones.length === 0 ? (
          <div className="z-30 relative max-w-md mx-auto px-6 text-center">
            <div className="rounded-3xl border border-border/40 bg-card/20 backdrop-blur-md p-8 text-muted-foreground">
              No experience entries yet. Add them in <span className="text-foreground font-medium">/admin</span>.
            </div>
          </div>
        ) : null}

        {/* =========================================
            MOBILE LAYOUT (BG Tree + Scroll Cards)
            ========================================= */}
        <div className="lg:hidden absolute inset-0 w-full h-full flex items-center justify-center z-0 pt-32">
           <div className="w-[300px] h-[400px] opacity-20 relative -translate-y-[10vh]">
              <svg viewBox="0 0 400 500" fill="none" className="w-full h-full">
                 <g className="text-primary" style={{ willChange: "transform, opacity" }}>
                    <motion.path d="M200,480 C180,450 190,400 200,350 C210,300 180,250 170,200" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ pathLength: trunkProgress, opacity: trunkOpacity }} />
                    <motion.path d="M200,350 C190,300 180,250 170,200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" style={{ pathLength: trunkProgress }} />
                    
                    <motion.path d="M190,400 C150,400 100,380 60,420" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b0Progress, opacity: b0Opacity }} />
                    <motion.path d="M200,350 C240,330 280,360 350,320" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b1Progress, opacity: b1Opacity }} />
                    <motion.path d="M175,230 C130,220 80,250 40,180" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b2Progress, opacity: b2Opacity }} />
                    <motion.path d="M170,200 C190,150 240,140 320,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ pathLength: b3Progress, opacity: b3Opacity }} />
                    <motion.path d="M170,200 C150,150 140,100 120,20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ pathLength: b4Progress, opacity: b4Opacity }} />
                 </g>
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
           <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[750px]">
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full scale-150 animate-pulse" />
              <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                 <g className="text-primary" style={{ willChange: "transform" }}>
                    {/* Main Trunk with texture */}
                    <motion.path d="M200,480 C180,450 190,400 200,350 C210,300 180,250 170,200" stroke="currentColor" strokeWidth="12" strokeLinecap="round" style={{ pathLength: trunkProgress, opacity: trunkOpacity }} />
                    <motion.path d="M195,470 C180,440 195,390 205,340" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" style={{ pathLength: trunkProgress }} />
                    <motion.path d="M205,475 C190,445 185,395 195,345" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2" style={{ pathLength: trunkProgress }} />
                    
                    {/* Primary Branches - Only grow if milestone data exists */}
                    {displayMilestones[0] && (
                      <>
                        <motion.path d="M190,400 C150,400 100,380 60,420" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ pathLength: b0Progress, opacity: b0Opacity }} />
                        <motion.circle cx="60" cy="420" r="10" fill="currentColor" opacity="0.15" style={{ scale: card0Opacity }} />
                        <motion.circle cx="60" cy="420" r="4" fill="currentColor" style={{ scale: card0Opacity }} />
                      </>
                    )}
                    {displayMilestones[1] && (
                      <>
                        <motion.path d="M200,350 C240,330 280,360 350,320" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ pathLength: b1Progress, opacity: b1Opacity }} />
                        <motion.circle cx="350" cy="320" r="12" fill="currentColor" opacity="0.15" style={{ scale: card1Opacity }} />
                        <motion.circle cx="350" cy="320" r="5" fill="currentColor" style={{ scale: card1Opacity }} />
                      </>
                    )}
                    {displayMilestones[2] && (
                      <>
                        <motion.path d="M175,230 C130,220 80,250 40,180" stroke="currentColor" strokeWidth="7" strokeLinecap="round" style={{ pathLength: b2Progress, opacity: b2Opacity }} />
                        <motion.circle cx="40" cy="180" r="10" fill="currentColor" opacity="0.15" style={{ scale: card2Opacity }} />
                        <motion.circle cx="40" cy="180" r="4" fill="currentColor" style={{ scale: card2Opacity }} />
                      </>
                    )}
                    {displayMilestones[3] && (
                      <>
                        <motion.path d="M170,200 C190,150 240,140 320,80" stroke="currentColor" strokeWidth="7" strokeLinecap="round" style={{ pathLength: b3Progress, opacity: b3Opacity }} />
                        <motion.circle cx="320" cy="80" r="12" fill="currentColor" opacity="0.15" style={{ scale: card3Opacity }} />
                        <motion.circle cx="320" cy="80" r="5" fill="currentColor" style={{ scale: card3Opacity }} />
                      </>
                    )}
                    {displayMilestones[4] && (
                      <>
                        <motion.path d="M170,200 C150,150 140,100 120,20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ pathLength: b4Progress, opacity: b4Opacity }} />
                        <motion.circle cx="120" cy="20" r="15" fill="currentColor" opacity="0.15" style={{ scale: card4Opacity }} />
                        <motion.circle cx="120" cy="20" r="6" fill="currentColor" style={{ scale: card4Opacity }} />
                      </>
                    )}
                 </g>
              </svg>
           </div>

           {/* The Container for Absolute Cards - Sync with SVG box for perfect alignment */}
           <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[750px] pointer-events-none">
              {/* M0: Year 1 (Left) - (60, 420) -> 15% left, 84% top */}
              {displayMilestones[0] && (
                <MilestoneCard 
                   milestone={displayMilestones[0]} index={0} 
                   style={{ opacity: card0Opacity, scale: card0Scale }}
                   initial={{ left: "15%", top: "84%", x: "-100%", y: "-50%" }}
                   animate={{ left: "15%", top: "84%", x: "-100%", y: "-50%" }}
                   side="left"
                   className="absolute w-[280px] xl:w-[350px] origin-right pointer-events-auto"
                />
              )}
              {/* M1: Year 2 (Right) - (350, 320) -> 87.5% left, 64% top */}
              {displayMilestones[1] && (
                <MilestoneCard 
                   milestone={displayMilestones[1]} index={1} 
                   style={{ opacity: card1Opacity, scale: card1Scale }}
                   initial={{ left: "87.5%", top: "64%", x: "0%", y: "-50%" }}
                   animate={{ left: "87.5%", top: "64%", x: "0%", y: "-50%" }}
                   side="right"
                   className="absolute w-[280px] xl:w-[350px] origin-left pointer-events-auto"
                />
              )}
              {/* M2: Year 3 (Left) - (40, 180) -> 10% left, 36% top */}
              {displayMilestones[2] && (
                <MilestoneCard 
                   milestone={displayMilestones[2]} index={2} 
                   style={{ opacity: card2Opacity, scale: card2Scale }}
                   initial={{ left: "10%", top: "36%", x: "-100%", y: "-50%" }}
                   animate={{ left: "10%", top: "36%", x: "-100%", y: "-50%" }}
                   side="left"
                   className="absolute w-[280px] xl:w-[350px] origin-right pointer-events-auto"
                />
              )}
              {/* M3: Year 4 (Right) - (320, 80) -> 80% left, 16% top */}
              {displayMilestones[3] && (
                <MilestoneCard 
                   milestone={displayMilestones[3]} index={3} 
                   style={{ opacity: card3Opacity, scale: card3Scale }}
                   initial={{ left: "80%", top: "16%", x: "0%", y: "-50%" }}
                   animate={{ left: "80%", top: "16%", x: "0%", y: "-50%" }}
                   side="right"
                   className="absolute w-[280px] xl:w-[350px] origin-left pointer-events-auto"
                />
              )}
              {/* M4: Present (Left) - (120, 20) -> 30% left, 4% top */}
              {displayMilestones[4] && (
                <MilestoneCard 
                   milestone={displayMilestones[4]} index={4} 
                   style={{ opacity: card4Opacity, scale: card4Scale }}
                   initial={{ left: "30%", top: "4%", x: "-100%", y: "-50%" }}
                   animate={{ left: "30%", top: "4%", x: "-100%", y: "-50%" }}
                   side="left"
                   className="absolute w-[280px] xl:w-[350px] origin-right pointer-events-auto"
                />
              )}
           </div>
        </div>
      </div>
    </section>
  )
}
