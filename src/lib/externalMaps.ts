/**
 * Ссылки в сторонние карты. Свою офлайн-карту мы рисуем сами, но «доведи за руку»
 * отдаём Яндексу, 2ГИС или Google — они уже стоят у пользователя, часто с загруженным регионом.
 */
export type MapApp = 'yandex' | 'dgis' | 'google'

export interface MapTarget { lat: number; lng: number; title?: string }

/** Схема для установленного приложения. */
export function appUrl(app: MapApp, t: MapTarget): string {
  const { lat, lng } = t
  switch (app) {
    case 'yandex':
      // pt=долгота,широта — порядок у Яндекса обратный привычному
      return `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=16`
    case 'dgis':
      return `dgis://2gis.ru/routeSearch/rsType/car/to/${lng},${lat}`
    case 'google':
      return `geo:${lat},${lng}?q=${lat},${lng}${t.title ? `(${encodeURIComponent(t.title)})` : ''}`
  }
}

/** Запасная веб-ссылка, если приложение не установлено. */
export function webUrl(app: MapApp, t: MapTarget): string {
  const { lat, lng } = t
  switch (app) {
    case 'yandex':
      return `https://yandex.ru/maps/?pt=${lng},${lat}&z=16&l=map`
    case 'dgis':
      return `https://2gis.ru/geo/${lng},${lat}`
    case 'google':
      return `https://maps.google.com/?q=${lat},${lng}`
  }
}

export const MAP_APPS: { id: MapApp; label: string }[] = [
  { id: 'yandex', label: 'Яндекс.Карты' },
  { id: 'dgis', label: '2ГИС' },
  { id: 'google', label: 'Google Maps' },
]
