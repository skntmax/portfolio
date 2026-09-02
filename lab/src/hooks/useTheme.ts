import { useEffect } from 'react'
import { create } from 'zustand'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'

type ThemeState = {
  theme: ThemeMode
  setTheme: (t: ThemeMode) => void
  toggleTheme: () => void
}

function readInitial(): ThemeMode {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* ignore */
  }
  return 'dark'
}

function applyDom(theme: ThemeMode) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f4fbf9' : '#000000')
  }
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  setTheme: (theme) => {
    applyDom(theme)
    set({ theme })
  },
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    applyDom(next)
    set({ theme: next })
  },
}))

/** Hydrate theme once on mount (and listen for OS preference if unset). */
export function useThemeInit() {
  const setTheme = useThemeStore((s) => s.setTheme)

  useEffect(() => {
    setTheme(readInitial())

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'light' : 'dark')
        }
      } catch {
        /* ignore */
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [setTheme])
}
