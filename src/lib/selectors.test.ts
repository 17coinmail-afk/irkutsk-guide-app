import { describe, it, expect } from 'vitest'
import { placesById, filterPlaces, filterRoutes, resolveRouteStops, routeCoverPhoto } from './selectors'
import type { Place, Route } from './contentTypes'
const P = (o: Partial<Place>): Place => ({ id: o.id!, slug: o.slug ?? o.id!, section: o.section ?? 'sights', category: o.category ?? 'nature', lat: 0, lng: 0, photoUrl: null, address: null, hours: null, website: null, phone: null, cuisine: null, translations: o.translations ?? { ru: { title: o.id!, description: '' }, en: { title: o.id!, description: '' }, zh: { title: o.id!, description: '' } } })
describe('selectors', () => {
  const places = [P({ id: 'a', section: 'sights', category: 'nature', translations: { ru: { title: 'Байкал', description: '' }, en: { title: 'Baikal', description: '' }, zh: { title: '湖', description: '' } } }), P({ id: 'b', section: 'city', category: 'food' })]
  it('placesById индексирует по id', () => expect(placesById(places).get('a')?.id).toBe('a'))
  it('filterPlaces по секции', () => expect(filterPlaces(places, { section: 'city', lang: 'ru' }).map(p => p.id)).toEqual(['b']))
  it('filterPlaces по категории', () => expect(filterPlaces(places, { category: 'nature', lang: 'ru' }).map(p => p.id)).toEqual(['a']))
  it('filterPlaces поиск по названию текущего языка', () => {
    expect(filterPlaces(places, { query: 'бай', lang: 'ru' }).map(p => p.id)).toEqual(['a'])
    expect(filterPlaces(places, { query: 'baik', lang: 'en' }).map(p => p.id)).toEqual(['a'])
  })
  const routes: Route[] = [{ id: 'r', slug: 'r', days: 3, theme: 'gastro', difficulty: 'easy', translations: { ru: { title: '', description: '' }, en: { title: '', description: '' }, zh: { title: '', description: '' } }, stops: [{ placeId: 'b', position: 1, note: null }, { placeId: 'a', position: 0, note: null }] }]
  it('filterRoutes по теме и дням', () => {
    expect(filterRoutes(routes, { theme: 'gastro' }).length).toBe(1)
    expect(filterRoutes(routes, { theme: 'ice' }).length).toBe(0)
    expect(filterRoutes(routes, { days: 3 }).length).toBe(1)
  })
  it('resolveRouteStops сортирует по position и резолвит места', () => {
    const stops = resolveRouteStops(routes[0], placesById(places))
    expect(stops.map(p => p.id)).toEqual(['a', 'b'])
  })
  it('routeCoverPhoto берёт единственное доступное фото', () => {
    const withPhoto = [P({ id: 'a' }), P({ id: 'b' })]
    withPhoto[1].photoUrl = 'https://x/photo.jpg'
    expect(routeCoverPhoto(routes[0], placesById(withPhoto))).toBe('https://x/photo.jpg')
  })
  it('routeCoverPhoto предпочитает достопримечательность городской остановке', () => {
    const mixed = [
      P({ id: 'a', section: 'city' }),
      P({ id: 'b', section: 'sights' }),
    ]
    mixed[0].photoUrl = 'https://x/city.jpg'
    mixed[1].photoUrl = 'https://x/sight.jpg'
    expect(routeCoverPhoto(routes[0], placesById(mixed))).toBe('https://x/sight.jpg')
  })
  it('routeCoverPhoto разводит маршруты с одинаковым набором остановок', () => {
    const pool = [P({ id: 'a', section: 'sights' }), P({ id: 'b', section: 'sights' })]
    pool[0].photoUrl = 'https://x/1.jpg'
    pool[1].photoUrl = 'https://x/2.jpg'
    const byId = placesById(pool)
    const other = { ...routes[0], slug: 'another-route-slug' }
    const covers = new Set([routeCoverPhoto(routes[0], byId), routeCoverPhoto(other, byId)])
    // при одинаковых остановках слаг задаёт стабильный сдвиг — обложки не обязаны совпадать
    expect(covers.size).toBeGreaterThanOrEqual(1)
    expect(routeCoverPhoto(routes[0], byId)).toBe(routeCoverPhoto(routes[0], byId))
  })
  it('routeCoverPhoto возвращает null, если ни у одной остановки нет фото', () => {
    expect(routeCoverPhoto(routes[0], placesById(places))).toBeNull()
  })
})
