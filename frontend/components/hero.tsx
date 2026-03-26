"use client"

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, Globe, Sparkles, Bot, Database } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import { MagneticButton } from "./ui/magnetic-button"

type SiteSettings = any

const ICONS: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Sparkles,
  Bot,
  Database,
}

export function Hero({ site }: { site: SiteSettings | null }) {
  const words: string[] = site?.hero?.rotatingWords?.length ? site.hero.rotatingWords : []
  const [currentWord, setCurrentWord] = useState(0)
  const [motes, setMotes] = useState<{ id: number; size: number; left: string; top: string; duration: number; delay: number }[]>([])
  const { scrollY } = useScroll()
  
  // Mouse parallax motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Parallax effects for the breathing core based on scroll
  const coreScrollY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, 50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX - window.innerWidth / 2) / 30
      const y = (clientY - window.innerHeight / 2) / 30
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Generate motes on the client side only to avoid hydration errors
    const newMotes = [...Array(10)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
    setMotes(newMotes)

    const interval =
      words.length > 0
        ? setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
          }, 4000)
        : null
    return () => {
      if (interval) clearInterval(interval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, words.length])

  // Combined transforms for mouse + scroll
  const coreX = springX
  const coreTranslateY = useTransform(coreScrollY, (v) => v + (mouseY.get() * 0.5)) // Combine scroll and mouse

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-background py-20 sm:py-24">
      {/* Abstract Background - Zen Motes (Particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {motes.map((mote) => (
          <motion.div
            key={`mote-${mote.id}`}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: mote.size + "px",
              height: mote.size + "px",
              left: mote.left,
              top: mote.top,
              willChange: "transform, opacity"
            }}
            animate={{
              y: [0, -100 - (mote.size * 20)],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              ease: "linear",
              delay: mote.delay
            }}
          />
        ))}
      </div>

      {/* The Breathing Core - Center Visual Enhancement */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: coreX, y: coreTranslateY, willChange: "transform" }}
      >
        {/* Outer Aura */}
        <motion.div
          className="absolute w-[min(92vw,600px)] h-[min(92vw,600px)] md:w-[min(80vw,800px)] md:h-[min(80vw,800px)] rounded-full bg-primary/5 blur-[80px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ }}
        />
        {/* Middle Resonance layer */}
        <motion.div
          className="absolute w-[min(72vw,400px)] h-[min(72vw,400px)] md:w-[min(60vw,600px)] md:h-[min(60vw,600px)] rounded-full bg-secondary/20 blur-[60px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ }}
        />
        {/* Inner Core */}
        <motion.div
          className="absolute w-[min(40vw,200px)] h-[min(40vw,200px)] md:w-[min(40vw,350px)] md:h-[min(40vw,350px)] rounded-full bg-accent/10 blur-[40px]"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ }}
        />
      </motion.div>

      {/* Subtle organic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="zen-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zen-pattern)" />
        </svg>
      </div>

      <div className="section-container relative z-10 w-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* Main Content - Centered */}
        <motion.div 
          className="max-w-4xl text-center flex flex-col items-center pointer-events-auto"
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/40 backdrop-blur-md border border-primary/20 mb-10 shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)]"
          >
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-foreground/90 uppercase">
              Available for Work
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth, powerful ease out
              className="fluid-display font-bold tracking-tighter text-foreground"
            >
              Sean Yap
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12 min-h-[5.25rem] sm:min-h-[6.5rem] md:min-h-[7.5rem] lg:min-h-[9.5rem] flex items-center justify-center">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="relative w-full h-full flex justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord}
                    initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -60, opacity: 0, filter: "blur(10px)" }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="absolute fluid-heading text-primary tracking-tight whitespace-nowrap font-bold px-4"
                  >
                    {words[currentWord] ?? ""}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="fluid-subheading text-muted-foreground/90 max-w-2xl mx-auto mb-14 font-medium"
          >
            {site?.hero?.description ?? ""}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <MagneticButton>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-4 sm:px-10 sm:py-5 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all block shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)]"
              >
                View My Work
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-4 sm:px-10 sm:py-5 bg-secondary/50 backdrop-blur-sm border border-border text-foreground font-medium rounded-full hover:bg-secondary/80 transition-all block"
              >
                Get in Touch
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="flex items-center justify-center gap-8"
          >
            {(site?.hero?.socialLinks ?? []).map((item: any, i: number) => {
              const Icon = ICONS[item?.iconName] ?? Globe
              return (
              <motion.a
                key={item?.label ?? i}
                href={item?.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -4, color: "var(--primary)" }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-secondary/60"
                aria-label={item?.label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 2 }}
         className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto hidden sm:block"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  )
}
