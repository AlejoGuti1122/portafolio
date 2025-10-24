"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Code,
  Briefcase,
  GraduationCap,
  Rocket,
  Zap,
} from "lucide-react"

const Tiempo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const timeline = [
    {
      year: "2023",
      title: "El Comienzo",
      description:
        "Mis primeros pasos en el mundo de la programación. Descubrí mi pasión por crear soluciones digitales.",
      icon: Rocket,
      color: "#f59e0b",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      year: "2024",
      title: "Formación Intensiva",
      description:
        "Expandí mis conocimientos estudiando en Coder House, Platzi y Udemy. Aprendí las bases sólidas del desarrollo web moderno.",
      icon: GraduationCap,
      color: "#f97316",
      tags: ["React", "Node.js", "Bases de Datos"],
    },
    {
      year: "2024",
      title: "Freelancer",
      description:
        "Comencé mi carrera profesional trabajando como freelancer, entregando proyectos a clientes reales y ganando experiencia práctica.",
      icon: Briefcase,
      color: "#fb923c",
      tags: ["Freelance", "Proyectos Reales", "Clientes"],
    },
    {
      year: "2025",
      title: "Bootcamp Henry",
      description:
        "Ingresé a Henry y completé un bootcamp intensivo Full Stack con especialización en desarrollo Frontend.",
      icon: Code,
      color: "#fdba74",
      tags: ["Full Stack", "Frontend", "Backend"],
    },
    {
      year: "2025",
      title: "Kiura",
      description:
        "Actualmente trabajando en Kiura, aplicando todo mi conocimiento en proyectos de alto impacto y continuando mi crecimiento profesional.",
      icon: Zap,
      color: "#fed7aa",
      tags: ["Empresa", "Desarrollo", "Innovación"],
    },
  ]

  // Code Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = "rgba(24, 24, 27, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Gradient effect - más brillante arriba, más oscuro abajo
        const gradient = ctx.createLinearGradient(x, y - fontSize * 20, x, y)
        gradient.addColorStop(0, "#f59e0b")
        gradient.addColorStop(0.5, "#fb923c")
        gradient.addColorStop(1, "rgba(245, 158, 11, 0.1)")

        ctx.fillStyle = gradient
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 py-20"
    >
      {/* Code Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ pointerEvents: "none" }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/50" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Calendar className="w-16 h-16 text-amber-500 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Mi Trayectoria
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            El camino que me trajo hasta aquí - De los primeros pasos al
            desarrollo profesional
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500/20 via-amber-500/50 to-amber-500/20 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
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

        {/* Decoración final */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-zinc-900 rounded-full p-4 border-2 border-amber-500">
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Componente individual de timeline
const TimelineItem = ({
  item,
  index,
  isLeft,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
  index: number
  isLeft: boolean
}) => {
  const Icon = item.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:gap-8`}
    >
      {/* Card */}
      <motion.div
        className="w-full md:w-[calc(50%-2rem)]"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="bg-zinc-900/80 backdrop-blur-xl border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${
                isLeft ? "left" : "right"
              }, ${item.color}30, transparent 70%)`,
            }}
          />

          <div className="relative z-10 p-6">
            {/* Año */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="inline-block mb-3"
            >
              <Badge
                className="text-lg font-bold px-4 py-1"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  borderColor: item.color,
                }}
              >
                {item.year}
              </Badge>
            </motion.div>

            {/* Título */}
            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: item.color }}
            >
              {item.title}
            </h3>

            {/* Descripción */}
            <p className="text-zinc-300 mb-4 leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Línea decorativa */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
          />
        </Card>
      </motion.div>

      {/* Punto central (solo desktop) */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={
            isHovered ? { scale: 1.3, rotate: 360 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full blur-lg"
            style={{ backgroundColor: item.color }}
          />
          <div
            className="relative w-16 h-16 rounded-full border-4 flex items-center justify-center"
            style={{
              backgroundColor: "#18181b",
              borderColor: item.color,
            }}
          >
            <Icon
              className="w-8 h-8"
              style={{ color: item.color }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Spacer para mobile */}
      <div className="md:hidden w-full h-8" />
    </motion.div>
  )
}

export default Tiempo
