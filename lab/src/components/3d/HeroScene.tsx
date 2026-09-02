import { Float } from '@react-three/drei'
import { Suspense } from 'react'
import { StudioRibbon, StudioRibbonFallback } from './StudioRibbon'
import { CameraRig } from './CameraRig'
import { LightingSystem } from './LightingSystem'
import { useLabStore } from '@/hooks/useLabStore'
import { useThemeStore } from '@/hooks/useTheme'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

function Atmosphere() {
  const theme = useThemeStore((s) => s.theme)
  const fog = theme === 'light' ? '#d9f3ee' : '#000000'
  return <fog attach="fog" args={[fog, 18, 42]} />
}

export function HeroScene() {
  const reducedMotion = useLabStore((s) => s.reducedMotion)
  const theme = useThemeStore((s) => s.theme)
  const mobile = useLabStore((s) => s.mobile)

  return (
    <>
      <color attach="background" args={[theme === 'light' ? '#d9f3ee' : '#000000']} />
      <LightingSystem />
      <Atmosphere />
      <CameraRig />
      <Suspense fallback={<StudioRibbonFallback />}>
        <ErrorBoundary fallback={<StudioRibbonFallback />}>
          {reducedMotion || mobile ? (
            <StudioRibbon />
          ) : (
            <Float speed={0.22} rotationIntensity={0.04} floatIntensity={0.08}>
              <StudioRibbon />
            </Float>
          )}
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
