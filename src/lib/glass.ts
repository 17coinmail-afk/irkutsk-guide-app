// Какой «стеклянной» подложкой рисовать панель на данной платформе.
// На Android настоящий блюр дорог по кадрам → плотная полупрозрачная подложка,
// визуально почти то же самое, без просадки прокрутки.

export type Os = 'ios' | 'android' | 'web' | 'windows' | 'macos'
/** Плотность материала: тонкий для чипов, обычный для панелей, плотный для липких шапок. */
export type GlassDensity = 'thin' | 'regular' | 'dense'
/** Тонировка от контента под панелью: над льдом холоднее, над закатом теплее. */
export type GlassTone = 'neutral' | 'cold' | 'warm'

export interface GlassPlan {
  mode: 'blur' | 'solid'
  intensity: number
  background: string
  /** Светлая кромка по верхнему краю — без неё стекло выглядит просто заливкой. */
  edgeColor: string
}

const BLUR_ALPHA: Record<GlassDensity, number> = { thin: 0.16, regular: 0.28, dense: 0.42 }
const SOLID_ALPHA: Record<GlassDensity, number> = { thin: 0.72, regular: 0.86, dense: 0.94 }
const TINT: Record<GlassTone, [number, number, number]> = {
  neutral: [10, 16, 24],
  cold: [16, 34, 48],
  warm: [38, 26, 18],
}

const INTENSITY: Record<GlassDensity, number> = { thin: 26, regular: 40, dense: 58 }

export function glassPlan(
  os: Os,
  opts: { density?: GlassDensity; tone?: GlassTone; intensity?: number } = {},
): GlassPlan {
  const density = opts.density ?? 'regular'
  const tone = opts.tone ?? 'neutral'
  const [r, g, b] = TINT[tone]
  const intensity = Math.min(100, Math.max(0, opts.intensity ?? INTENSITY[density]))

  if (os === 'android') {
    return {
      mode: 'solid',
      intensity,
      background: `rgba(${r}, ${g}, ${b}, ${SOLID_ALPHA[density]})`,
      edgeColor: 'rgba(255, 255, 255, 0.16)',
    }
  }
  return {
    mode: 'blur',
    intensity,
    background: `rgba(${r}, ${g}, ${b}, ${BLUR_ALPHA[density]})`,
    edgeColor: 'rgba(255, 255, 255, 0.28)',
  }
}
