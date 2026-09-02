import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useLabStore } from '@/hooks/useLabStore'
import type { Group, InstancedMesh } from 'three'

type LayerDef = {
  id: string
  label: string
  kind: string
  y: number
  radius: number
  count: number
  color: string
}

const LAYERS: LayerDef[] = [
  { id: 'clients', label: 'Clients', kind: 'CLIENT', y: 1.55, radius: 1.55, count: 8, color: '#94a3b8' },
  { id: 'gateway', label: 'API Gateway', kind: 'API', y: 1.05, radius: 1.2, count: 6, color: '#2dd4bf' },
  { id: 'services', label: 'Microservices', kind: 'SERVICE', y: 0.5, radius: 1.45, count: 10, color: '#14b8a6' },
  { id: 'kafka', label: 'Kafka Event Bus', kind: 'SERVICE', y: 0.05, radius: 1.7, count: 12, color: '#5eead4' },
  { id: 'redis', label: 'Redis Cache', kind: 'CACHE', y: -0.4, radius: 1.15, count: 7, color: '#38bdf8' },
  { id: 'database', label: 'Database', kind: 'DATABASE', y: -0.9, radius: 1.0, count: 5, color: '#94a3b8' },
  { id: 'obs', label: 'Observability', kind: 'OBS', y: -1.3, radius: 1.35, count: 8, color: '#64748b' },
]

function phaseMorph(phase: string) {
  switch (phase) {
    case 'intro':
      return { open: 0.28, spin: 0.045, packet: 0.4, collapse: 0 }
    case 'engineer':
      return { open: 0.62, spin: 0.07, packet: 0.55, collapse: 0 }
    case 'scale':
      return { open: 0.9, spin: 0.12, packet: 1.05, collapse: 0 }
    case 'architecture':
      return { open: 1, spin: 0.08, packet: 0.75, collapse: 0 }
    case 'flagship':
      return { open: 0.95, spin: 0.14, packet: 1.2, collapse: 0.1 }
    case 'contact':
      return { open: 0.12, spin: 0.03, packet: 0.15, collapse: 0.85 }
    default:
      return { open: 0.3, spin: 0.06, packet: 0.4, collapse: 0 }
  }
}

function NodeLabel({
  kind,
  name,
  visible,
}: {
  kind: string
  name: string
  visible: boolean
}) {
  if (!visible) return null
  return (
    <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div className="node-label">
        <span>{kind}</span>
        <strong>{name}</strong>
      </div>
    </Html>
  )
}

function ServiceLayer({
  layer,
  activeId,
}: {
  layer: LayerDef
  activeId: string | null
}) {
  const mesh = useRef<InstancedMesh>(null)
  const labelGroup = useRef<Group>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const mobile = useLabStore((s) => s.mobile)
  const phase = useLabStore((s) => s.phase)
  const morph = useRef({ open: 0.22, collapse: 0 })
  const hover = activeId === layer.id

  const count = mobile ? Math.max(3, Math.floor(layer.count * 0.55)) : layer.count

  useFrame((state, delta) => {
    const target = phaseMorph(phase)
    const dt = Math.min(delta, 0.05)
    morph.current.open = THREE.MathUtils.damp(morph.current.open, target.open, 2.2, dt)
    morph.current.collapse = THREE.MathUtils.damp(
      morph.current.collapse,
      target.collapse,
      2.4,
      dt,
    )

    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const { open, collapse } = morph.current
    const spread = THREE.MathUtils.lerp(0.15, 1, open)
    const pull = THREE.MathUtils.lerp(1, 0.08, collapse)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + t * 0.08
      const r = layer.radius * spread * pull
      const y = THREE.MathUtils.lerp(0, layer.y, open) * (1 - collapse * 0.9)
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
      const s = hover ? 0.085 : 0.055
      dummy.scale.setScalar(s * (1 - collapse * 0.5))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true

    if (labelGroup.current) {
      labelGroup.current.position.set(
        0,
        THREE.MathUtils.lerp(0, layer.y, open),
        layer.radius * open * 0.35,
      )
    }
  })

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          color={layer.color}
          emissive={layer.color}
          emissiveIntensity={hover ? 0.55 : 0.22}
          metalness={0.7}
          roughness={0.35}
        />
      </instancedMesh>
      <group ref={labelGroup}>
        <NodeLabel kind={layer.kind} name={layer.label} visible={hover && !mobile} />
      </group>
    </group>
  )
}

function DataPackets() {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const phase = useLabStore((s) => s.phase)
  const intensity = useRef(0.35)
  const count = 28
  const paths = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2
      return {
        a,
        speed: 0.35 + (i % 5) * 0.12,
        radius: 0.7 + (i % 4) * 0.28,
        phase: i * 0.37,
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current) return
    const target = phaseMorph(phase).packet
    intensity.current = THREE.MathUtils.damp(
      intensity.current,
      target,
      2,
      Math.min(delta, 0.05),
    )
    const t = state.clock.elapsedTime
    const amp = intensity.current
    for (let i = 0; i < count; i++) {
      const p = paths[i]
      const u = (t * p.speed * amp + p.phase) % 1
      const y = 1.5 - u * 2.9
      const r = p.radius * (0.6 + Math.sin(u * Math.PI) * 0.5)
      dummy.position.set(Math.cos(p.a + u) * r, y, Math.sin(p.a + u) * r)
      dummy.scale.setScalar(0.028 * Math.max(amp, 0.15))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.visible = amp > 0.2
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#2dd4bf" transparent opacity={0.75} />
    </instancedMesh>
  )
}

function ConnectionCurves() {
  const phase = useLabStore((s) => s.phase)
  const group = useRef<Group>(null)
  const curves = useMemo(() => {
    const pts: THREE.Vector3[][] = []
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      pts.push([
        new THREE.Vector3(Math.cos(a) * 1.4, 1.4, Math.sin(a) * 1.4),
        new THREE.Vector3(Math.cos(a + 0.3) * 0.9, 0.4, Math.sin(a + 0.3) * 0.9),
        new THREE.Vector3(Math.cos(a + 0.6) * 1.2, -0.5, Math.sin(a + 0.6) * 1.2),
        new THREE.Vector3(Math.cos(a + 0.9) * 0.7, -1.15, Math.sin(a + 0.9) * 0.7),
      ])
    }
    return pts
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    const open = phaseMorph(phase).open
    group.current.children.forEach((child) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial
      if (mat?.opacity !== undefined) {
        mat.opacity = THREE.MathUtils.damp(
          mat.opacity,
          0.18 + open * 0.22,
          3,
          Math.min(delta, 0.05),
        )
      }
    })
  })

  return (
    <group ref={group}>
      {curves.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#14b8a6"
          transparent
          opacity={0.28}
          lineWidth={1}
        />
      ))}
    </group>
  )
}

export function DistributedSystem() {
  const root = useRef<Group>(null)
  const core = useRef<Group>(null)
  const phase = useLabStore((s) => s.phase)
  const reducedMotion = useLabStore((s) => s.reducedMotion)
  const mobile = useLabStore((s) => s.mobile)
  const pointer = useLabStore((s) => s.pointer)
  const setHoveredNode = useLabStore((s) => s.setHoveredNode)
  const hoveredNode = useLabStore((s) => s.hoveredNode)
  const morph = useRef(phaseMorph('intro'))
  const layerCenters = useRef<Record<string, THREE.Vector3>>({})

  useFrame((_, delta) => {
    const target = phaseMorph(phase)
    const dt = Math.min(delta, 0.05)
    morph.current.open = THREE.MathUtils.damp(morph.current.open, target.open, 2.2, dt)
    morph.current.spin = THREE.MathUtils.damp(morph.current.spin, target.spin, 2, dt)
    morph.current.collapse = THREE.MathUtils.damp(
      morph.current.collapse,
      target.collapse,
      2.4,
      dt,
    )

    if (!root.current) return
    if (!reducedMotion) {
      root.current.rotation.y += dt * morph.current.spin
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        pointer.y * 0.12 + Math.sin(performance.now() * 0.00015) * 0.04,
        2.5,
        dt,
      )
      root.current.rotation.z = THREE.MathUtils.damp(
        root.current.rotation.z,
        -pointer.x * 0.08,
        2.5,
        dt,
      )
    }

    const base = mobile ? 0.72 : 1
    const collapseScale = THREE.MathUtils.lerp(1, 0.42, morph.current.collapse)
    root.current.scale.setScalar(base * collapseScale)
    root.current.position.set(mobile ? 0 : 1.05, 0.05, 0)

    const coreHover = hoveredNode === 'core'
    if (core.current) {
      const pulse = 1 + Math.sin(performance.now() * 0.002) * 0.03
      core.current.scale.setScalar(pulse * (coreHover ? 1.08 : 1))
    }

    // Proximity inspect from screen pointer (canvas has pointer-events: none)
    if (!mobile && !reducedMotion) {
      const { open, collapse } = morph.current
      let best: string | null = null
      let bestScore = 0.22
      const px = pointer.x
      const py = pointer.y

      // Approximate NDC proximity using projected layer centers
      for (const layer of LAYERS) {
        const y = THREE.MathUtils.lerp(0, layer.y, open) * (1 - collapse * 0.9)
        const r = layer.radius * THREE.MathUtils.lerp(0.15, 1, open)
        // Map world-ish coords into rough NDC band on the right half
        const nx = (mobile ? 0 : 0.28) + (r / 8)
        const ny = y / 4
        const score = Math.hypot(px - nx, py - ny)
        if (score < bestScore) {
          bestScore = score
          best = layer.id
        }
        layerCenters.current[layer.id] = new THREE.Vector3(nx, ny, 0)
      }
      const coreScore = Math.hypot(px - (mobile ? 0 : 0.28), py - 0.02)
      if (coreScore < bestScore) best = 'core'
      if (best !== hoveredNode) setHoveredNode(best)
    }
  })

  const coreHover = hoveredNode === 'core'

  return (
    <group ref={root}>
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.22}
            emissive="#14b8a6"
            emissiveIntensity={coreHover ? 0.7 : 0.38}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.48, 0]} />
          <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.25} />
        </mesh>
        <NodeLabel
          kind="CORE"
          name="Computational Core"
          visible={coreHover && !mobile}
        />
      </group>

      <mesh rotation={[Math.PI / 2.1, 0.2, 0]}>
        <torusGeometry args={[1.85, 0.008, 8, 96]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 3.2, -0.35, 0.2]}>
        <torusGeometry args={[2.25, 0.006, 8, 96]} />
        <meshBasicMaterial color="#64748b" transparent opacity={0.22} />
      </mesh>

      <ConnectionCurves />
      <DataPackets />

      {LAYERS.map((layer) => (
        <ServiceLayer key={layer.id} layer={layer} activeId={hoveredNode} />
      ))}
    </group>
  )
}

export function ProceduralFallback() {
  return <DistributedSystem />
}
