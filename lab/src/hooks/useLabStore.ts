import { create } from 'zustand'

export type ScenePhase =
  | 'intro'
  | 'engineer'
  | 'scale'
  | 'architecture'
  | 'flagship'
  | 'contact'

type LabState = {
  progress: number
  phase: ScenePhase
  reducedMotion: boolean
  mobile: boolean
  pointer: { x: number; y: number }
  hoveredNode: string | null
  cursorMode: 'default' | 'inspect' | 'explore'
  setProgress: (n: number) => void
  setPhase: (p: ScenePhase) => void
  setReducedMotion: (v: boolean) => void
  setMobile: (v: boolean) => void
  setPointer: (x: number, y: number) => void
  setHoveredNode: (id: string | null) => void
  setCursorMode: (m: LabState['cursorMode']) => void
}

function phaseFromProgress(p: number): ScenePhase {
  if (p < 0.16) return 'intro'
  if (p < 0.32) return 'engineer'
  if (p < 0.48) return 'scale'
  if (p < 0.64) return 'architecture'
  if (p < 0.82) return 'flagship'
  return 'contact'
}

export const useLabStore = create<LabState>((set) => ({
  progress: 0,
  phase: 'intro',
  reducedMotion: false,
  mobile: false,
  pointer: { x: 0, y: 0 },
  hoveredNode: null,
  cursorMode: 'default',
  setProgress: (progress) =>
    set({ progress, phase: phaseFromProgress(progress) }),
  setPhase: (phase) => set({ phase }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setMobile: (mobile) => set({ mobile }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setHoveredNode: (hoveredNode) =>
    set({
      hoveredNode,
      cursorMode: hoveredNode ? 'inspect' : 'default',
    }),
  setCursorMode: (cursorMode) => set({ cursorMode }),
}))
