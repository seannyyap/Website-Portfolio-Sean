"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ZenSand() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let ripples: { x: number; y: number; radius: number; maxRadius: number; opacity: number; life: number }[] = []
    
    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    const createRipple = (x: number, y: number) => {
      // Add a degree of randomness to max size for organic feel
      const maxRadius = 100 + Math.random() * 150
      ripples.push({ x, y, radius: 0, maxRadius, opacity: 0.1, life: 1 })
      // Keep array small to prevent performance issues
      if (ripples.length > 15) ripples.shift()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Throttle ripple creation organically
      if (Math.random() > 0.85) {
        createRipple(x, y)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Determine stroke color based on very rough theme heuristic
      // In a real app, you might pass the CSS variable value or use a fixed subtle color
      const isDark = document.documentElement.classList.contains('dark') || theme === 'dark'
      const baseColor = isDark ? '255, 255, 255' : '0, 0, 0'

      // Filter out dead ripples instead of splicing in a loop
      ripples = ripples.filter((ripple) => {
        // Draw active ripple
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        
        const currentOpacity = ripple.opacity * ripple.life
        ctx.strokeStyle = `rgba(${baseColor}, ${currentOpacity})`
        ctx.lineWidth = 1 + (ripple.radius / ripple.maxRadius) * 2
        ctx.stroke()

        // Update state
        ripple.radius += 0.8
        ripple.life -= Math.random() * 0.005 + 0.005

        return ripple.life > 0 && ripple.radius < ripple.maxRadius
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resize)
    // Use pointer down for mobile support too, or just stick to mousemove for the trailing effect
    canvas.addEventListener("mousemove", handleMouseMove)
    
    resize()
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay"
    />
  )
}
