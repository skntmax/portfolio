import { useEffect } from 'react'
import { useLabStore } from '@/hooks/useLabStore'

export function usePrefers() {
  const setReducedMotion = useLabStore((s) => s.setReducedMotion)
  const setMobile = useLabStore((s) => s.setMobile)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 900px)')

    const sync = () => {
      setReducedMotion(motion.matches)
      setMobile(mobile.matches)
      document.documentElement.classList.toggle('reduced-motion', motion.matches)
    }

    sync()
    motion.addEventListener('change', sync)
    mobile.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      mobile.removeEventListener('change', sync)
    }
  }, [setReducedMotion, setMobile])
}
