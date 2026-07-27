// Чистая логика движения: тайминги, каскад, прогресс шапки, геометрия индикатора.
// RN-free — покрывается тестами; компоненты берут отсюда числа и конфиги Animated.

export const DURATION = { press: 120, appear: 260, header: 220, kenBurns: 30000 } as const

export const SPRING = {
  pressIn: { toValue: 0.97, speed: 40, bounciness: 0, useNativeDriver: true },
  pressOut: { toValue: 1, speed: 24, bounciness: 6, useNativeDriver: true },
  indicator: { speed: 20, bounciness: 4, useNativeDriver: true },
} as const

const STEP = 40
const MAX_STEPS = 6

/** Задержка появления элемента в каскаде: 40 мс на шаг, не больше шести шагов. */
export function staggerDelay(index: number, opts?: { reduceMotion?: boolean }): number {
  if (opts?.reduceMotion) return 0
  return Math.min(Math.max(index, 0), MAX_STEPS) * STEP
}

/** Прогресс проявления шапки: 0 до `from`, 1 после `to`, линейно внутри. */
export function headerProgress(y: number, from: number, to: number): number {
  if (to <= from) return y >= to ? 1 : 0
  return Math.min(1, Math.max(0, (y - from) / (to - from)))
}

/** Положение и ширина скользящего индикатора по измеренным ширинам чипов. */
export function indicatorGeometry(widths: number[], gap: number, index: number): { x: number; width: number } {
  if (index < 0 || index >= widths.length) return { x: 0, width: 0 }
  const x = widths.slice(0, index).reduce((acc, w) => acc + w + gap, 0)
  return { x, width: widths[index] }
}
