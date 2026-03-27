"use client"

import { useRef } from "react"
import { motion, useSpring, type HTMLMotionProps } from "framer-motion"

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  strength?: number
}

export function MagneticButton({ 
  children, 
  strength = 0.5,
  className = "",
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    // Calculate distance from center of element
    const center = { x: left + width / 2, y: top + height / 2 }
    const distance = { x: clientX - center.x, y: clientY - center.y }
    
    x.set(distance.x * strength)
    y.set(distance.y * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, willChange: "transform" }}
      className={`relative inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
