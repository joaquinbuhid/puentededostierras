'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Float, ContactShadows, Text } from '@react-three/drei'
import * as THREE from 'three'

function Bottle({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<THREE.Group>(null)
  const labelGroup = useRef<THREE.Group>(null)

  // Crear la forma de la botella usando puntos para una geometría de revolución (LatheGeometry)
  const points = useMemo(() => {
    const pts = []
    // Base
    pts.push(new THREE.Vector2(0, -2))
    pts.push(new THREE.Vector2(1.2, -2))
    // Curva inferior
    pts.push(new THREE.Vector2(1.3, -1.8))
    // Cuerpo principal
    pts.push(new THREE.Vector2(1.3, 0.5))
    // Hombros
    pts.push(new THREE.Vector2(1.2, 0.8))
    pts.push(new THREE.Vector2(0.8, 1.2))
    pts.push(new THREE.Vector2(0.5, 1.5))
    // Cuello
    pts.push(new THREE.Vector2(0.4, 1.8))
    pts.push(new THREE.Vector2(0.4, 2.5))
    // Pico
    pts.push(new THREE.Vector2(0.5, 2.6))
    pts.push(new THREE.Vector2(0.4, 2.7))
    pts.push(new THREE.Vector2(0.4, 2.8))
    return pts
  }, [])

  useFrame((state) => {
    if (group.current) {
      // Rotación suave basada en el scroll y un ligero movimiento continuo
      const targetRotation = scrollProgress * Math.PI * 2
      group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.1
      
      // La etiqueta gira junto con la botella
      if (labelGroup.current) {
        labelGroup.current.rotation.y = group.current.rotation.y
      }
    }
  })

  return (
    <group>
      <group ref={group}>
        {/* Vidrio de la botella */}
        <mesh>
          <latheGeometry args={[points, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.1}
            thickness={0.2}
            chromaticAberration={0.05}
            anisotropy={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
            color="#e8f4e8" // Tinte ligeramente verdoso claro típico de mezcal
            transmission={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Líquido (Mezcal) interno */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[1.25, 1.15, 2.4, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff" // Mezcal cristalino
            transparent
            opacity={0.8}
            roughness={0.1}
            transmission={0.9}
            ior={1.33}
          />
        </mesh>

        {/* Corcho */}
        <mesh position={[0, 2.9, 0]}>
          <cylinderGeometry args={[0.35, 0.38, 0.4, 32]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
        </mesh>
      </group>

      {/* Etiqueta (separada para que los textos no se distorsionen con el vidrio) */}
      <group ref={labelGroup}>
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.31, 1.31, 1.2, 64]} />
          <meshStandardMaterial color="#f8f4e6" roughness={0.9} />
        </mesh>
        
        {/* Textos de la etiqueta */}
        <Text
          position={[0, -0.3, 1.32]}
          fontSize={0.15}
          color="#2b2b2b"
          anchorX="center"
          anchorY="middle"
        >
          PUENTE DE
        </Text>
        <Text
          position={[0, -0.55, 1.32]}
          fontSize={0.25}
          color="#2b2b2b"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          DOS TIERRAS
        </Text>
        <Text
          position={[0, -0.85, 1.32]}
          fontSize={0.12}
          color="#555"
          anchorX="center"
          anchorY="middle"
        >
          ESPADÍN JOVEN
        </Text>
        <Text
          position={[0, -1.05, 1.32]}
          fontSize={0.08}
          color="#888"
          anchorX="center"
          anchorY="middle"
        >
          100% AGAVE ARTESANAL
        </Text>
      </group>
    </group>
  )
}

export default function Bottle3D({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[550px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Movimiento flotante para darle vida */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Bottle scrollProgress={scrollProgress} />
        </Float>
        
        {/* Entorno HDRI para reflejos realistas en el vidrio */}
        <Environment preset="city" />
        
        {/* Sombra proyectada en el suelo */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  )
}
