'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

interface Bottle3DProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  intensity?: number // How strongly it reacts to mouse (default 1)
  enableFloat?: boolean // Enable floating animation
  enableGlow?: boolean // Enable glow effect behind bottle
  glowColor?: string // Custom glow color
}

export default function Bottle3D({
  src,
  alt,
  width = 320,
  height = 640,
  className = '',
  intensity = 1,
  enableFloat = true,
  enableGlow = true,
  glowColor = 'rgba(76, 110, 60, 0.25)',
}: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [floatOffset, setFloatOffset] = useState(0)
  const animationRef = useRef<number>(0)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  // Smooth interpolation loop
  useEffect(() => {
    let running = true

    const animate = () => {
      if (!running) return

      // Lerp towards target
      const lerpFactor = 0.08
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor

      setRotation({
        x: currentRotation.current.x,
        y: currentRotation.current.y,
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Floating animation
  useEffect(() => {
    if (!enableFloat) return

    let running = true
    const startTime = Date.now()

    const animateFloat = () => {
      if (!running) return
      const elapsed = (Date.now() - startTime) / 1000
      // Combine two sine waves for organic motion
      const offset = Math.sin(elapsed * 0.8) * 8 + Math.sin(elapsed * 1.3) * 4
      setFloatOffset(offset)
      requestAnimationFrame(animateFloat)
    }

    requestAnimationFrame(animateFloat)
    return () => { running = false }
  }, [enableFloat])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)

      // Clamp values
      const clampedX = Math.max(-1, Math.min(1, normalizedX))
      const clampedY = Math.max(-1, Math.min(1, normalizedY))

      const maxRotation = 25 * intensity

      targetRotation.current = {
        x: -clampedY * maxRotation * 0.6, // Tilt forward/backward (less)
        y: clampedX * maxRotation,         // Rotate left/right (more)
      }
    },
    [intensity]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    targetRotation.current = { x: 0, y: 0 }
  }, [])

  // Dynamic lighting based on rotation
  const lightAngle = Math.atan2(rotation.y, rotation.x) * (180 / Math.PI) + 90
  const lightIntensity = Math.sqrt(rotation.x ** 2 + rotation.y ** 2) / 25
  const shadowOffsetX = rotation.y * 1.5
  const shadowOffsetY = 20 + Math.abs(rotation.x) * 0.5
  const shadowBlur = 40 - lightIntensity * 10
  const shadowScale = 1 - lightIntensity * 0.15

  // Reflection/specular highlight position
  const specularX = 50 - rotation.y * 2
  const specularY = 30 - rotation.x * 2

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        cursor: 'grab',
      }}
    >
      {/* Ambient glow */}
      {enableGlow && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: '70%',
            height: '50%',
            top: '25%',
            left: '15%',
            background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: isHovering ? 0.8 : 0.4,
            transition: 'opacity 0.6s ease',
            transform: `translate(${rotation.y * 0.5}px, ${rotation.x * 0.3}px)`,
          }}
        />
      )}

      {/* Shadow on the ground */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '2%',
          left: '50%',
          width: '55%',
          height: '20px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25), transparent 70%)',
          transform: `translateX(-50%) translateX(${shadowOffsetX}px) scaleX(${shadowScale})`,
          filter: `blur(${shadowBlur}px)`,
          opacity: isHovering ? 0.7 : 0.4,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Main bottle container */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            translateY(${floatOffset}px)
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg)
            scale(${isHovering ? 1.05 : 1})
          `,
          transition: isHovering ? 'transform 0.05s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
        }}
      >
        {/* Bottle image */}
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain h-auto w-auto select-none"
            style={{
              filter: `
                drop-shadow(${shadowOffsetX * 0.3}px ${shadowOffsetY}px ${shadowBlur}px rgba(0,0,0,0.3))
              `,
              pointerEvents: 'none',
            }}
            priority
            draggable={false}
          />

          {/* Specular highlight overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${specularX}% ${specularY}%, rgba(255,255,255,${0.08 + lightIntensity * 0.15}), transparent 50%)`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Edge lighting */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${lightAngle}deg, rgba(255,255,255,${lightIntensity * 0.12}), transparent 40%, rgba(0,0,0,${lightIntensity * 0.06}) 100%)`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>

      {/* Interaction hint - subtle pulse animation */}
      {!isHovering && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground/50 animate-pulse"
          style={{
            animation: 'fadeInHint 2s ease-in-out',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M8 12l4-4 4 4" />
            <path d="M8 16l4-4 4 4" />
          </svg>
          <span>Mové el mouse</span>
        </div>
      )}
    </div>
  )
}
