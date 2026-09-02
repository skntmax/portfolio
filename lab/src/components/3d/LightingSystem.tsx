import { useThemeStore } from '@/hooks/useTheme'

export function LightingSystem() {
  const theme = useThemeStore((s) => s.theme)
  const isLight = theme === 'light'

  return (
    <>
      <ambientLight intensity={isLight ? 0.7 : 0.48} color="#c8fff4" />
      <directionalLight
        position={[5, 4, 3]}
        intensity={isLight ? 1.2 : 1.1}
        color="#ffffff"
      />
      <pointLight
        position={[-2.5, 1.5, 3]}
        intensity={isLight ? 1.1 : 2.8}
        color="#5ff5d2"
        distance={24}
      />
    </>
  )
}
