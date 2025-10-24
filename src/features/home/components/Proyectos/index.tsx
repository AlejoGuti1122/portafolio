"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  Smartphone,
  Monitor,
  Sparkles,
} from "lucide-react"

const Proyectos = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "LCS Staffing Users",
      description:
        "Aplicación móvil completa para gestión de usuarios con autenticación y base de datos en tiempo real.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      type: "mobile",
      github: "https://github.com/AlejoGuti1122/lcs-staffing-users",
      demo: "https://lcs-staffing-users.vercel.app/",
      technologies: ["React Native", "Expo", "Firebase", "CSS"],
      gradient: "from-blue-500 to-cyan-500",
      size: "large",
    },
    {
      id: 2,
      title: "LCS Staffing Admin",
      description:
        "Panel administrativo móvil para gestión completa del sistema LCS Staffing con dashboard interactivo.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      type: "mobile",
      github: "https://github.com/AlejoGuti1122/lcs-staffing-admin",
      demo: "https://lcs-staffing-admin.vercel.app/",
      technologies: ["React Native", "Expo", "Firebase", "CSS"],
      gradient: "from-purple-500 to-pink-500",
      size: "medium",
    },
    {
      id: 3,
      title: "Save Your Name",
      description:
        "App móvil innovadora para guardar y organizar información importante con sincronización en la nube.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      type: "mobile",
      github: "https://github.com/AlejoGuti1122/save-your-name",
      demo: "https://save-your-name.vercel.app/",
      technologies: ["React Native", "Expo", "Firebase", "CSS"],
      gradient: "from-orange-500 to-red-500",
      size: "medium",
    },
    {
      id: 4,
      title: "Sticker Smash",
      description:
        "Aplicación móvil creativa para crear y personalizar stickers con una experiencia de usuario intuitiva.",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      type: "mobile",
      github: "https://github.com/AlejoGuti1122/StickerSmash",
      demo: "https://sticker-smash-theta.vercel.app/",
      technologies: ["React Native", "Expo", "CSS"],
      gradient: "from-green-500 to-emerald-500",
      size: "small",
    },
    {
      id: 5,
      title: "PF-05",
      description:
        "Proyecto web moderno full-stack con diseño responsive y componentes reutilizables usando las últimas tecnologías.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      type: "web",
      github: "https://github.com/AlejoGuti1122/pf-05",
      demo: "https://pf-05.vercel.app/",
      technologies: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      gradient: "from-amber-500 to-orange-500",
      size: "large",
    },
    {
      id: 6,
      title: "AparcoYo",
      description:
        "Plataforma web para gestión inteligente de estacionamientos con interfaz moderna y fluida.",
      image:
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
      type: "web",
      github: "https://github.com/AlejoGuti1122/aparcoYo",
      demo: "https://aparco-yo.vercel.app/",
      technologies: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      gradient: "from-indigo-500 to-purple-500",
      size: "medium",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900/10 py-20 px-4">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-amber-500 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Una selección de mis mejores trabajos - Desde aplicaciones móviles
            hasta plataformas web completas
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`
                ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                ${
                  project.size === "medium" ? "md:col-span-1 md:row-span-1" : ""
                }
                ${project.size === "small" ? "md:col-span-1 md:row-span-1" : ""}
              `}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <ProjectCard
                project={project}
                isHovered={hoveredIndex === index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Componente individual de proyecto
const ProjectCard = ({
  project,
  isHovered,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any
  isHovered: boolean
}) => {
  const TypeIcon = project.type === "mobile" ? Smartphone : Monitor

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="h-full"
    >
      <Card className="relative h-full min-h-[300px] bg-zinc-900/80 backdrop-blur-xl border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  className="flex items-center gap-1"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    borderColor: "#f59e0b",
                    color: "#f59e0b",
                  }}
                >
                  <TypeIcon className="w-3 h-3" />
                  {project.type === "mobile" ? "Mobile" : "Web"}
                </Badge>
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
              {project.title}
            </h3>

            <motion.p
              className="text-zinc-200 text-sm md:text-base mb-4 leading-relaxed"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Footer */}
          <div>
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white backdrop-blur-sm bg-white/10 text-xs"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Botones - AHORA SIEMPRE VISIBLES EN MOBILE */}
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Código
                </a>
              </Button>

              {project.demo && (
                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-white hover:scale-105 transition-all shadow-lg shadow-amber-500/50"
                  asChild
                >
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Efecto de brillo en hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.gradient} opacity-20 blur-xl`}
          />
        </motion.div>

        {/* Corner glow */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at top right, #f59e0b, transparent)`,
          }}
        />
      </Card>
    </motion.div>
  )
}

export default Proyectos
