'use client'

import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useTexture, Float } from '@react-three/drei'
import * as THREE from 'three'

// ── Bottle shape profile (lathe geometry) ──
function createBottlePoints(): THREE.Vector2[] {
  const points: THREE.Vector2[] = []

  // Bottom flat
  points.push(new THREE.Vector2(0, 0))
  points.push(new THREE.Vector2(0.38, 0))

  // Bottom edge (slight round)
  points.push(new THREE.Vector2(0.40, 0.02))
  points.push(new THREE.Vector2(0.42, 0.06))

  // Body (straight-ish with subtle curve)
  points.push(new THREE.Vector2(0.42, 0.15))
  points.push(new THREE.Vector2(0.43, 0.5))
  points.push(new THREE.Vector2(0.43, 1.0))
  points.push(new THREE.Vector2(0.43, 1.5))
  points.push(new THREE.Vector2(0.42, 1.8))

  // Shoulder (transition to neck)
  points.push(new THREE.Vector2(0.40, 1.9))
  points.push(new THREE.Vector2(0.35, 2.0))
  points.push(new THREE.Vector2(0.28, 2.08))
  points.push(new THREE.Vector2(0.20, 2.15))

  // Neck
  points.push(new THREE.Vector2(0.16, 2.2))
  points.push(new THREE.Vector2(0.15, 2.4))
  points.push(new THREE.Vector2(0.15, 2.6))
  points.push(new THREE.Vector2(0.15, 2.75))

  // Lip / cork area
  points.push(new THREE.Vector2(0.17, 2.78))
  points.push(new THREE.Vector2(0.18, 2.80))
  points.push(new THREE.Vector2(0.18, 2.88))
  points.push(new THREE.Vector2(0.16, 2.90))
  points.push(new THREE.Vector2(0.12, 2.92))

  // Cork top
  points.push(new THREE.Vector2(0.13, 2.95))
  points.push(new THREE.Vector2(0.14, 3.05))
  points.push(new THREE.Vector2(0.10, 3.10))
  points.push(new THREE.Vector2(0, 3.10))

  return points
}

// ── Label on the bottle ──
function BottleLabel({ texture }: { texture: THREE.Texture }) {
  const labelRef = useRef<THREE.Mesh>(null!)

  // Label is a curved plane wrapping around the bottle body
  const labelGeom = useMemo(() => {
    const geom = new THREE.CylinderGeometry(
      0.435,   // top radius (slightly larger than bottle body)
      0.435,   // bottom radius
      0.9,     // height of the label
      64,      // segments
      1,       // height segments
      true,    // open ended
      -Math.PI * 0.6,  // start angle
      Math.PI * 1.2    // sweep angle (~216 degrees)
    )
    return geom
  }, [])

  return (
    <mesh
      ref={labelRef}
      geometry={labelGeom}
      position={[0, 1.05, 0]}
    >
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.FrontSide}
        roughness={0.4}
        metalness={0.05}
      />
    </mesh>
  )
}

// ── The glass bottle ──
function BottleGlass() {
  const points = useMemo(() => createBottlePoints(), [])
  const geometry = useMemo(() => {
    const geom = new THREE.LatheGeometry(points, 64)
    return geom
  }, [points])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#e8e4d8"
        transparent
        opacity={0.45}
        roughness={0.1}
        metalness={0.05}
        transmission={0.6}
        thickness={0.5}
        envMapIntensity={1.2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        ior={1.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Liquid inside ──
function BottleLiquid() {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = []
    pts.push(new THREE.Vector2(0, 0.08))
    pts.push(new THREE.Vector2(0.38, 0.08))
    pts.push(new THREE.Vector2(0.40, 0.10))
    pts.push(new THREE.Vector2(0.40, 0.5))
    pts.push(new THREE.Vector2(0.40, 1.0))
    pts.push(new THREE.Vector2(0.40, 1.4))
    // Liquid surface
    pts.push(new THREE.Vector2(0, 1.4))
    return pts
  }, [])

  const geometry = useMemo(() => {
    return new THREE.LatheGeometry(points, 64)
  }, [points])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#d4c98a"
        transparent
        opacity={0.55}
        roughness={0.2}
        metalness={0.0}
        transmission={0.3}
        thickness={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Bottle group with interactions ──
function BottleModel() {
  const groupRef = useRef<THREE.Group>(null!)
  const [isDragging, setIsDragging] = useState(false)
  const [prevX, setPrevX] = useState(0)
  const rotationVelocity = useRef(0)
  const targetRotation = useRef(0)
  const { gl } = useThree()

  // Load the mezcal label texture
  const labelTexture = useTexture(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png'
  )

  // Configure label texture
  useEffect(() => {
    if (labelTexture) {
      labelTexture.wrapS = THREE.ClampToEdgeWrapping
      labelTexture.wrapT = THREE.ClampToEdgeWrapping
      labelTexture.flipY = false
      labelTexture.needsUpdate = true
    }
  }, [labelTexture])

  // Mouse/touch interactions
  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      setIsDragging(true)
      setPrevX(e.clientX)
      canvas.style.cursor = 'grabbing'
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevX
      rotationVelocity.current = deltaX * 0.008
      targetRotation.current += deltaX * 0.008
      setPrevX(e.clientX)
    }

    const onPointerUp = () => {
      setIsDragging(false)
      canvas.style.cursor = 'grab'
    }

    canvas.style.cursor = 'grab'
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
    }
  }, [gl, isDragging, prevX])

  // Animation loop
  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Auto rotation when not dragging
    if (!isDragging) {
      targetRotation.current += delta * 0.3
      // Dampen velocity
      rotationVelocity.current *= 0.95
      targetRotation.current += rotationVelocity.current
    }

    // Smooth lerp to target
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current,
      0.1
    )
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} position={[0, -1.5, 0]} scale={1}>
        <BottleGlass />
        <BottleLiquid />
        <BottleLabel texture={labelTexture} />
      </group>
    </Float>
  )
}

// ── Loading placeholder ──
function LoadingPlaceholder() {
  return (
    <mesh>
      <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
      <meshStandardMaterial
        color="#d4c98a"
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// ── Main exported component ──
export default function Bottle3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-64 rounded-lg bg-primary/5 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="w-full h-full" style={{ touchAction: 'pan-y' }}>
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
        />
        <directionalLight
          position={[-3, 3, -2]}
          intensity={0.4}
          color="#ffeedd"
        />
        <spotLight
          position={[0, 8, 0]}
          intensity={0.5}
          angle={0.5}
          penumbra={1}
          color="#ffffff"
        />
        {/* Rim light from behind */}
        <pointLight
          position={[0, 1, -3]}
          intensity={0.8}
          color="#ffd4a0"
        />

        <Suspense fallback={<LoadingPlaceholder />}>
          <BottleModel />
          <Environment preset="studio" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
