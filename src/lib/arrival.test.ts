import { describe, it, expect } from 'vitest'
import { nearby, routesForBudget, arrivalRoutes, formatKm, hoursOfLight, IRKUTSK } from './arrival'
import type { Place, Route, TransportLink } from './contentTypes'

const place = (slug: string, lat: number, lng: number, category = 'nature'): Place => ({
  id: slug, slug, section: 'sights', category, lat, lng,
  photoUrl: null, gallery: null, address: null, hours: null, website: null, phone: null, cuisine: null,
  translations: {
    ru: { title: slug, description: '' }, en: { title: slug, description: '' }, zh: { title: slug, description: '' },
  },
})

const PLACES = [
  place('kvartal', 52.2755, 104.2835),        // центр Иркутска
  place('listvyanka', 51.85, 104.87),         // 70 км
  place('olkhon', 53.17, 107.36),             // ~250 км
  place('cafe', 52.2760, 104.2840, 'food'),   // заведение — в «рядом» не идёт
]

const route = (slug: string, days: number): Route => ({
  id: slug, slug, days, theme: null, difficulty: 'easy',
  translations: { ru: { title: slug, description: '' }, en: { title: slug, description: '' }, zh: { title: slug, description: '' } },
  stops: [],
})

const link = (slug: string, durationMin: number, months: number[]): TransportLink => ({
  id: slug, slug, mode: 'shuttle', fromSlug: null, toSlug: null,
  boardLat: null, boardLng: null, durationMin, priceFrom: null,
  firstDeparture: null, lastDeparture: null, months,
  sourceUrl: 'https://x', checkedAt: '2026-07-28',
  translations: {
    ru: { title: slug, frequency: '', note: null }, en: { title: slug, frequency: '', note: null }, zh: { title: slug, frequency: '', note: null },
  },
})

describe('что рядом', () => {
  it('ближайшее считается от геопозиции', () => {
    const res = nearby(PLACES, { lat: 51.86, lng: 104.86 })
    expect(res[0].place.slug).toBe('listvyanka')
  })
  it('без геопозиции считаем от центра Иркутска', () => {
    const res = nearby(PLACES, null)
    expect(res[0].place.slug).toBe('kvartal')
    expect(res[0].km).toBeLessThan(2)
  })
  it('заведения не попадают в «рядом» — там нужны достопримечательности', () => {
    const slugs = nearby(PLACES, null, 4).map((r) => r.place.slug)
    expect(slugs).not.toContain('cafe')
  })
  it('центр Иркутска задан правдоподобно', () => {
    expect(IRKUTSK.lat).toBeGreaterThan(52)
    expect(IRKUTSK.lng).toBeGreaterThan(104)
  })
})

describe('сколько у вас времени', () => {
  const ROUTES = [route('a', 1), route('b', 3), route('c', 7), route('d', 2)]
  it('на один день — только однодневные', () => {
    expect(routesForBudget(ROUTES, '1').map((r) => r.days)).toEqual([1])
  })
  it('на три дня — всё, что помещается, длинные первыми', () => {
    expect(routesForBudget(ROUTES, '3').map((r) => r.days)).toEqual([3, 2, 1])
  })
  it('на неделю — весь набор', () => {
    expect(routesForBudget(ROUTES, '7')).toHaveLength(4)
  })
})

describe('как добраться', () => {
  const july = new Date('2026-07-15T10:00:00')
  it('работающие сейчас идут раньше внесезонных, даже если те быстрее', () => {
    const winterOnly = link('ice', 10, [1, 2])
    const summer = link('ferry', 40, [6, 7, 8])
    expect(arrivalRoutes([winterOnly, summer], july).map((l) => l.slug)).toEqual(['ferry', 'ice'])
  })
  it('среди работающих первым идёт самый быстрый', () => {
    const slow = link('slow', 300, [7])
    const fast = link('fast', 60, [7])
    expect(arrivalRoutes([slow, fast], july)[0].slug).toBe('fast')
  })
})

describe('формат', () => {
  it('близкие расстояния с десятыми, дальние — целыми', () => {
    expect(formatKm(1.24, 'ru')).toBe('1.2 км')
    expect(formatKm(68.7, 'ru')).toBe('69 км')
    expect(formatKm(12, 'en')).toBe('12 km')
  })
  it('светового дня не бывает отрицательным', () => {
    expect(hoursOfLight(new Date('2026-01-05T18:00:00'), 16.7)).toBe(0)
    expect(hoursOfLight(new Date('2026-01-05T12:00:00'), 16.5)).toBe(4.5)
  })
})
