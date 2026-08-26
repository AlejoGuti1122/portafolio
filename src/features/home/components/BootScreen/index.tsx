"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Diego Alejandro Cuesta Gutiérrez" },
  { prompt: true, text: "status" },
  { prompt: false, text: "listo." },
]

const BootScreen = () => {
  const reduceMotion = useReducedMotion()
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduceMotion || done) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [reduceMotion, done])

  useEffect(() => {
    if (reduceMotion || done || lineIndex >= LINES.length) return
    const line = LINES[lineIndex]
    if (charIndex < line.text.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), 22)
      return () => clearTimeout(timer)
    }
    const next = setTimeout(() => {
      if (lineIndex === LINES.length - 1) {
        setTimeout(() => setDone(true), 450)
      } else {
        setLineIndex((i) => i + 1)
        setCharIndex(0)
      }
    }, 300)
    return () => clearTimeout(next)
  }, [reduceMotion, done, lineIndex, charIndex])

  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: "#0A0A0B" }}
        >
          <div
            className="w-full max-w-md px-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {LINES.slice(0, lineIndex + 1).map((line, i) => {
              const isCurrent = i === lineIndex
              const text = isCurrent ? line.text.slice(0, charIndex) : line.text
              return (
                <p key={i} className="text-sm mb-2" style={{ color: line.prompt ? "#8A8A85" : "#F5F4EF" }}>
                  {line.prompt && <span style={{ color: "#D4FF3D" }}>$ </span>}
                  {text}
                  {isCurrent && (
                    <span
                      className="inline-block w-2 h-4 ml-0.5 align-middle"
                      style={{ background: "#D4FF3D" }}
                    />
                  )}
                </p>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootScreen
