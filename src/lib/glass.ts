// Какой «стеклянной» подложкой рисовать панель на данной платформе.
// На Android настоящий блюр дорог по кадрам → плотная полупрозрачная подложка,
// визуально почти то же самое, без просадки прокрутки.

export type Os = 'ios' | 'android' | 'web' | 'windows' | 'macos'
export interface GlassPlan {
  mode: 'blur' | 'solid'
  intensity: number
  background: string
}

export function glassPlan(os: Os, intensity = 40): GlassPlan {
  const clamped = Math.min(100, Math.max(0, intensity))
  if (os === 'android') return { mode: 'solid', intensity: clamped, background: 'rgba(7, 12, 18, 0.86)' }
  return { mode: 'blur', intensity: clamped, background: 'rgba(7, 12, 18, 0.35)' }
}
