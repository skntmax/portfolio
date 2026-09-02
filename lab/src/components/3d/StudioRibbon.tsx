import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useLabStore } from '@/hooks/useLabStore'
import { useThemeStore } from '@/hooks/useTheme'
import type { Group } from 'three'

function phaseMorph(phase: string) {
  switch (phase) {
    case 'intro':
      return { spin: 0.07, scale: 1.7, y: 0.05, x: 0.7 }
    case 'engineer':
      return { spin: 0.1, scale: 1.45, y: 0.12, x: 0.85 }
    case 'scale':
      return { spin: 0.14, scale: 1.9, y: -0.08, x: -0.45 }
    case 'architecture':
      return { spin: 0.08, scale: 1.35, y: 0.18, x: 0.95 }
    case 'flagship':
      return { spin: 0.15, scale: 1.6, y: 0.1, x: -0.55 }
    case 'contact':
      return { spin: 0.04, scale: 1.2, y: 0, x: 0.4 }
    default:
      return { spin: 0.07, scale: 1.55, y: 0, x: 0.55 }
  }
}

export function StudioRibbon() {
  const root = useRef<Group>(null)
  const { scene } = useGLTF('/models/studio-ribbon.glb')
  const phase = useLabStore((s) => s.phase)
  const reducedMotion = useLabStore((s) => s.reducedMotion)
  const mobile = useLabStore((s) => s.mobile)
  const pointer = useLabStore((s) => s.pointer)
  const theme = useThemeStore((s) => s.theme)
  const morph = useRef(phaseMorph('intro'))

  const clone = useMemo(() => {
    const rootObj = scene.clone(true)
    rootObj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = false
        mesh.receiveShadow = false
        mesh.material = new THREE.MeshStandardMaterial({
          color: theme === 'light' ? '#0f766e' : '#0c1a1d',
          emissive: theme === 'light' ? '#14b8a6' : '#5ff5d2',
          emissiveIntensity: theme === 'light' ? 0.7 : 2.1,
          metalness: 0.42,
          roughness: 0.22,
        })
      }
    })
    return rootObj
  }, [scene, theme])

  useFrame((_, delta) => {
    if (!root.current) return
    const target = phaseMorph(phase)
    const dt = Math.min(delta, 0.05)
    morph.current.spin = THREE.MathUtils.damp(morph.current.spin, target.spin, 1.8, dt)
    morph.current.scale = THREE.MathUtils.damp(
      morph.current.scale,
      target.scale * (mobile ? 0.8 : 1),
      1.8,
      dt,
    )
    morph.current.y = THREE.MathUtils.damp(morph.current.y, target.y, 1.8, dt)
    morph.current.x = THREE.MathUtils.damp(
      morph.current.x,
      mobile ? 0.15 : target.x,
      1.8,
      dt,
    )

    if (!reducedMotion) {
      root.current.rotation.y += dt * morph.current.spin
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        pointer.y * 0.12 + 0.1,
        2.2,
        dt,
      )
      root.current.rotation.z = THREE.MathUtils.damp(
        root.current.rotation.z,
        -pointer.x * 0.08,
        2.2,
        dt,
      )
    }

    root.current.position.x = morph.current.x
    root.current.position.y = morph.current.y
    root.current.scale.setScalar(morph.current.scale)
  })

  return (
    <group ref={root}>
      <primitive object={clone} />
    </group>
  )
}

export function StudioRibbonFallback() {
  const ref = useRef<Group>(null)
  const reducedMotion = useLabStore((s) => s.reducedMotion)

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y += delta * 0.1
  })

  return (
    <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={ref} scale={1.9} position={[0.7, 0.05, -0.2]}>
        <mesh rotation={[0.35, 0.25, -0.25]}>
          <torusKnotGeometry args={[1.55, 0.45, 220, 32]} />
          <meshStandardMaterial
            color="#0c1a1d"
            emissive="#5ff5d2"
            emissiveIntensity={2.2}
            metalness={0.4}
            roughness={0.22}
          />
        </mesh>
      </group>
    </Float>
  )
}
