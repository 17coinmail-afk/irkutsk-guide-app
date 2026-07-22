import { describe, it, expect } from 'vitest'
import { pickFreshPack } from './pickFreshPack'
const mk = (v: number) => ({ version: v, data: { places: [], routes: [] } })
describe('pickFreshPack', () => {
  it('нет кэша → берём сеть', () => expect(pickFreshPack(null, mk(2))?.version).toBe(2))
  it('сеть новее → сеть', () => expect(pickFreshPack(mk(1), mk(3))?.version).toBe(3))
  it('кэш новее/равно → кэш', () => {
    expect(pickFreshPack(mk(5), mk(5))?.version).toBe(5)
    expect(pickFreshPack(mk(5), mk(4))?.version).toBe(5)
  })
  it('сеть недоступна (null) → кэш', () => expect(pickFreshPack(mk(2), null)?.version).toBe(2))
  it('оба null → null', () => expect(pickFreshPack(null, null)).toBeNull())
})
