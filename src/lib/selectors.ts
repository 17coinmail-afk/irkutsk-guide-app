import type { Place, Route } from './contentTypes'
import type { Lang } from '../i18n/strings'
export function placesById(places: Place[]): Map<string, Place> { return new Map(places.map((p) => [p.id, p])) }
export function filterPlaces(places: Place[], opt: { section?: string; category?: string; query?: string; lang: Lang }): Place[] {
  const q = (opt.query ?? '').trim().toLowerCase()
  return places.filter((p) =>
    (!opt.section || p.section === opt.section) &&
    (!opt.category || p.category === opt.category) &&
    (!q || p.translations[opt.lang].title.toLowerCase().includes(q)))
}
export function filterRoutes(routes: Route[], opt: { theme?: string; days?: number }): Route[] {
  return routes.filter((r) => (!opt.theme || r.theme === opt.theme) && (opt.days == null || r.days === opt.days))
}
export function resolveRouteStops(route: Route, byId: Map<string, Place>): Place[] {
  return [...route.stops].sort((a, b) => a.position - b.position).map((s) => byId.get(s.placeId)).filter((p): p is Place => !!p)
}
/**
 * Обложка маршрута. Первая остановка — плохой выбор: у половины городских маршрутов она одна
 * и та же, карточки в ленте выглядят одинаковыми. Поэтому берём природные виды в приоритете
 * и разводим одинаковые старты стабильным сдвигом по слагу маршрута.
 */
export function routeCoverPhoto(route: Route, byId: Map<string, Place>): string | null {
  const withPhoto = resolveRouteStops(route, byId).filter((p) => !!p.photoUrl)
  if (withPhoto.length === 0) return null
  const preferred = withPhoto.filter((p) => p.section === 'sights')
  const pool = preferred.length > 0 ? preferred : withPhoto
  let hash = 0
  for (let i = 0; i < route.slug.length; i++) hash = (hash * 31 + route.slug.charCodeAt(i)) >>> 0
  return pool[hash % pool.length].photoUrl
}
