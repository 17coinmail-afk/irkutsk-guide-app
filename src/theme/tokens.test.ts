import { describe, it, expect } from 'vitest'
import { colors, space, radius } from './tokens'
describe('theme tokens', () => {
  it('содержит ключевые цвета в hex', () => {
    for (const c of [colors.bg, colors.surface, colors.turquoise, colors.gold, colors.text]) {
      expect(c).toMatch(/^#[0-9a-fA-F]{6,8}$/)
    }
  })
  it('шкала отступов возрастающая', () => {
    expect(space.sm).toBeLessThan(space.md)
    expect(space.md).toBeLessThan(space.lg)
    expect(radius.md).toBeGreaterThan(0)
  })
})
