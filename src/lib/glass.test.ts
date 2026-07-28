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
  it('тонировка меняет оттенок, но не превращается в цветной фильтр', () => {
    const cold = glassPlan('ios', { tone: 'cold' }).background
    const warm = glassPlan('ios', { tone: 'warm' }).background
    expect(cold).not.toBe(warm)
    // холодная тонировка синее по каналу B, тёплая — краснее по R
    const [, , , coldB] = cold.match(/rgba\((\d+), (\d+), (\d+)/)!.map(Number)
    const [, warmR] = warm.match(/rgba\((\d+)/)!.map(Number)
    expect(coldB).toBeGreaterThan(30)
    expect(warmR).toBeGreaterThan(30)
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
