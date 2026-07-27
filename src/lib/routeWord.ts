import type { Lang } from '../i18n/strings'
// Склонение слова «маршрут» для счётчика «место входит в N маршрутов» (аналог stopWord).
export function routeWord(n: number, lang: Lang): string {
  if (lang === 'en') return n === 1 ? 'route' : 'routes'
  if (lang === 'zh') return '条路线'
  const d = n % 10, dd = n % 100
  if (d === 1 && dd !== 11) return 'маршрут'
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return 'маршрута'
  return 'маршрутов'
}
