/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"

const technologies = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    category: "Frontend",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    category: "Mobile",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#FFFFFF",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    category: "Backend",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#FFFFFF",
    category: "Backend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
    category: "Database",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    category: "Backend",
  },
]

const categories = ["Todos", "Frontend", "Backend", "Mobile", "Database"]

/* ── Fondo con grid igual que Portada ── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="stack-grid-bg"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#stack-grid-bg)"
      />
    </svg>
  </div>
)

/* ── Orbs de luz ── */
const Orbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
        top: "-10%",
        right: "10%",
      }}
      animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
        bottom: "0%",
        left: "5%",
      }}
      animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />
  </div>
)

/* ── Contador animado ── */
const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayed, setDisplayed] = useState(0)
  React.useEffect(() => {
    let start = 0
    const step = Math.ceil(value / 30)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setDisplayed(value)
        clearInterval(timer)
      } else setDisplayed(start)
    }, 40)
    return () => clearInterval(timer)
  }, [value])
  return <span>{displayed}</span>
}

/* ── TechCard ── */
const TechCard = ({
  tech,
  index,
  isFiltered,
}: {
  tech: (typeof technologies)[0]
  index: number
  isFiltered: boolean
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const displayColor = tech.color === "#FFFFFF" ? "#7dd3fc" : tech.color

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={{
        opacity: isFiltered ? 1 : 0.15,
        scale: isFiltered ? 1 : 0.9,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      className="relative cursor-pointer"
    >
      {/* Halo exterior pulsante */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle, ${displayColor}30 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Borde animado en hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl"
        animate={
          hovered
            ? {
                background: [
                  `linear-gradient(0deg, ${displayColor}60, transparent, transparent)`,
                  `linear-gradient(90deg, ${displayColor}60, transparent, transparent)`,
                  `linear-gradient(180deg, ${displayColor}60, transparent, transparent)`,
                  `linear-gradient(270deg, ${displayColor}60, transparent, transparent)`,
                  `linear-gradient(360deg, ${displayColor}60, transparent, transparent)`,
                ],
              }
            : { background: "transparent" }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Card principal */}
      <div
        className="relative h-44 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(2, 12, 27, 0.85)",
          border: `1px solid ${hovered ? displayColor + "40" : "rgba(14,165,233,0.12)"}`,
          backdropFilter: "blur(20px)",
          transformStyle: "preserve-3d",
          transition: "border-color 0.3s",
          boxShadow: hovered
            ? `0 0 30px ${displayColor}20, 0 8px 32px rgba(0,0,0,0.4)`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Glow fondo */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 60%, ${displayColor}15 0%, transparent 65%)`,
          }}
        />

        {/* Partículas flotantes en hover */}
        <AnimatePresence>
          {hovered &&
            [0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: displayColor,
                  left: `${20 + i * 20}%`,
                  bottom: "20%",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -40 - i * 10, opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  repeat: Infinity,
                }}
              />
            ))}
        </AnimatePresence>

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 p-5">
          {/* Badge categoría */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -10 }}
            className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              color: displayColor,
              border: `1px solid ${displayColor}40`,
              background: `${displayColor}15`,
            }}
          >
            {tech.category}
          </motion.span>

          {/* Icono */}
          <motion.div
            className="relative w-14 h-14"
            animate={
              hovered ? { y: -4, rotate: [0, -5, 5, 0] } : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            {/* Glow detrás del icono */}
            <motion.div
              className="absolute inset-0 rounded-full blur-lg"
              animate={{ opacity: hovered ? 0.6 : 0 }}
              style={{ backgroundColor: displayColor }}
            />
            <img
              src={tech.icon}
              alt={tech.name}
              className="relative z-10 w-full h-full object-contain drop-shadow-lg"
              style={{
                filter:
                  tech.name === "Next.js" || tech.name === "Express"
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
            />
          </motion.div>

          {/* Nombre */}
          <div className="text-center">
            <motion.h3
              className="text-sm font-bold tracking-wide"
              animate={{ color: hovered ? displayColor : "#94a3b8" }}
              transition={{ duration: 0.2 }}
            >
              {tech.name}
            </motion.h3>
          </div>
        </div>

        {/* Esquinas decorativas */}
        <div
          className="absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-2xl transition-colors duration-300"
          style={{ borderColor: hovered ? displayColor + "60" : "transparent" }}
        />
        <div
          className="absolute top-0 right-0 w-4 h-4 border-t border-r rounded-tr-2xl transition-colors duration-300"
          style={{ borderColor: hovered ? displayColor + "60" : "transparent" }}
        />
        <div
          className="absolute bottom-0 left-0 w-4 h-4 border-b border-l rounded-bl-2xl transition-colors duration-300"
          style={{ borderColor: hovered ? displayColor + "60" : "transparent" }}
        />
        <div
          className="absolute bottom-0 right-0 w-4 h-4 border-b border-r rounded-br-2xl transition-colors duration-300"
          style={{ borderColor: hovered ? displayColor + "60" : "transparent" }}
        />
      </div>
    </motion.div>
  )
}

/* ── COMPONENTE PRINCIPAL ── */
const Stack = () => {
  const [activeCategory, setActiveCategory] = useState("Todos")

  return (
    <div
      className="relative min-h-screen w-full py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020c1b 0%, #0a1628 40%, #0c1e3a 70%, #071525 100%)",
      }}
    >
      <GridBackground />
      <Orbs />

      {/* Líneas decorativas */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500/70 mb-4"
          >
            Habilidades técnicas
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
            style={{
              background:
                "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #38bdf8 70%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stack{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tecnológico
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed"
          >
            Tecnologías que domino para construir experiencias digitales
            modernas y escalables
          </motion.p>

          {/* Separador */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"
          />
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
        >
          {[
            { value: 10, label: "Tecnologías" },
            { value: 3, label: "Años exp." },
            { value: 4, label: "Categorías" },
            { value: 15, label: "Proyectos" },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.05 }}
              className="text-center p-3 rounded-xl"
              style={{
                background: "rgba(14,165,233,0.06)",
                border: "1px solid rgba(14,165,233,0.15)",
              }}
            >
              <div className="text-2xl font-black text-sky-300">
                <AnimatedCounter value={s.value} />+
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Filtros ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(14,165,233,0.35)",
                    }
                  : {
                      background: "rgba(14,165,233,0.07)",
                      color: "#7dd3fc",
                      border: "1px solid rgba(14,165,233,0.25)",
                    }
              }
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Grid de cards ── */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              isFiltered={
                activeCategory === "Todos" || tech.category === activeCategory
              }
            />
          ))}
        </motion.div>
      </div>

      {/* Línea inferior */}
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

export default Stack
