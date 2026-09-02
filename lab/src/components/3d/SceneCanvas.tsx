import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { HeroScene } from '@/components/3d/HeroScene'
import { useLabStore } from '@/hooks/useLabStore'

export function SceneCanvas() {
  const reducedMotion = useLabStore((s) => s.reducedMotion)
  const mobile = useLabStore((s) => s.mobile)
  const setPointer = useLabStore((s) => s.setPointer)

  useEffect(() => {
    if (mobile) return
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setPointer(x, y)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mobile, setPointer])

  return (
    <div className="canvas-root" aria-hidden={false}>
      <Canvas
        dpr={mobile ? 1 : [1, 1.35]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0.2, 0.2, 4.0], fov: 45, near: 0.1, far: 60 }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        style={{ pointerEvents: 'none', background: '#000' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1)
          gl.domElement.setAttribute('role', 'img')
          gl.domElement.setAttribute(
            'aria-label',
            'Blender studio sculpture background. Scroll to evolve the scene.',
          )
        }}
      >
        <HeroScene />
      </Canvas>
    </div>
  )
}
