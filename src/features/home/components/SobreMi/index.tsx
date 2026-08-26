"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

/* ── Paleta v2 (misma que Portada / Stack / Tiempo / Proyectos) ──
   bg: #0A0A0B · surface: #131316 · text: #F5F4EF · muted: #8A8A85
   accent: #D4FF3D · border: #2A2A28
*/

const SobreMi = () => {
  return (
    <div className="relative w-full py-24 px-6" style={{ background: "#0A0A0B" }}>
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="justify-self-center md:justify-self-start"
          >
            <div
              className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
              style={{ border: "1px solid #2A2A28" }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Diego Alejandro Cuesta Gutiérrez"
                width={224}
                height={224}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "#8A8A85" }}
            >
              Sobre mí
            </p>
            <h2
              className="font-bold mb-5"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F4EF",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Full Stack Developer
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed font-light"
              style={{ color: "#8A8A85" }}
            >
              Full Stack Developer con foco en Frontend. Construyo interfaces
              web y móviles con React, Next.js y React Native (Expo), con
              diseño responsive de punta a punta. En el backend trabajo con
              Node.js, Express y NestJS, integrando bases de datos
              relacionales y no relacionales (PostgreSQL, MongoDB, Firebase).
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SobreMi
