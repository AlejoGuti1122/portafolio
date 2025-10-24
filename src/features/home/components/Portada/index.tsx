"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ArrowDown, Code2 } from "lucide-react"

const Portada = () => {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      initialX: number
      initialY: number
      targetX: number
      targetY: number
      duration: number
    }>
  >([])

  // Generar partículas solo en el cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        duration: Math.random() * 10 + 20,
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
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Expo",
    "Next.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900/20">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              left: `${particle.targetX}%`,
              top: `${particle.targetY}%`,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-5xl bg-zinc-900/50 backdrop-blur-xl border-zinc-700/50 shadow-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 md:p-12 lg:p-16"
          >
            {/* Icono decorativo */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-30"
                />
                <Code2 className="w-16 h-16 text-amber-500 relative z-10" />
              </div>
            </motion.div>

            {/* Nombre */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent"
            >
              Diego Alejandro Cuesta Gutiérrez
            </motion.h1>

            {/* Título Rotativo */}
            <motion.div
              variants={itemVariants}
              className="h-12 md:h-16 flex items-center justify-center mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentTitle}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-400"
                >
                  {titles[currentTitle]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            {/* Propuesta de Valor */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Transformo ideas en experiencias digitales excepcionales.
              Especializado en crear aplicaciones web y móviles modernas que
              combinan diseño intuitivo con código limpio y escalable.
            </motion.p>

            {/* Botones de Contacto */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/50"
                  asChild
                >
                  <a
                    href="https://github.com/AlejoGuti1122"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/alejandro-guti%C3%A9rrez-9a88a6267/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                  asChild
                >
                  <a href="mailto:c.gutierrez.d.alejandro@gmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Contacto
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-amber-400"
              >
                <ArrowDown className="w-8 h-8" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Card>
      </div>
    </div>
  )
}

export default Portada
