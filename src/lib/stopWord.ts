import type { Lang } from '../i18n/strings'
// Склонение слова «остановка» для счётчика остановок маршрута (аналог dayWord).
export function stopWord(n: number, lang: Lang): string {
  if (lang === 'en') return n === 1 ? 'stop' : 'stops'
  if (lang === 'zh') return '站'
  const d = n % 10, dd = n % 100
  if (d === 1 && dd !== 11) return 'остановка'
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return 'остановки'
  return 'остановок'
}
