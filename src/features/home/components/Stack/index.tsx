/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"

const Stack = () => {
  const technologies = [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
    },
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "#FFFFFF",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      color: "#FFFFFF",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47A248",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "#4169E1",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      color: "#FFCA28",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900/10 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Título de la sección */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Stack Tecnológico
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Tecnologías y herramientas que domino para crear experiencias
            digitales excepcionales
          </motion.p>
        </motion.div>

        {/* Grid de tecnologías */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Componente individual de cada tecnología con efecto 3D Tilt
const TechCard = ({
  tech,
  index,
  itemVariants,
}: {
  tech: { name: string; icon: string; color: string }
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemVariants: any
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="relative"
    >
      <Card
        className="relative h-40 bg-zinc-900/80 backdrop-blur-xl border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
        }}
      >
        {/* Glow effect en hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${tech.color}40, transparent 70%)`,
          }}
        />

        {/* Contenido de la card */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 gap-4">
          {/* Icono */}
          <motion.div
            className="w-16 h-16 relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter:
                  tech.name === "Next.js" || tech.name === "Express"
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
            />
          </motion.div>

          {/* Nombre */}
          <motion.h3
            className="text-lg font-semibold text-center"
            style={{
              color: tech.color === "#FFFFFF" ? "#f59e0b" : tech.color,
              textShadow: `0 0 20px ${tech.color}40`,
            }}
          >
            {tech.name}
          </motion.h3>
        </div>

        {/* Efecto de brillo en las esquinas */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at top right, ${tech.color}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at bottom left, ${tech.color}, transparent)`,
          }}
        />
      </Card>
    </motion.div>
  )
}

export default Stack
