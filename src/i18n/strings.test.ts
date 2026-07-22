import { describe, it, expect } from 'vitest'
import { UI, LANGS } from './strings'
describe('UI словарь', () => {
  it('во всех языках одинаковый набор ключей, без пустых', () => {
    const ruKeys = Object.keys(UI.ru).sort()
    for (const l of LANGS) {
      expect(Object.keys(UI[l]).sort()).toEqual(ruKeys)
      for (const k of ruKeys) expect((UI[l] as Record<string,string>)[k].trim().length).toBeGreaterThan(0)
    }
  })
})
