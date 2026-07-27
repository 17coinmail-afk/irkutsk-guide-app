import type { Lang } from '../i18n/strings'
export interface Tr { title: string; description: string; story?: string | null }
export interface Place {
  id: string; slug: string; section: 'sights' | 'city'; category: string
  lat: number; lng: number; photoUrl: string | null
  address: string | null; hours: string | null; website: string | null; phone: string | null; cuisine: string | null
  translations: Record<Lang, Tr>
}
export interface Stop { placeId: string; position: number; note: string | null }
export interface Route {
  id: string; slug: string; days: number; theme: string | null; difficulty: string
  translations: Record<Lang, Tr>; stops: Stop[]
}
export interface ContentPack { version: number; createdAt?: string; data: { places: Place[]; routes: Route[] } }
