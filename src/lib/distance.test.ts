import { describe, it, expect } from 'vitest'
import { haversineKm, sortPlacesByDistance, formatDistance } from './distance'
import type { Place } from './contentTypes'
const P = (id: string, lat: number, lng: number): Place => ({ id, slug: id, section: 'sights', category: 'nature', lat, lng, photoUrl: null, address: null, hours: null, website: null, phone: null, cuisine: null, translations: { ru: { title: id, description: '' }, en: { title: id, description: '' }, zh: { title: id, description: '' } } })
describe('haversineKm', () => {
  it('Иркутск→Листвянка ~ порядка 45–75 км', () => {
    const d = haversineKm({ lat: 52.287, lng: 104.281 }, { lat: 51.85, lng: 104.87 })
    expect(d).toBeGreaterThan(40); expect(d).toBeLessThan(80)
  })
  it('симметрична и ноль на месте', () => {
    const a = { lat: 52, lng: 104 }, b = { lat: 53, lng: 105 }
    expect(haversineKm(a, b)).toBeCloseTo(haversineKm(b, a), 6)
    expect(haversineKm(a, a)).toBeCloseTo(0, 6)
  })
})
describe('sortPlacesByDistance', () => {
  it('ближайший первым', () => {
    const from = { lat: 52.287, lng: 104.281 }
    const res = sortPlacesByDistance([P('far', 53.8, 108.6), P('near', 52.29, 104.29)], from)
    expect(res[0].place.id).toBe('near')
    expect(res[0].km).toBeLessThan(res[1].km)
  })
})
describe('formatDistance', () => {
  it('<1км → метры, ≥1км → км', () => {
    expect(formatDistance(0.42, 'ru')).toMatch(/м$/)
    expect(formatDistance(2.34, 'ru')).toMatch(/2\.3\s*км/)
    expect(formatDistance(2.34, 'en')).toMatch(/km/)
    expect(formatDistance(2.34, 'zh')).toMatch(/公里/)
  })
})
