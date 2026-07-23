import { describe, it, expect } from 'vitest'
import { favKey, toggle, isFav } from './favorites'
describe('favorites', () => {
  it('ключи place/route не пересекаются', () => {
    expect(favKey('place', 'baikal')).toBe('place:baikal')
    expect(favKey('route', 'baikal')).toBe('route:baikal')
    expect(favKey('place', 'baikal')).not.toBe(favKey('route', 'baikal'))
  })
  it('toggle добавляет и убирает, isFav отражает', () => {
    let s = new Set<string>()
    s = toggle(s, 'place:a'); expect(isFav(s, 'place:a')).toBe(true)
    s = toggle(s, 'place:a'); expect(isFav(s, 'place:a')).toBe(false)
  })
  it('toggle не мутирует исходный набор', () => {
    const s = new Set<string>(['x'])
    const s2 = toggle(s, 'y')
    expect(s.has('y')).toBe(false); expect(s2.has('y')).toBe(true)
  })
})
