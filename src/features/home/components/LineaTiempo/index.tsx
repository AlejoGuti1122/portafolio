"use client"

import React, { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import {
  Calendar,
  Code,
  Briefcase,
  GraduationCap,
  Rocket,
  Zap,
} from "lucide-react"

/* ── Paleta v2 (misma que Portada / Stack) ──
   bg: #0A0A0B · surface: #131316 · text: #F5F4EF · muted: #8A8A85
   accent: #D4FF3D · border: #2A2A28
*/

const ScrollLine = ({
  progress,
}: {
  progress: MotionValue<number>
}) => {
  const height = useTransform(progress, [0, 1], ["0%", "100%"])

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
      <div
        className="absolute inset-0"
        style={{ background: "#2A2A28" }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ height, background: "#D4FF3D" }}
      />
    </div>
  )
}

const timeline = [
  {
    year: "2023",
    hash: "a3f9c1",
    title: "El comienzo",
    description:
      "Mis primeros pasos en programación. Descubrí que resolver problemas con código era lo mío.",
    icon: Rocket,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    year: "2024",
    hash: "e71b04",
    title: "Formación intensiva",
    description:
      "Expandí conocimientos en Coder House, Platzi y Udemy — bases sólidas de desarrollo web moderno.",
    icon: GraduationCap,
    tags: ["React", "Node.js", "Bases de datos"],
  },
  {
    year: "2024",
    hash: "c209ff",
    title: "Freelancer",
    description:
      "Empecé a trabajar de forma independiente, entregando proyectos reales a clientes reales.",
    icon: Briefcase,
    tags: ["Freelance", "Proyectos reales", "Clientes"],
  },
  {
    year: "2025",
    hash: "9d1a72",
    title: "Bootcamp Henry",
    description:
      "Bootcamp intensivo Full Stack con especialización en Frontend.",
    icon: Code,
    tags: ["Full Stack", "Frontend", "Backend"],
  },
  {
    year: "2025",
    hash: "4b8e33",
    title: "Kiura",
    description:
      "Actualmente aplicando lo aprendido en proyectos de alto impacto, en crecimiento constante.",
    icon: Zap,
    tags: ["Empresa", "Desarrollo", "Innovación"],
  },
  {
    year: "2026",
    hash: "f21c8a",
    title: "Freelance independiente",
    description:
      "Sigo trabajando de forma independiente en aplicaciones web y móviles. Este año construí GANDI y LCS Staffing, un portal de empleos completo.",
    icon: Rocket,
    tags: ["GANDI", "LCS Staffing", "Web & Mobile"],
  },
]

const TimelineItem = ({
  item,
  index,
  isLeft,
}: {
  item: (typeof timeline)[0]
  index: number
  isLeft: boolean
}) => {
  const Icon = item.icon
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const itemRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  })
  const direction = isLeft ? 1 : -1
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [90 * direction, -90 * direction],
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [7 * direction, -7 * direction],
  )

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: reduceMotion ? 0 : isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        y: reduceMotion ? 0 : parallaxY,
        rotate: reduceMotion ? 0 : rotate,
      }}
      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      {/* ── Card ── */}
      <div className="w-full md:w-[calc(50%-3rem)]">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-lg p-6 md:p-7"
          style={{
            background: "#131316",
            border: `1px solid ${hovered ? "#D4FF3D" : "#2A2A28"}`,
            transition: "border-color 0.2s",
          }}
        >
          {/* Línea estilo git log */}
          <div
            className="flex items-center gap-2 mb-4 text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
          >
            <span style={{ color: "#D4FF3D" }}>commit</span>
            <span>{item.hash}</span>
            <span className="ml-auto">{item.year}</span>
          </div>

          <h3
            className="text-xl md:text-2xl font-semibold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: hovered ? "#D4FF3D" : "#F5F4EF",
              transition: "color 0.2s",
            }}
          >
            {item.title}
          </h3>

          <p
            className="text-sm md:text-base mb-4 leading-relaxed font-light"
            style={{ color: "#8A8A85" }}
          >
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "#0A0A0B",
                  color: "#8A8A85",
                  border: "1px solid #2A2A28",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nodo central ── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "#0A0A0B",
            border: `2px solid ${hovered ? "#D4FF3D" : "#2A2A28"}`,
            transition: "border-color 0.2s",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: hovered ? "#D4FF3D" : "#8A8A85" }}
          />
        </div>
      </div>

      <div className="md:hidden w-full h-6" />
    </motion.div>
  )
}

const Tiempo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const headerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  return (
    <div
      ref={containerRef}
      data-scroll-section="tiempo"
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
          className="mb-20 text-center md:text-left"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
          >
            Experiencia · Historial
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
            Mi trayectoria
          </h2>
          <p
            className="text-base md:text-lg max-w-xl font-light mx-auto md:mx-0"
            style={{ color: "#8A8A85" }}
          >
            El camino que me trajo hasta aquí, commit por commit.
          </p>
        </motion.div>
        </motion.div>

        <div className="relative">
          <ScrollLine progress={scrollYProgress} />

          <div className="space-y-10 md:space-y-16">
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
      </div>
    </div>
  )
}

export default Tiempo
