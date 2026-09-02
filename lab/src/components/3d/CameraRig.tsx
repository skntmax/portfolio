import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useLabStore } from '@/hooks/useLabStore'

type CamPose = { pos: [number, number, number]; look: [number, number, number] }

const poses: Record<string, CamPose> = {
  intro: { pos: [0.2, 0.15, 4.0], look: [0.4, 0.05, 0] },
  engineer: { pos: [0.9, 0.3, 3.7], look: [0.45, 0.08, 0] },
  scale: { pos: [-0.6, 0.4, 3.5], look: [0.1, 0.05, 0] },
  architecture: { pos: [0.5, 0.15, 3.4], look: [0.3, 0, 0] },
  flagship: { pos: [-0.7, 0.35, 3.6], look: [0.1, 0.05, 0] },
  contact: { pos: [0.15, 0.2, 4.6], look: [0.2, 0, 0] },
}

export function CameraRig() {
  const look = useRef(new THREE.Vector3(0.4, 0.05, 0))
  const phase = useLabStore((s) => s.phase)
  const reducedMotion = useLabStore((s) => s.reducedMotion)
  const mobile = useLabStore((s) => s.mobile)
  const pointer = useLabStore((s) => s.pointer)

  useFrame((state, delta) => {
    const { camera } = state
    const pose = poses[phase] ?? poses.intro
    const dt = Math.min(delta, 0.05)
    const damp = reducedMotion ? 12 : 1.6

    const parallaxX = mobile || reducedMotion ? 0 : pointer.x * 0.28
    const parallaxY = mobile || reducedMotion ? 0 : pointer.y * 0.16

    const tx = (mobile ? pose.pos[0] * 0.3 : pose.pos[0]) + parallaxX
    const ty = pose.pos[1] + parallaxY
    const tz = mobile ? pose.pos[2] + 0.5 : pose.pos[2]

    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, damp, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, damp, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, damp, dt)

    look.current.x = THREE.MathUtils.damp(look.current.x, pose.look[0], damp, dt)
    look.current.y = THREE.MathUtils.damp(look.current.y, pose.look[1], damp, dt)
    look.current.z = THREE.MathUtils.damp(look.current.z, pose.look[2], damp, dt)
    camera.lookAt(look.current)
  })

  return null
}
