"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const reduceMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

const CursorSpotlight = () => {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [reduceMotion, x, y])

  if (reduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(600px circle at ${x.get()}px ${y.get()}px, rgba(212,255,61,0.06), transparent 70%)`,
      }}
    />
  )
}

const TerminalBlock = () => {
  const roles = [
    "Desarrollador Frontend",
    "React & React Native",
    "Full Stack",
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(roles[0])
      return
    }
    let i = 0
    setDisplayed("")
    const typing = setInterval(() => {
      i++
      setDisplayed(roles[roleIndex].slice(0, i))
      if (i >= roles[roleIndex].length) clearInterval(typing)
    }, 40)
    return () => clearInterval(typing)
  }, [roleIndex, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const cycle = setInterval(
      () => setRoleIndex((p) => (p + 1) % roles.length),
      3200,
    )
    return () => clearInterval(cycle)
  }, [reduceMotion])

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-lg overflow-hidden"
      style={{ background: "#131316", border: "1px solid #2A2A28" }}
    >
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ borderBottom: "1px solid #2A2A28" }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#4A4A46" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#4A4A46" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#4A4A46" }}
        />
        <span
          className="ml-3 text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
        >
          alejandro@portfolio
        </span>
      </div>
      <div
        className="px-4 py-5 text-left"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <p
          className="text-sm mb-2"
          style={{ color: "#8A8A85" }}
        >
          <span style={{ color: "#D4FF3D" }}>$</span> whoami
        </p>
        <p
          className="text-sm mb-4"
          style={{ color: "#F5F4EF" }}
        >
          Diego Alejandro Cuesta Gutiérrez
        </p>
        <p
          className="text-sm mb-2"
          style={{ color: "#8A8A85" }}
        >
          <span style={{ color: "#D4FF3D" }}>$</span> cat role.txt
        </p>
        <p
          className="text-sm min-h-[1.25rem]"
          style={{ color: "#F5F4EF" }}
        >
          {displayed}
          <span
            className="inline-block w-2 h-4 ml-0.5 align-middle"
            style={{ background: "#D4FF3D" }}
          />
        </p>
      </div>
    </div>
  )
}

const Portada = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#0A0A0B" }}
    >
      <CursorSpotlight />

      <div className="relative z-10 container mx-auto px-6 py-24 min-h-screen flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] mb-6"
          style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
        >
          Portafolio · Manizales, CO · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-bold leading-[1.1] mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "#F5F4EF",
            fontSize: "clamp(3rem, 11vw, 9rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Diego
          <br />
          Alejandro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl max-w-xl mb-12 font-light"
          style={{ color: "#8A8A85", fontFamily: "var(--font-body)" }}
        >
          Construyo interfaces web y móviles con React, React Native y Next.js —
          desde la primera línea de código hasta el deploy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12"
        >
          <TerminalBlock />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <MagneticButton>
            <a
              href="https://github.com/AlejoGuti1122"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium"
              style={{
                background: "#D4FF3D",
                color: "#0A0A0B",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/alejandro-guti%C3%A9rrez-9a88a6267/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium"
              style={{
                border: "1px solid #2A2A28",
                color: "#F5F4EF",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="mailto:c.gutierrez.d.alejandro@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium"
              style={{
                border: "1px solid #2A2A28",
                color: "#F5F4EF",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Mail className="w-4 h-4" /> Contacto
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  )
}

export default Portada
