"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, Code2, Sparkles } from "lucide-react"

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON — sigue el cursor suavemente
───────────────────────────────────────────── */
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
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
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   TYPEWRITER — escribe letra por letra
───────────────────────────────────────────── */
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [started, text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-8 bg-sky-400 ml-1 align-middle"
        />
      )}
    </span>
  )
}

/* ─────────────────────────────────────────────
   GRID LINES — fondo con cuadrícula animada
───────────────────────────────────────────── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="portfolio-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#portfolio-grid-bg)" />
    </svg>
  </div>
)

/* ─────────────────────────────────────────────
   ORBS — esferas de luz animadas
───────────────────────────────────────────── */
const Orbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Orb principal azul cielo */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)",
        top: "-15%",
        left: "-10%",
      }}
      animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Orb azul profundo */}
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
        bottom: "-10%",
        right: "-5%",
      }}
      animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, -15, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    {/* Orb acento índigo */}
    <motion.div
      className="absolute w-[350px] h-[350px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        top: "40%",
        left: "60%",
      }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    />
  </div>
)

/* ─────────────────────────────────────────────
   PARTÍCULAS flotantes
───────────────────────────────────────────── */
const Particles = ({ particles }: { particles: Array<{ id: number; initialX: number; initialY: number; targetX: number; targetY: number; duration: number; size: number; opacity: number }> }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-sky-400"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.initialX}%`,
          top: `${p.initialY}%`,
          opacity: p.opacity,
        }}
        animate={{
          left: `${p.targetX}%`,
          top: `${p.targetY}%`,
          opacity: [p.opacity, p.opacity * 2, p.opacity],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
)

/* ─────────────────────────────────────────────
   STACK BADGE con hover
───────────────────────────────────────────── */
const StackBadge = ({ tech, index }: { tech: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 1.8 + index * 0.07, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.12, y: -3, backgroundColor: "rgba(14,165,233,0.25)" }}
    className="px-3 py-1 text-xs font-semibold text-sky-300 border border-sky-500/30 rounded-full bg-sky-900/20 cursor-default transition-colors"
  >
    {tech}
  </motion.span>
)

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
const Portada = () => {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [particles, setParticles] = useState<Array<{
    id: number; initialX: number; initialY: number; targetX: number; targetY: number; duration: number; size: number; opacity: number
  }>>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [4, -4])
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4])
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        duration: Math.random() * 15 + 20,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.05,
      }))
    )
  }, [])

  const titles = [
    "Desarrollador Frontend",
    "React Specialist",
    "Mobile Developer",
    "Full Stack Enthusiast",
  ]

  const stack = [
    "JavaScript", "TypeScript", "React", "React Native",
    "Expo", "Next.js", "Express", "MongoDB", "PostgreSQL", "Firebase",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020c1b 0%, #0a1628 40%, #0c1e3a 70%, #071525 100%)" }}
    >
      {/* Capas de fondo */}
      <GridBackground />
      <Orbs />
      <Particles particles={particles} />

      {/* Línea horizontal decorativa */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent origin-right"
      />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 1000 }}
          className="w-full max-w-5xl"
        >
          {/* Card con borde luminoso */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl"
          >
            {/* Borde gradiente animado */}
            <motion.div
              className="absolute -inset-px rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(14,165,233,0.5), rgba(56,189,248,0.1), rgba(99,102,241,0.4), rgba(14,165,233,0.5))",
                backgroundSize: "300% 300%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Interior */}
            <div
              className="relative rounded-2xl p-8 md:p-12 lg:p-16"
              style={{
                background: "rgba(2, 12, 27, 0.82)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* ── Icono ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  {/* Anillo orbital */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 rounded-full border border-dashed border-sky-500/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 rounded-full border border-sky-400/10"
                  />
                  {/* Glow */}
                  <div className="absolute inset-0 bg-sky-500 rounded-full blur-2xl opacity-25" />
                  {/* Fondo del icono */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(56,189,248,0.1))", border: "1px solid rgba(14,165,233,0.3)" }}
                  >
                    <Code2 className="w-10 h-10 text-sky-400" />
                  </div>
                  {/* Chispas decorativas */}
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-sky-400"
                      style={{
                        top: "50%",
                        left: "50%",
                        transformOrigin: "0 0",
                      }}
                      animate={{
                        x: [0, Math.cos((angle * Math.PI) / 180) * 40],
                        y: [0, Math.sin((angle * Math.PI) / 180) * 40],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* ── Nombre ── */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500/70 mb-3"
                >
                  Portafolio · 2025
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
                  style={{
                    background: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #38bdf8 70%, #0ea5e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Diego Alejandro
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #818cf8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Cuesta Gutiérrez
                  </span>
                </motion.h1>
              </div>

              {/* ── Título rotativo ── */}
              <div className="h-14 flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTitle}
                    initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-sky-300 tracking-wide">
                      {titles[currentTitle]}
                    </span>
                    <Sparkles className="w-5 h-5 text-sky-400" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Separador ── */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="h-px w-48 mx-auto mb-6 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"
              />

              {/* ── Descripción con typewriter ── */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-base md:text-lg text-slate-400 text-center max-w-2xl mx-auto mb-8 leading-relaxed font-light"
              >
                <TypewriterText
                  text="Transformo ideas en experiencias digitales excepcionales. Aplicaciones web y móviles modernas que combinan diseño intuitivo con código limpio y escalable."
                  delay={1400}
                />
              </motion.p>

              {/* ── Stack ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="flex flex-wrap justify-center gap-2 mb-10"
              >
                {stack.map((tech, i) => (
                  <StackBadge key={tech} tech={tech} index={i} />
                ))}
              </motion.div>

              {/* ── Botones de contacto ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                <MagneticButton>
                  <motion.a
                    href="https://github.com/AlejoGuti1122"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                      boxShadow: "0 0 20px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                    <Github className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">GitHub</span>
                  </motion.a>
                </MagneticButton>

                <MagneticButton>
                  <motion.a
                    href="https://www.linkedin.com/in/alejandro-guti%C3%A9rrez-9a88a6267/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-sky-300 relative overflow-hidden"
                    style={{
                      border: "1px solid rgba(14,165,233,0.35)",
                      background: "rgba(14,165,233,0.07)",
                      boxShadow: "0 0 15px rgba(14,165,233,0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "rgba(14,165,233,0.12)" }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <Linkedin className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">LinkedIn</span>
                  </motion.a>
                </MagneticButton>

                <MagneticButton>
                  <motion.a
                    href="mailto:c.gutierrez.d.alejandro@gmail.com"
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-sky-300 relative overflow-hidden"
                    style={{
                      border: "1px solid rgba(14,165,233,0.35)",
                      background: "rgba(14,165,233,0.07)",
                      boxShadow: "0 0 15px rgba(14,165,233,0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "rgba(14,165,233,0.12)" }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <Mail className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Contacto</span>
                  </motion.a>
                </MagneticButton>
              </motion.div>

              {/* ── Stats rápidas ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.9 }}
                className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto"
              >
                {[
                  { value: "3+", label: "Años de experiencia" },
                  { value: "10+", label: "Proyectos entregados" },
                  { value: "Full", label: "Stack developer" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="text-center p-3 rounded-xl"
                    style={{
                      background: "rgba(14,165,233,0.06)",
                      border: "1px solid rgba(14,165,233,0.15)",
                    }}
                  >
                    <div className="text-2xl font-black text-sky-300">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Scroll indicator ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
                <div
                  className="w-5 h-8 rounded-full border border-sky-500/30 flex items-start justify-center p-1"
                >
                  <motion.div
                    className="w-1 h-2 rounded-full bg-sky-400"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Portada
