import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLabStore } from '@/hooks/useLabStore'

gsap.registerPlugin(ScrollTrigger)

/** Scroll progress for the 3D scene — content stays visible immediately. */
export function useScrollProgress() {
  const setProgress = useLabStore((s) => s.setProgress)
  const reducedMotion = useLabStore((s) => s.reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0)
      return
    }

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => setProgress(self.progress),
    })

    const onScroll = () => {
      document.body.classList.toggle('nav-compact', window.scrollY > 48)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('scroll', onScroll)
    }
  }, [reducedMotion, setProgress])
}
