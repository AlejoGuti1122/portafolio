"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Calendar, Code, Briefcase, GraduationCap, Rocket, Zap } from "lucide-react"

/* ── Grid de fondo ── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tiempo-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tiempo-grid-bg)" />
    </svg>
  </div>
)

/* ── Orbs ── */
const Orbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", top: "10%", left: "-10%" }}
      animate={{ scale: [1, 1.2, 1], y: [0, 40, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", bottom: "10%", right: "-5%" }}
      animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
  </div>
)

/* ── Code Rain en azul ── */
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01アBCDEF"
    const fontSize = 13
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100)

    const draw = () => {
      ctx.fillStyle = "rgba(2, 12, 27, 0.06)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const gradient = ctx.createLinearGradient(x, y - fontSize * 15, x, y)
        gradient.addColorStop(0, "rgba(14,165,233,0)")
        gradient.addColorStop(0.6, "rgba(56,189,248,0.5)")
        gradient.addColorStop(1, "rgba(186,230,253,0.9)")
        ctx.fillStyle = gradient
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    window.addEventListener("resize", resize)
    return () => { clearInterval(interval); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" />
}

/* ── Línea de progreso del scroll ── */
const ScrollLine = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
      {/* Track */}
      <div className="absolute inset-0 bg-sky-900/30" />
      {/* Fill animado con scroll */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          height,
          background: "linear-gradient(to bottom, #0ea5e9, #38bdf8, #818cf8)",
          boxShadow: "0 0 12px rgba(14,165,233,0.6)",
        }}
      />
    </div>
  )
}

const timeline = [
  {
    year: "2023",
    title: "El Comienzo",
    description: "Mis primeros pasos en el mundo de la programación. Descubrí mi pasión por crear soluciones digitales.",
    icon: Rocket,
    color: "#38bdf8",
    glowColor: "rgba(56,189,248,0.25)",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    year: "2024",
    title: "Formación Intensiva",
    description: "Expandí mis conocimientos estudiando en Coder House, Platzi y Udemy. Aprendí las bases sólidas del desarrollo web moderno.",
    icon: GraduationCap,
    color: "#7dd3fc",
    glowColor: "rgba(125,211,252,0.2)",
    tags: ["React", "Node.js", "Bases de Datos"],
  },
  {
    year: "2024",
    title: "Freelancer",
    description: "Comencé mi carrera profesional trabajando como freelancer, entregando proyectos a clientes reales y ganando experiencia práctica.",
    icon: Briefcase,
    color: "#0ea5e9",
    glowColor: "rgba(14,165,233,0.25)",
    tags: ["Freelance", "Proyectos Reales", "Clientes"],
  },
  {
    year: "2025",
    title: "Bootcamp Henry",
    description: "Ingresé a Henry y completé un bootcamp intensivo Full Stack con especialización en desarrollo Frontend.",
    icon: Code,
    color: "#818cf8",
    glowColor: "rgba(129,140,248,0.2)",
    tags: ["Full Stack", "Frontend", "Backend"],
  },
  {
    year: "2025",
    title: "Kiura",
    description: "Actualmente trabajando en Kiura, aplicando todo mi conocimiento en proyectos de alto impacto y continuando mi crecimiento profesional.",
    icon: Zap,
    color: "#bae6fd",
    glowColor: "rgba(186,230,253,0.2)",
    tags: ["Empresa", "Desarrollo", "Innovación"],
  },
]

/* ── TimelineItem ── */
const TimelineItem = ({ item, index, isLeft }: { item: typeof timeline[0]; index: number; isLeft: boolean }) => {
  const Icon = item.icon
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, type: "spring", stiffness: 90 }}
      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      {/* ── Card ── */}
      <motion.div
        className="w-full md:w-[calc(50%-3rem)]"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="relative rounded-2xl overflow-hidden">
          {/* Borde gradiente animado en hover */}
          <motion.div
            className="absolute -inset-px rounded-2xl"
            animate={hovered ? {
              background: [
                `linear-gradient(0deg, ${item.color}60, transparent, transparent)`,
                `linear-gradient(90deg, ${item.color}60, transparent, transparent)`,
                `linear-gradient(180deg, ${item.color}60, transparent, transparent)`,
                `linear-gradient(270deg, ${item.color}60, transparent, transparent)`,
                `linear-gradient(360deg, ${item.color}60, transparent, transparent)`,
              ]
            } : { background: `linear-gradient(135deg, ${item.color}20, transparent)` }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <div
            className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
            style={{
              background: "rgba(2, 12, 27, 0.85)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${hovered ? item.color + "40" : "rgba(14,165,233,0.12)"}`,
              transition: "border-color 0.3s",
            }}
          >
            {/* Fondo glow */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: `radial-gradient(circle at ${isLeft ? "0% 50%" : "100% 50%"}, ${item.glowColor} 0%, transparent 65%)` }}
            />

            {/* Partículas flotantes en hover */}
            <AnimatePresence>
              {hovered && [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{ backgroundColor: item.color, left: `${20 + i * 30}%`, bottom: "15%" }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -50, opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </AnimatePresence>

            {/* Esquinas decorativas */}
            {["top-0 left-0 border-t border-l rounded-tl-2xl", "top-0 right-0 border-t border-r rounded-tr-2xl",
              "bottom-0 left-0 border-b border-l rounded-bl-2xl", "bottom-0 right-0 border-b border-r rounded-br-2xl"
            ].map((cls, i) => (
              <motion.div
                key={i}
                className={`absolute w-5 h-5 ${cls} transition-colors duration-300`}
                style={{ borderColor: hovered ? item.color + "70" : "transparent" }}
              />
            ))}

            <div className="relative z-10">
              {/* Año badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}35` }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {item.year}
              </motion.div>

              {/* Título */}
              <motion.h3
                className="text-2xl md:text-3xl font-black mb-3 tracking-tight"
                animate={{ color: hovered ? item.color : "#e2e8f0" }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.h3>

              {/* Descripción */}
              <p className="text-slate-400 mb-5 leading-relaxed font-light text-sm md:text-base">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.3 + i * 0.06, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 text-xs font-semibold rounded-full cursor-default"
                    style={{
                      background: `${item.color}12`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Barra inferior animada */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5"
              style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Nodo central ── */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 200 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          {/* Pulso exterior */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ background: `radial-gradient(circle, ${item.color}30, transparent)` }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Segundo pulso */}
          <motion.div
            className="absolute -inset-1 rounded-full blur-md"
            style={{ backgroundColor: item.color }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Ícono */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(2, 12, 27, 0.95)",
              border: `2px solid ${item.color}`,
              boxShadow: `0 0 20px ${item.color}50`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: item.color }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Spacer mobile */}
      <div className="md:hidden w-full h-6" />
    </motion.div>
  )
}

/* ── COMPONENTE PRINCIPAL ── */
const Tiempo = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg, #020c1b 0%, #0a1628 40%, #0c1e3a 70%, #071525 100%)" }}
    >
      <GridBackground />
      <Orbs />
      <CodeRain />

      {/* Overlay para que el code rain no tape el contenido */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(2,12,27,0.4) 0%, transparent 20%, transparent 80%, rgba(2,12,27,0.4) 100%)" }}
      />

      {/* Líneas decorativas */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"
      />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="relative">
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
              <div className="absolute inset-0 bg-sky-500 rounded-full blur-2xl opacity-25" />
              <div
                className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(56,189,248,0.1))", border: "1px solid rgba(14,165,233,0.3)" }}
              >
                <Calendar className="w-10 h-10 text-sky-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500/70 mb-4"
          >
            Experiencia · Historia
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
            style={{
              background: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #38bdf8 70%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Mi{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Trayectoria
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed"
          >
            El camino que me trajo hasta aquí — de los primeros pasos al desarrollo profesional
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"
          />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          <ScrollLine containerRef={containerRef as React.RefObject<HTMLDivElement>} />

          <div className="space-y-16 md:space-y-28">
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* ── Final decoration ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex flex-col items-center mt-24 gap-4"
        >
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-sky-500/50 font-bold"
          >
            Continuará...
          </motion.p>
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.5), transparent)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-sky-500/30"
            />
            <div
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(2,12,27,0.9)", border: "2px solid rgba(14,165,233,0.5)", boxShadow: "0 0 20px rgba(14,165,233,0.3)" }}
            >
              <Zap className="w-7 h-7 text-sky-400" />
            </div>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"
      />
    </div>
  )
}

export default Tiempo
