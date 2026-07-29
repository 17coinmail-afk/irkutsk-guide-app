import { describe, it, expect } from 'vitest'
import { homeSections } from './homeSections'
import type { Place, Route, ContentPack } from './contentTypes'

const P = (o: Partial<Place>): Place => ({
  id: o.id!, slug: o.slug ?? o.id!, section: o.section ?? 'sights', category: o.category ?? 'nature',
  lat: 0, lng: 0, photoUrl: 'photoUrl' in o ? o.photoUrl! : 'https://x/p.jpg',
  address: o.address ?? null, hours: o.hours ?? null, website: null, phone: null, cuisine: o.cuisine ?? null,
  translations: o.translations ?? { ru: { title: o.id!, description: '' }, en: { title: o.id!, description: '' }, zh: { title: o.id!, description: '' } },
})
const R = (o: Partial<Route> & { id: string; stops: Route['stops'] }): Route => ({
  id: o.id, slug: o.slug ?? o.id, days: o.days ?? 1, theme: o.theme ?? null, difficulty: o.difficulty ?? 'easy',
  translations: o.translations ?? { ru: { title: o.id, description: '' }, en: { title: o.id, description: '' }, zh: { title: o.id, description: '' } },
  stops: o.stops,
})

describe('homeSections', () => {
  it('на пустом пакете возвращает пустые секции без падения', () => {
    const s = homeSections(null)
    expect(s.mustSee).toEqual([])
    expect(s.topRoutes).toEqual([])
    expect(s.seasons.map((x) => x.photoUrl)).toEqual([null, null])
  })

  it('hero берёт первое место с фото из section=sights', () => {
    const pack: ContentPack = { version: 1, data: { places: [P({ id: 'city1', section: 'city' }), P({ id: 'sight1', section: 'sights' })], routes: [] } }
  })

  it('mustSee/city/food фильтруют по секции/категории и требуют фото', () => {
    const pack: ContentPack = {
      version: 1,
      data: {
        places: [
          P({ id: 's1', section: 'sights' }),
          P({ id: 's2', section: 'sights', photoUrl: null }),
          P({ id: 'c1', section: 'city', category: 'museum' }),
          P({ id: 'f1', section: 'city', category: 'food' }),
        ],
        routes: [],
      },
    }
    const s = homeSections(pack)
    expect(s.mustSee.map((p) => p.id)).toEqual(['s1'])
    expect(s.city.map((p) => p.id)).toEqual(['c1'])
    expect(s.food.map((p) => p.id)).toEqual(['f1'])
  })

  it('topRoutes упорядочивает по приоритету темы (classic раньше gastro)', () => {
    const pack: ContentPack = {
      version: 1,
      data: {
        places: [],
        routes: [R({ id: 'g', theme: 'gastro', stops: [] }), R({ id: 'c', theme: 'classic', stops: [] })],
      },
    }
    expect(homeSections(pack).topRoutes.map((r) => r.id)).toEqual(['c', 'g'])
  })

  it('seasons резолвит фото первой остановки маршрутов theme=ice/summer', () => {
    const pack: ContentPack = {
      version: 1,
      data: {
        places: [P({ id: 'p1', photoUrl: 'https://x/ice.jpg' }), P({ id: 'p2', photoUrl: 'https://x/summer.jpg' })],
        routes: [
          R({ id: 'winterRoute', theme: 'ice', stops: [{ placeId: 'p1', position: 0, note: null }] }),
          R({ id: 'summerRoute', theme: 'summer', stops: [{ placeId: 'p2', position: 0, note: null }] }),
        ],
      },
    }
    const seasons = homeSections(pack).seasons
    expect(seasons.find((s) => s.key === 'winter')?.photoUrl).toBe('https://x/ice.jpg')
    expect(seasons.find((s) => s.key === 'summer')?.photoUrl).toBe('https://x/summer.jpg')
  })
})
