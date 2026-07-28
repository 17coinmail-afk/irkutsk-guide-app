import { describe, it, expect } from 'vitest'
import { appUrl, webUrl, MAP_APPS } from './externalMaps'

const olkhon = { lat: 53.17, lng: 107.36, title: 'Остров Ольхон' }

describe('ссылки во внешние карты', () => {
  it('у Яндекса координаты идут в порядке долгота,широта', () => {
    expect(appUrl('yandex', olkhon)).toBe('yandexmaps://maps.yandex.ru/?pt=107.36,53.17&z=16')
    expect(webUrl('yandex', olkhon)).toContain('pt=107.36,53.17')
  })
  it('2ГИС строит маршрут до точки', () => {
    expect(appUrl('dgis', olkhon)).toBe('dgis://2gis.ru/routeSearch/rsType/car/to/107.36,53.17')
    expect(webUrl('dgis', olkhon)).toBe('https://2gis.ru/geo/107.36,53.17')
  })
  it('для Google используем geo-схему с подписью', () => {
    const url = appUrl('google', olkhon)
    expect(url.startsWith('geo:53.17,107.36')).toBe(true)
    expect(url).toContain(encodeURIComponent('Остров Ольхон'))
  })
  it('подпись необязательна', () => {
    expect(appUrl('google', { lat: 1, lng: 2 })).toBe('geo:1,2?q=1,2')
  })
  it('веб-ссылки — обычные https, работают без установленного приложения', () => {
    for (const { id } of MAP_APPS) expect(webUrl(id, olkhon)).toMatch(/^https:\/\//)
  })
  it('список приложений не пуст и без дублей', () => {
    expect(MAP_APPS.length).toBeGreaterThan(0)
    expect(new Set(MAP_APPS.map((a) => a.id)).size).toBe(MAP_APPS.length)
  })
})
