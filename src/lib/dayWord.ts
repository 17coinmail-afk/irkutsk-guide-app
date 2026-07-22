import type { Lang } from '../i18n/strings'
export function dayWord(n: number, lang: Lang): string {
  if (lang === 'en') return n === 1 ? 'day' : 'days'
  if (lang === 'zh') return '天'
  const d = n % 10, dd = n % 100
  if (d === 1 && dd !== 11) return 'день'
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return 'дня'
  return 'дней'
}
