import { useEffect, useRef } from 'react'
import { useLabStore } from '@/hooks/useLabStore'
import '@/styles/cursor.css'

export function SystemCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const mode = useLabStore((s) => s.cursorMode)
  const mobile = useLabStore((s) => s.mobile)

  useEffect(() => {
    if (mobile) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      const explore = t.closest('[data-cursor="explore"]')
      const interactive = t.closest('a, button, [data-cursor]')
      document.body.classList.toggle('cursor-active', Boolean(interactive))
      useLabStore.getState().setCursorMode(
        explore ? 'explore' : useLabStore.getState().hoveredNode ? 'inspect' : 'default',
      )
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [mobile])

  useEffect(() => {
    if (!label.current) return
    label.current.textContent =
      mode === 'inspect' ? 'INSPECT' : mode === 'explore' ? 'EXPLORE' : ''
  }, [mode])

  if (mobile) return null

  return (
    <div
      ref={ref}
      className={`sys-cursor sys-cursor--${mode}`}
      aria-hidden="true"
    >
      <span className="sys-cursor__dot" />
      <span className="sys-cursor__ring" />
      <span ref={label} className="sys-cursor__label" />
    </div>
  )
}
