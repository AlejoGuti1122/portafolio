/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useState, useMemo } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion"
import { seededRandom } from "@/lib/utils"

const technologies = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Frontend",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Mobile",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "Backend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Database",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    category: "Backend",
  },
]

const categories = ["Todos", "Frontend", "Backend", "Mobile", "Database"]

/* ── Paleta v2 (misma que Portada) ──
   bg: #0A0A0B · surface: #131316 · text: #F5F4EF · muted: #8A8A85
   accent: #D4FF3D · border: #2A2A28
*/

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
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  })
  const scrollScale = useTransform(cardScrollProgress, [0, 1], [0.86, 1])
  const scrollShadow = useTransform(cardScrollProgress, (p) => {
    const alpha = 0.3 * p
    const blur = 8 + p * 28
    const spread = p * 16
    return `0px ${spread}px ${blur}px rgba(212, 255, 61, ${alpha})`
  })

  const { scatterX, scatterY, scatterRotate } = useMemo(() => {
    const angle = seededRandom(index) * Math.PI * 2
    const dist = 60 + seededRandom(index + 1) * 80
    // redondeado: el transform de framer-motion se serializa con menor
    // precisión en el SSR que en el cliente, y un float irracional aquí
    // produce un mismatch de hidratación
    return {
      scatterX: Math.round(Math.cos(angle) * dist),
      scatterY: Math.round(Math.sin(angle) * dist),
      scatterRotate: Math.round(seededRandom(index + 2) * 60 - 30),
    }
  }, [index])
  const scrollX = useTransform(cardScrollProgress, [0, 1], [scatterX, 0])
  const scrollY = useTransform(cardScrollProgress, [0, 1], [scatterY, 0])
  const scrollRotate = useTransform(
    cardScrollProgress,
    [0, 1],
    [scatterRotate, 0],
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isFiltered ? 1 : 0.15, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              scale: scrollScale,
              boxShadow: scrollShadow,
              x: scrollX,
              y: scrollY,
              rotate: scrollRotate,
              transformStyle: "preserve-3d",
            }
      }
      className="relative cursor-pointer rounded-lg"
    >
      <div
        className="relative h-40 rounded-lg overflow-hidden flex flex-col items-center justify-center gap-3 p-5"
        style={{
          background: "#131316",
          border: `1px solid ${hovered ? "#D4FF3D" : "#2A2A28"}`,
          transition: "border-color 0.2s",
        }}
      >
        <span
          className="absolute top-3 right-3 text-[9px] uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
        >
          {tech.category}
        </span>

        <img
          src={tech.icon}
          alt={tech.name}
          className="w-10 h-10 object-contain"
          style={{
            filter:
              tech.name === "Next.js" || tech.name === "Express"
                ? "brightness(0) invert(1)"
                : "none",
            opacity: hovered ? 1 : 0.85,
          }}
        />

        <h3
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-mono)",
            color: hovered ? "#D4FF3D" : "#8A8A85",
          }}
        >
          {tech.name}
        </h3>
      </div>
    </motion.div>
  )
}

const Stack = () => {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const headerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  const gridY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div
      ref={containerRef}
      data-scroll-section="stack"
      className="relative min-h-screen w-full py-24 px-6"
      style={{ background: "#0A0A0B" }}
    >
      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          style={{
            y: reduceMotion ? 0 : headerY,
            scale: reduceMotion ? 1 : headerScale,
          }}
        >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
          >
            Habilidades técnicas
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#F5F4EF",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Stack tecnológico
          </h2>
          <p
            className="text-base md:text-lg max-w-xl font-light"
            style={{ color: "#8A8A85" }}
          >
            Tecnologías que uso a diario para construir productos web y móviles,
            de punta a punta.
          </p>
        </motion.div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-4 gap-3 max-w-xl mb-12"
        >
          {[
            { value: 10, label: "Tecnologías" },
            { value: 3, label: "Años exp." },
            { value: 4, label: "Categorías" },
            { value: 15, label: "Proyectos" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-3 rounded-lg"
              style={{ background: "#131316", border: "1px solid #2A2A28" }}
            >
              <div
                className="text-xl font-semibold"
                style={{ color: "#F5F4EF", fontFamily: "var(--font-display)" }}
              >
                <AnimatedCounter value={s.value} />+
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "#8A8A85", fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Filtros ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-4 py-2 rounded-md text-sm transition-colors duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: activeCategory === cat ? "#D4FF3D" : "transparent",
                color: activeCategory === cat ? "#0A0A0B" : "#8A8A85",
                border: `1px solid ${activeCategory === cat ? "#D4FF3D" : "#2A2A28"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Grid de cards ── */}
        <motion.div
          layout
          style={{ y: reduceMotion ? 0 : gridY }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
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
    </div>
  )
}

export default Stack
