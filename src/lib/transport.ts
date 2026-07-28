import type { Lang } from '../i18n/strings'
import type { TransportLink, TransportMode } from './contentTypes'

/** Через сколько дней после ручной проверки данные считаем подозрительными. */
export const STALE_DAYS = 180

export function isRunningInMonth(months: number[], month: number): boolean {
  return months.includes(month)
}

/** Работает ли направление в указанную дату (месяцы 1..12). */
export function isRunningOn(link: TransportLink, date: Date): boolean {
  return isRunningInMonth(link.months, date.getMonth() + 1)
}

/**
 * Сначала то, что реально ходит в это время года: зимой вместо парома показывается
 * ледовая переправа, летом наоборот. Внесезонные варианты не прячем — они уходят вниз,
 * чтобы человек видел, чего ждать в другой сезон.
 */
export function pickSeasonal(links: TransportLink[], date: Date): TransportLink[] {
  const running = links.filter((l) => isRunningOn(l, date))
  const resting = links.filter((l) => !isRunningOn(l, date))
  const byDuration = (a: TransportLink, b: TransportLink) => a.durationMin - b.durationMin
  return [...running.sort(byDuration), ...resting.sort(byDuration)]
}

/** Данные проверялись слишком давно — предупреждаем и просим свериться с источником. */
export function isStale(checkedAt: string, today: Date, staleDays = STALE_DAYS): boolean {
  const checked = new Date(`${checkedAt}T00:00:00`)
  if (Number.isNaN(checked.getTime())) return true
  const days = (today.getTime() - checked.getTime()) / 86_400_000
  return days > staleDays
}

/** «06:00–20:00 · каждые 30–60 минут». Без часов — только частота. */
export function formatWindow(link: TransportLink, lang: Lang): string {
  const freq = link.translations[lang]?.frequency ?? ''
  const { firstDeparture: first, lastDeparture: last } = link
  if (!first) return freq
  const window = last ? `${first}–${last}` : first
  return freq ? `${window} · ${freq}` : window
}

/** «6 ч 20 мин» / «6 h 20 min» / «6 小时 20 分钟». */
export function formatDuration(minutes: number, lang: Lang): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (lang === 'zh') return h ? (m ? `${h} 小时 ${m} 分钟` : `${h} 小时`) : `${m} 分钟`
  if (lang === 'en') return h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`
  return h ? (m ? `${h} ч ${m} мин` : `${h} ч`) : `${m} мин`
}

/** Варианты, которыми можно попасть в это место. */
export function linksToPlace(links: TransportLink[], placeSlug: string): TransportLink[] {
  return links.filter((l) => l.toSlug === placeSlug)
}

export const MODE_ICON: Record<TransportMode, string> = {
  ferry: 'boat-outline',
  boat: 'boat-outline',
  shuttle: 'bus-outline',
  bus: 'bus-outline',
  train: 'train-outline',
  kbzh: 'train-outline',
  ice_road: 'snow-outline',
  taxi: 'car-outline',
}
