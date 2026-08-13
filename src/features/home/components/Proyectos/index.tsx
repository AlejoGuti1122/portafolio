"use client"

import React, { useState, useRef } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { Github, ExternalLink, Smartphone, Monitor } from "lucide-react"

/* ── Paleta v2 (misma que Portada / Stack / Tiempo) ──
   bg: #0A0A0B · surface: #131316 · text: #F5F4EF · muted: #8A8A85
   accent: #D4FF3D · border: #2A2A28
*/

type Project = {
  id: number
  title: string
  description: string
  image: string
  type: "mobile" | "web"
  github: string
  demo: string
  technologies: string[]
  size: "large" | "medium" | "small"
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "LCS Staffing Users",
    description:
      "Aplicación móvil completa para gestión de usuarios con autenticación y base de datos en tiempo real.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    type: "mobile",
    github: "https://github.com/AlejoGuti1122/lcs-staffing-users",
    demo: "https://lcs-users.netlify.app/",
    technologies: ["React Native", "Expo", "Firebase"],
    size: "large",
    category: "Mobile",
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
    demo: "https://lcs-admin.netlify.app/",
    technologies: ["React Native", "Expo", "Firebase"],
    size: "medium",
    category: "Mobile",
  },
  {
    id: 3,
    title: "Save Your Name",
    description:
      "App móvil para guardar y organizar información importante con sincronización en la nube.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    type: "mobile",
    github: "https://github.com/AlejoGuti1122/save-your-name",
    demo: "https://save-your-name.netlify.app/",
    technologies: ["React Native", "Expo", "Firebase"],
    size: "medium",
    category: "Mobile",
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
    demo: "https://sticker-smash-mobile.netlify.app/",
    technologies: ["React Native", "Expo"],
    size: "small",
    category: "Mobile",
  },
  {
    id: 8,
    title: "GANDI",
    description:
      "Plataforma de IA enfocada en freelancers, con matching inteligente de talento y oportunidades laborales.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    type: "web",
    github: "",
    demo: "https://newgandi.vercel.app/",
    technologies: ["React", "TypeScript", "Vite", "Tailwind"],
    size: "large",
    category: "Web",
  },
]

const categories = ["Todos", "Web", "Mobile"]

const ProjectCard = ({
  project,
  index,
}: {
  project: Project
  index: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"])

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

  const TypeIcon = project.type === "mobile" ? Smartphone : Monitor
  const isLarge = project.size === "large"

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className={`relative cursor-pointer ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <div
        className={`relative rounded-lg overflow-hidden ${isLarge ? "min-h-[420px]" : "min-h-[300px]"}`}
        style={{
          background: "#131316",
          border: `1px solid ${hovered ? "#D4FF3D" : "#2A2A28"}`,
          transition: "border-color 0.2s",
        }}
      >
        {/* Imagen */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0A0A0B 10%, rgba(10,10,11,0.7) 60%, rgba(10,10,11,0.4) 100%)",
            }}
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-7">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: hovered ? "#D4FF3D" : "#8A8A85",
                  border: `1px solid ${hovered ? "#D4FF3D" : "#2A2A28"}`,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <TypeIcon className="w-3 h-3" />
                {project.type === "mobile" ? "Mobile" : "Web"}
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3
              className="font-semibold tracking-tight mb-3 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: hovered ? "#D4FF3D" : "#F5F4EF",
                transition: "color 0.2s",
                fontSize: isLarge ? "clamp(1.5rem, 3vw, 2.2rem)" : "1.4rem",
              }}
            >
              {project.title}
            </h3>

            <p
              className="leading-relaxed font-light"
              style={{
                color: "#8A8A85",
                fontSize: isLarge ? "1rem" : "0.875rem",
              }}
            >
              {project.description}
            </p>
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech, i) => (
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
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm"
                  style={{
                    fontFamily: "var(--font-mono)",
                    border: "1px solid #2A2A28",
                    color: "#F5F4EF",
                  }}
                >
                  <Github className="w-4 h-4" /> Código
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "#D4FF3D",
                    color: "#0A0A0B",
                  }}
                >
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Proyectos = () => {
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filtered = projects.filter(
    (p) => activeFilter === "Todos" || p.category === activeFilter,
  )

  return (
    <div
      className="relative min-h-screen w-full py-24 px-6"
      style={{ background: "#0A0A0B" }}
    >
      <div className="relative z-10 container mx-auto max-w-6xl">
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
            Portafolio · Trabajos
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
            Proyectos destacados
          </h2>
          <p
            className="text-base md:text-lg max-w-xl font-light"
            style={{ color: "#8A8A85" }}
          >
            Aplicaciones web y móviles construidas de punta a punta, con
            atención al detalle.
          </p>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 max-w-md mb-12"
        >
          {[
            { value: projects.length, label: "Proyectos" },
            {
              value: projects.filter((p) => p.type === "mobile").length,
              label: "Mobile",
            },
            {
              value: projects.filter((p) => p.type === "web").length,
              label: "Web",
            },
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
                {s.value}
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
          className="flex gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-2 rounded-md text-sm transition-colors duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: activeFilter === cat ? "#D4FF3D" : "transparent",
                color: activeFilter === cat ? "#0A0A0B" : "#8A8A85",
                border: `1px solid ${activeFilter === cat ? "#D4FF3D" : "#2A2A28"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Proyectos
