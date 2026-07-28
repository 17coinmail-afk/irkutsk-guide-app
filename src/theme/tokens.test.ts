import { describe, it, expect } from 'vitest'
import { colors, space, radius, gradients, font } from './tokens'
describe('theme tokens', () => {
  it('содержит ключевые цвета в hex', () => {
    for (const c of [colors.bg, colors.surface, colors.turquoise, colors.gold, colors.text]) {
      expect(c).toMatch(/^#[0-9a-fA-F]{6,8}$/)
    }
  })
  it('шкала отступов возрастающая', () => {
    const v = [space.xs, space.sm, space.smd, space.md, space.lg, space.xl]
    expect(v).toEqual([...v].sort((a, b) => a - b))
    expect(radius.md).toBeGreaterThan(0)
  })
  it('градиентные кромки заданы и растворяются в прозрачность', () => {
    expect(gradients.iceEdge).toHaveLength(3)
    expect(gradients.iceEdge[2]).toMatch(/rgba\(.*0\)$/)
    expect(gradients.goldEdge).toHaveLength(3)
    expect(gradients.goldEdge[2]).toMatch(/rgba\(.*0\)$/)
  })
  it('типографическая шкала редизайна v3', () => {
    expect(font.scale.hero).toBe(46)
    expect(font.scale.h1).toBe(32)
    expect(font.scale.chip).toBe(11)
    const v = [font.scale.chip, font.scale.small, font.scale.body, font.scale.bodyLg, font.scale.h2, font.scale.h1, font.scale.hero]
    expect(v).toEqual([...v].sort((a, b) => a - b))
  })
  it('две ступени поверхности различимы', () => {
    expect(colors.surface).not.toBe(colors.surfaceAlt)
    expect(colors.borderSoft).not.toBe(colors.border)
  })
})
