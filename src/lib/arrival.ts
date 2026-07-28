import type { Lang } from '../i18n/strings'
import type { Place, Route, TransportLink } from './contentTypes'
import { haversineKm } from './distance'
import { isRunningOn } from './transport'

/**
 * Логика первого экрана для человека, который только что приехал.
 * Отвечает на срочные вопросы: что рядом, что успеть за моё время, как добраться.
 * Энциклопедия (цифры, истории) уезжает ниже — она нужна вечером, а не на вокзале.
 */

export const IRKUTSK = { lat: 52.2864, lng: 104.2807 }

export interface NearbyItem { place: Place; km: number }

/** Ближайшие места. Без геопозиции считаем от центра Иркутска — человек чаще всего там. */
export function nearby(
  places: Place[],
  from: { lat: number; lng: number } | null,
  limit = 3,
): NearbyItem[] {
  const origin = from ?? IRKUTSK
  return places
    .filter((p) => p.category !== 'food')
    .map((place) => ({ place, km: haversineKm(origin, { lat: place.lat, lng: place.lng }) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
}

export type TimeBudget = '1' | '3' | '7'

/** Маршруты под «сколько у вас времени»: точное совпадение по дням, иначе ближайшее снизу. */
export function routesForBudget(routes: Route[], budget: TimeBudget, limit = 6): Route[] {
  const days = Number(budget)
  const fits = routes.filter((r) => r.days <= days)
  return fits
    .sort((a, b) => b.days - a.days || a.slug.localeCompare(b.slug))
    .slice(0, limit)
}

/** Направления «как добраться»: сначала те, что работают сейчас, потом быстрые. */
export function arrivalRoutes(links: TransportLink[], date: Date, limit = 3): TransportLink[] {
  const key = (l: TransportLink) => (isRunningOn(l, date) ? 0 : 1)
  return [...links]
    .sort((a, b) => key(a) - key(b) || a.durationMin - b.durationMin)
    .slice(0, limit)
}

/** «~12 км» — расстояние без ложной точности. */
export function formatKm(km: number, lang: Lang): string {
  const value = km < 10 ? Math.round(km * 10) / 10 : Math.round(km)
  if (lang === 'zh') return `${value} 公里`
  return lang === 'en' ? `${value} km` : `${value} км`
}

/** Светового дня осталось: грубая оценка по закату, чтобы человек успел вернуться. */
export function hoursOfLight(now: Date, sunsetHour: number): number {
  const h = now.getHours() + now.getMinutes() / 60
  return Math.max(0, Math.round((sunsetHour - h) * 10) / 10)
}
