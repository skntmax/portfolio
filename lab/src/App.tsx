import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigation } from '@/components/ui/Navigation'
import { SystemCursor } from '@/components/ui/SystemCursor'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Impact } from '@/components/sections/Impact'
import { SystemDesign } from '@/components/sections/SystemDesign'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { ProjectShorts } from '@/components/sections/ProjectShorts'
import { Experiments } from '@/components/sections/Experiments'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { usePrefers } from '@/hooks/usePrefers'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useThemeInit } from '@/hooks/useTheme'
import { useLabStore } from '@/hooks/useLabStore'
import { sceneStates } from '@/data/site'
import '@/styles/tokens.css'
import '@/styles/theme-toggle.css'

const SceneCanvas = lazy(() =>
  import('@/components/3d/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

function PhaseChip() {
  const phase = useLabStore((s) => s.phase)
  const label =
    sceneStates.find((s) => s.id === phase)?.label ?? 'System online'
  return (
    <div className="phase-chip" aria-live="polite">
      {label}
    </div>
  )
}

/** Mount WebGL after first paint so text/content is instant. */
function DeferredScene() {
  const [ready, setReady] = useState(false)
  const reducedMotion = useLabStore((s) => s.reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    let cancelled = false
    const start = () => {
      if (!cancelled) setReady(true)
    }

    const ric = window.requestIdleCallback?.bind(window)
    if (ric) {
      const id = ric(start, { timeout: 900 })
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(id)
      }
    }

    const t = window.setTimeout(start, 200)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [reducedMotion])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <SceneCanvas />
    </Suspense>
  )
}

export default function App() {
  usePrefers()
  useScrollProgress()
  useThemeInit()

  return (
    <div className="app-shell">
      <a className="sr-only" href="#intro">
        Skip to content
      </a>
      <SystemCursor />
      <ThemeToggle />
      <DeferredScene />
      <Navigation />
      <main className="content-root">
        <Hero />
        <About />
        <Impact />
        <SystemDesign />
        <Skills />
        <Projects />
        <ProjectShorts />
        <Experiments />
        <Experience />
        <Contact />
      </main>
      <PhaseChip />
    </div>
  )
}
