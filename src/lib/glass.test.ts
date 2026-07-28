import { describe, it, expect } from 'vitest'
import { glassPlan } from './glass'

const alpha = (rgba: string) => Number(rgba.match(/([\d.]+)\)$/)![1])

describe('glassPlan', () => {
  it('на iOS честный блюр, на web тоже', () => {
    expect(glassPlan('ios').mode).toBe('blur')
    expect(glassPlan('web').mode).toBe('blur')
  })
  it('на Android плотная подложка вместо дорогого блюра', () => {
    expect(glassPlan('android').mode).toBe('solid')
  })
  it('плотность растёт от тонкого к плотному', () => {
    const thin = alpha(glassPlan('ios', { density: 'thin' }).background)
    const regular = alpha(glassPlan('ios', { density: 'regular' }).background)
    const dense = alpha(glassPlan('ios', { density: 'dense' }).background)
    expect(thin).toBeLessThan(regular)
    expect(regular).toBeLessThan(dense)
  })
  it('замена блюра всегда плотнее, чем слой поверх него', () => {
    for (const density of ['thin', 'regular', 'dense'] as const) {
      expect(alpha(glassPlan('android', { density }).background))
        .toBeGreaterThan(alpha(glassPlan('ios', { density }).background))
    }
  })
  it('тона различимы, но остаются почти монохромными', () => {
    const rgb = (bg: string) => bg.match(/rgba\((\d+), (\d+), (\d+)/)!.slice(1).map(Number)
    const tones = (['neutral', 'cold', 'warm'] as const).map((tone) =>
      rgb(glassPlan('ios', { tone }).background),
    )
    // ни один тон не уходит в цвет: разброс каналов внутри тона мал
    for (const [r, g, b] of tones) {
      expect(Math.max(r, g, b) - Math.min(r, g, b)).toBeLessThanOrEqual(12)
    }
    // но по светлоте тона всё же отличаются друг от друга
    const lum = tones.map(([r, g, b]) => r + g + b)
    expect(new Set(lum).size).toBe(3)
  })
  it('у материала всегда есть кромка света', () => {
    for (const os of ['ios', 'android'] as const) {
      expect(glassPlan(os).edgeColor).toMatch(/^rgba\(255, 255, 255/)
    }
  })
  it('интенсивность зажата в 0..100', () => {
    expect(glassPlan('ios', { intensity: 999 }).intensity).toBe(100)
    expect(glassPlan('ios', { intensity: -5 }).intensity).toBe(0)
  })
})
