import type { ContentPack, Place, Route } from './contentTypes'
import { placesById, resolveRouteStops } from './selectors'

// Порядок предпочтения тем маршрутов для карусели «Готовые маршруты» на Главном.
const ROUTE_THEME_PRIORITY = ['classic', 'olkhon', 'kbzh', 'nature', 'ice', 'summer', 'gastro', 'family', 'spiritual', 'museum', 'walk', 'active']

export interface SeasonSectionData {
  key: 'winter' | 'summer'
  titleKey: 'seasonWinter' | 'seasonSummer'
  captionKey: 'seasonWinterCaption' | 'seasonSummerCaption'
  photoUrl: string | null
}

export interface HomeSections {
  hero: Place | null
  mustSee: Place[]
  topRoutes: Route[]
  seasons: SeasonSectionData[]
  city: Place[]
  food: Place[]
}

const withPhoto = (places: Place[]): Place[] => places.filter((p) => !!p.photoUrl)

function firstStopPhoto(route: Route | undefined, byId: Map<string, Place>): string | null {
  if (!route) return null
  return resolveRouteStops(route, byId).find((p) => !!p.photoUrl)?.photoUrl ?? null
}

/** Чистая сборка секций Главного экрана из ContentPack. Никакого react-native внутри. */
export function homeSections(pack: ContentPack | null): HomeSections {
  const places = pack?.data.places ?? []
  const routes = pack?.data.routes ?? []
  const byId = placesById(places)

  const sights = withPhoto(places.filter((p) => p.section === 'sights'))
  const city = withPhoto(places.filter((p) => p.section === 'city' && p.category !== 'food'))
  const food = withPhoto(places.filter((p) => p.category === 'food'))
  const hero = sights[0] ?? withPhoto(places)[0] ?? null

  const topRoutes = [...routes]
    .sort((a, b) => {
      const ai = ROUTE_THEME_PRIORITY.indexOf(a.theme ?? '')
      const bi = ROUTE_THEME_PRIORITY.indexOf(b.theme ?? '')
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi)
    })
    .slice(0, 8)

  const winterRoute = routes.find((r) => r.theme === 'ice')
  const summerRoute = routes.find((r) => r.theme === 'summer')
  const seasons: SeasonSectionData[] = [
    { key: 'winter', titleKey: 'seasonWinter', captionKey: 'seasonWinterCaption', photoUrl: firstStopPhoto(winterRoute, byId) },
    { key: 'summer', titleKey: 'seasonSummer', captionKey: 'seasonSummerCaption', photoUrl: firstStopPhoto(summerRoute, byId) },
  ]

  return {
    hero,
    mustSee: sights.slice(0, 10),
    topRoutes,
    seasons,
    city: city.slice(0, 10),
    food: food.slice(0, 10),
  }
}
