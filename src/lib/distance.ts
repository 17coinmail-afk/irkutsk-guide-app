import type { Place } from './contentTypes'
import type { Lang } from '../i18n/strings'
export interface LatLng { lat: number; lng: number }
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)))
}
export function sortPlacesByDistance(places: Place[], from: LatLng): { place: Place; km: number }[] {
  return places.map((place) => ({ place, km: haversineKm(from, { lat: place.lat, lng: place.lng }) })).sort((x, y) => x.km - y.km)
}
export function formatDistance(km: number, lang: Lang): string {
  if (km < 1) { const m = Math.max(10, Math.round(km * 1000 / 10) * 10); return lang === 'zh' ? `${m} 米` : lang === 'en' ? `${m} m` : `${m} м` }
  const v = km.toFixed(1)
  return lang === 'zh' ? `${v} 公里` : lang === 'en' ? `${v} km` : `${v} км`
}
