import { describe, it, expect } from 'vitest'
import { glassPlan } from './glass'

describe('glassPlan', () => {
  it('на iOS честный блюр', () => {
    expect(glassPlan('ios')).toMatchObject({ mode: 'blur', intensity: 40 })
  })
  it('на web блюр тоже доступен', () => {
    expect(glassPlan('web').mode).toBe('blur')
  })
  it('на Android плотная подложка вместо дорогого блюра', () => {
    const p = glassPlan('android')
    expect(p.mode).toBe('solid')
    expect(p.background).toMatch(/^rgba\(7, 12, 18/)
  })
  it('интенсивность зажата в 0..100', () => {
    expect(glassPlan('ios', 999).intensity).toBe(100)
    expect(glassPlan('ios', -5).intensity).toBe(0)
  })
  it('подложка под блюром светлее, чем сплошная замена', () => {
    const blurAlpha = Number(glassPlan('ios').background.match(/([\d.]+)\)$/)![1])
    const solidAlpha = Number(glassPlan('android').background.match(/([\d.]+)\)$/)![1])
    expect(blurAlpha).toBeLessThan(solidAlpha)
  })
})
