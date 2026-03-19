"use client"

import React, { useState, useRef } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  Github,
  ExternalLink,
  Smartphone,
  Monitor,
  Sparkles,
  Code2,
} from "lucide-react"

/* ── Tipos ── */
type Project = {
  id: number
  title: string
  description: string
  image: string
  type: "mobile" | "web"
  github: string
  demo: string
  technologies: string[]
  accentColor: string
  glowColor: string
  size: "large" | "medium" | "small"
  category: string
}

/* ── Grid de fondo ── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="proyectos-grid-bg"
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
        fill="url(#proyectos-grid-bg)"
      />
    </svg>
  </div>
)

/* ── Orbs ── */
const Orbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        top: "-15%",
        right: "-10%",
      }}
      animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        bottom: "5%",
        left: "-5%",
      }}
      animate={{ scale: [1, 1.15, 1], y: [0, -25, 0] }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />
  </div>
)

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
    demo: "https://lcs-staffing-users.vercel.app/",
    technologies: ["React Native", "Expo", "Firebase", "CSS"],
    accentColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.2)",
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
    demo: "https://lcs-staffing-admin.vercel.app/",
    technologies: ["React Native", "Expo", "Firebase", "CSS"],
    accentColor: "#818cf8",
    glowColor: "rgba(129,140,248,0.2)",
    size: "medium",
    category: "Mobile",
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
    accentColor: "#7dd3fc",
    glowColor: "rgba(125,211,252,0.2)",
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
    demo: "https://sticker-smash-theta.vercel.app/",
    technologies: ["React Native", "Expo", "CSS"],
    accentColor: "#0ea5e9",
    glowColor: "rgba(14,165,233,0.2)",
    size: "small",
    category: "Mobile",
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
    accentColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.2)",
    size: "large",
    category: "Web",
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
    accentColor: "#818cf8",
    glowColor: "rgba(129,140,248,0.2)",
    size: "medium",
    category: "Web",
  },
]

const categories = ["Todos", "Web", "Mobile"]

/* ── ProjectCard con tilt 3D ── */
const ProjectCard = ({
  project,
  index,
}: {
  project: Project
  index: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

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

  const TypeIcon = project.type === "mobile" ? Smartphone : Monitor
  const isLarge = project.size === "large"

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className={`relative cursor-pointer ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      {/* Halo exterior */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)`,
              filter: "blur(12px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Borde animado en hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={
          hovered
            ? {
                background: [
                  `linear-gradient(0deg,   ${project.accentColor}50, transparent, transparent)`,
                  `linear-gradient(90deg,  ${project.accentColor}50, transparent, transparent)`,
                  `linear-gradient(180deg, ${project.accentColor}50, transparent, transparent)`,
                  `linear-gradient(270deg, ${project.accentColor}50, transparent, transparent)`,
                  `linear-gradient(360deg, ${project.accentColor}50, transparent, transparent)`,
                ],
              }
            : {
                background: `linear-gradient(135deg, ${project.accentColor}20, transparent)`,
              }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Card interior */}
      <div
        className={`relative rounded-2xl overflow-hidden ${isLarge ? "min-h-[420px]" : "min-h-[300px]"}`}
        style={{
          background: "rgba(2, 12, 27, 0.88)",
          border: `1px solid ${hovered ? project.accentColor + "40" : "rgba(14,165,233,0.12)"}`,
          backdropFilter: "blur(20px)",
          transition: "border-color 0.3s",
          boxShadow: hovered
            ? `0 20px 60px ${project.glowColor}, 0 8px 32px rgba(0,0,0,0.5)`
            : "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Imagen con parallax */}
        <div className="absolute inset-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Overlay de color */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}35, ${project.glowColor})`,
              mixBlendMode: "multiply",
            }}
          />
          {/* Overlay oscuro desde abajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b] via-[#020c1bcc] to-[#020c1b55]" />
        </div>

        {/* Partículas flotantes en hover */}
        <AnimatePresence>
          {hovered &&
            [0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  backgroundColor: project.accentColor,
                  left: `${15 + i * 22}%`,
                  bottom: "25%",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -60, opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.18,
                  repeat: Infinity,
                }}
              />
            ))}
        </AnimatePresence>

        {/* Esquinas decorativas */}
        {[
          "top-0 left-0 border-t border-l rounded-tl-2xl",
          "top-0 right-0 border-t border-r rounded-tr-2xl",
          "bottom-0 left-0 border-b border-l rounded-bl-2xl",
          "bottom-0 right-0 border-b border-r rounded-br-2xl",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-5 h-5 pointer-events-none ${cls}`}
            animate={{
              borderColor: hovered ? project.accentColor + "80" : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-7">
          {/* Top row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {/* Badge tipo */}
              <motion.span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                animate={{
                  backgroundColor: hovered
                    ? project.accentColor + "25"
                    : "rgba(14,165,233,0.1)",
                  color: hovered ? project.accentColor : "#7dd3fc",
                  borderColor: hovered
                    ? project.accentColor + "50"
                    : "rgba(14,165,233,0.2)",
                }}
                style={{ border: "1px solid" }}
                transition={{ duration: 0.3 }}
              >
                <TypeIcon className="w-3 h-3" />
                {project.type === "mobile" ? "Mobile App" : "Web App"}
              </motion.span>

              {/* Número del proyecto */}
              <span className="text-xs font-mono text-slate-600">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Título */}
            <motion.h3
              className="font-black tracking-tight mb-3 leading-tight"
              animate={{ color: hovered ? project.accentColor : "#f1f5f9" }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: isLarge ? "clamp(1.5rem, 3vw, 2.2rem)" : "1.4rem",
              }}
            >
              {project.title}
            </motion.h3>

            {/* Descripción */}
            <motion.p
              className="text-slate-400 leading-relaxed font-light"
              animate={{ opacity: hovered ? 1 : 0.75 }}
              style={{ fontSize: isLarge ? "1rem" : "0.875rem" }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Bottom */}
          <div className="mt-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-2.5 py-1 text-xs font-semibold rounded-full cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              {/* GitHub */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                  backdropFilter: "blur(8px)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.35 }}
                />
                <Github className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Código</span>
              </motion.a>

              {/* Demo */}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}99)`,
                    boxShadow: `0 0 20px ${project.glowColor}`,
                    color: "#fff",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.35 }}
                  />
                  <ExternalLink className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${project.accentColor}, transparent)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.4, duration: 0.9 }}
        />
      </div>
    </motion.div>
  )
}

/* ── COMPONENTE PRINCIPAL ── */
const Proyectos = () => {
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filtered = projects.filter(
    (p) => activeFilter === "Todos" || p.category === activeFilter,
  )

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

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(56,189,248,0.1))",
                  border: "1px solid rgba(14,165,233,0.3)",
                }}
              >
                <Code2 className="w-10 h-10 text-sky-400" />
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
            Portafolio · Trabajos
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
            Proyectos{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Destacados
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed"
          >
            Desde aplicaciones móviles hasta plataformas web — cada proyecto
            construido con atención al detalle
          </motion.p>

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
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
        >
          {[
            { value: `${projects.length}`, label: "Proyectos" },
            {
              value: `${projects.filter((p) => p.type === "mobile").length}`,
              label: "Mobile Apps",
            },
            {
              value: `${projects.filter((p) => p.type === "web").length}`,
              label: "Web Apps",
            },
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
              <div className="text-2xl font-black text-sky-300">{s.value}</div>
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
          className="flex justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-6 py-2.5 rounded-full text-sm font-semibold overflow-hidden"
              style={
                activeFilter === cat
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
              {activeFilter === cat && (
                <motion.div
                  layoutId="projectPill"
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

        {/* ── Bento Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
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

export default Proyectos
