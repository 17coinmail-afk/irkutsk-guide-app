import type { Lang } from '../i18n/strings'
export interface Tr { title: string; description: string; story?: string | null; tips?: string | null }
export interface Place {
  id: string; slug: string; section: 'sights' | 'city'; category: string
  lat: number; lng: number; photoUrl: string | null; gallery?: string[] | null
  address: string | null; hours: string | null; website: string | null; phone: string | null; cuisine: string | null
  translations: Record<Lang, Tr>
}
export interface Stop { placeId: string; position: number; note: string | null }
export interface Route {
  id: string; slug: string; days: number; theme: string | null; difficulty: string
  translations: Record<Lang, Tr>; stops: Stop[]
}
export type TransportMode = 'ferry' | 'shuttle' | 'bus' | 'train' | 'kbzh' | 'boat' | 'ice_road' | 'taxi'
export interface TransportTr { title: string; frequency: string; note: string | null }
/** Сообщение между точками: окна отправления и сезонность, а не точное расписание. */
export interface TransportLink {
  id: string; slug: string; mode: TransportMode
  fromSlug: string | null; toSlug: string | null
  boardLat: number | null; boardLng: number | null
  durationMin: number; priceFrom: number | null
  firstDeparture: string | null; lastDeparture: string | null
  months: number[]
  sourceUrl: string; checkedAt: string
  translations: Record<Lang, TransportTr>
}
export interface ContentPack {
  version: number
  createdAt?: string
  data: { places: Place[]; routes: Route[]; transport?: TransportLink[] }
}
