"use client"

import React, { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import {
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import * as THREE from "three"

/* ── Paleta v2 (misma que Portada / Stack / Tiempo / Proyectos) ──
   bg: #0A0A0B · surface: #131316 · accent: #D4FF3D
*/

const ACCENT = new THREE.Color("#D4FF3D")
const ACCENT_ALT = new THREE.Color("#3DDBFF")

const MAX_PARTICLES = 1400
const ALL_POSITIONS = (() => {
  const arr = new Float32Array(MAX_PARTICLES * 3)
  for (let i = 0; i < MAX_PARTICLES; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 14
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14
    arr[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  return arr
})()

const ParticleField = ({
  count,
  scrollProgress,
}: {
  count: number
  scrollProgress: MotionValue<number>
}) => {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("pointermove", handleMove)
    return () => window.removeEventListener("pointermove", handleMove)
  }, [])

  const positions = useMemo(
    () => ALL_POSITIONS.subarray(0, count * 3),
    [count],
  )

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return

    const progress = scrollProgress.get()

    points.rotation.y += delta * (0.02 + progress * 0.05)
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x,
      mouse.current.y * 0.12 + progress * 1.1,
      0.04,
    )
    points.rotation.y += mouse.current.x * 0.0003

    if (materialRef.current) {
      tmpColor
        .copy(ACCENT)
        .lerp(ACCENT_ALT, Math.sin(progress * Math.PI))
      materialRef.current.color.copy(tmpColor)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.035}
        color="#D4FF3D"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

const DistortedCore = ({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null)
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const progress = scrollProgress.get()

    mesh.rotation.x += delta * 0.06
    mesh.rotation.y += delta * (0.09 + progress * 0.14)
    mesh.position.y = THREE.MathUtils.lerp(0.4, -0.4, progress)

    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04
    const growth = 1 + progress * 0.3
    mesh.scale.setScalar(breathe * growth)

    if (materialRef.current) {
      tmpColor
        .copy(ACCENT)
        .lerp(ACCENT_ALT, Math.sin(progress * Math.PI))
      materialRef.current.emissive.copy(tmpColor)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <icosahedronGeometry args={[1.7, 4]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#131316"
        emissive="#D4FF3D"
        emissiveIntensity={0.06}
        distort={0.4}
        speed={1.1}
        roughness={0.5}
        metalness={0.1}
        wireframe
      />
    </mesh>
  )
}

/* Un "estado de cámara" por sección — el orden debe coincidir con el
   orden real de [data-scroll-section] en el documento. */
const CAMERA_WAYPOINTS = [
  { z: 5, x: 0, y: 0, rotZ: 0 }, // Portada
  { z: 4, x: -0.7, y: 0.2, rotZ: 0.035 }, // Stack
  { z: 3.4, x: 0.7, y: -0.15, rotZ: -0.045 }, // Tiempo
  { z: 4.4, x: 0, y: 0.25, rotZ: 0.03 }, // Proyectos
]

const smoothstep = (t: number) => t * t * (3 - 2 * t)

const useSectionBreakpoints = (count: number) => {
  const breakpointsRef = useRef<number[]>(
    Array.from({ length: count }, (_, i) => i / count),
  )

  useEffect(() => {
    const measure = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scroll-section]"),
      )
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      if (!sections.length || maxScroll <= 0) return
      breakpointsRef.current = sections.map((el) =>
        Math.min(el.offsetTop / maxScroll, 1),
      )
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return breakpointsRef
}

const CameraRig = ({
  scrollProgress,
  breakpointsRef,
}: {
  scrollProgress: MotionValue<number>
  breakpointsRef: React.MutableRefObject<number[]>
}) => {
  useFrame(({ camera }) => {
    const progress = scrollProgress.get()
    const breakpoints = breakpointsRef.current
    const lastIndex = CAMERA_WAYPOINTS.length - 1

    let segment = 0
    for (let i = 1; i < breakpoints.length; i++) {
      if (progress >= breakpoints[i]) segment = i
    }
    const nextSegment = Math.min(segment + 1, lastIndex)
    const segStart = breakpoints[segment] ?? 0
    const segEnd = breakpoints[nextSegment] ?? 1
    const span = Math.max(segEnd - segStart, 0.0001)
    const localT = Math.min(Math.max((progress - segStart) / span, 0), 1)
    const eased = smoothstep(localT)
    const punch = Math.sin(eased * Math.PI)

    const a = CAMERA_WAYPOINTS[segment]
    const b = CAMERA_WAYPOINTS[nextSegment]
    const rollDir = segment % 2 === 0 ? 1 : -1

    const targetZ = THREE.MathUtils.lerp(a.z, b.z, eased) - punch * 0.7
    const targetX = THREE.MathUtils.lerp(a.x, b.x, eased)
    const targetY = THREE.MathUtils.lerp(a.y, b.y, eased)
    const targetRotZ =
      THREE.MathUtils.lerp(a.rotZ, b.rotZ, eased) + punch * rollDir * 0.06

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.07)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.07)
    camera.lookAt(0, 0, 0)
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      targetRotZ,
      0.09,
    )

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = 55 - punch * 12
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1)
      camera.updateProjectionMatrix()
    }
  })
  return null
}

const Background3D = () => {
  const reduceMotion = useReducedMotion()
  const [particleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768
      ? 600
      : MAX_PARTICLES,
  )
  const { scrollYProgress } = useScroll()
  const breakpointsRef = useSectionBreakpoints(CAMERA_WAYPOINTS.length)

  if (reduceMotion) return null

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <CameraRig
          scrollProgress={scrollYProgress}
          breakpointsRef={breakpointsRef}
        />
        <ParticleField count={particleCount} scrollProgress={scrollYProgress} />
        <DistortedCore scrollProgress={scrollYProgress} />
      </Canvas>
    </div>
  )
}

export default Background3D
