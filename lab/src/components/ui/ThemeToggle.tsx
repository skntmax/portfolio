import { useThemeStore } from '@/hooks/useTheme'
import '@/styles/theme-toggle.css'

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="theme-toggle interactive"
      aria-pressed={isLight}
      aria-label={isLight ? 'Switch to night mode' : 'Switch to day mode'}
      title={isLight ? 'Night mode' : 'Day mode'}
      onClick={toggleTheme}
    >
      <svg
        className="theme-toggle__sun"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
        </g>
      </svg>
      <svg
        className="theme-toggle__moon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M20.2 14.2A8.2 8.2 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2Z"
        />
      </svg>
      <span className="theme-toggle__label">{isLight ? 'Day' : 'Night'}</span>
    </button>
  )
}
