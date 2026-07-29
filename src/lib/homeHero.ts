import type { Lang } from '../i18n/strings'
import type { Place } from './contentTypes'

/**
 * Шапка Главного.
 *
 * Раньше там стояло первое место из каталога — и приложение открывалось карточкой
 * «ПРИРОДА · Озеро Байкал», как будто вы уже нажали на достопримечательность.
 * Приезжий при этом находится в Иркутске, а до Байкала ему ещё ехать. Поэтому шапка
 * теперь отвечает на три вопроса: где вы, какой сегодня день и далеко ли озеро.
 */

export type Season = 'winter' | 'spring' | 'summer' | 'autumn'

/**
 * Сезон Прибайкалья, а не календарный: зима здесь с ноября по март (в феврале встаёт
 * лёд, и это разгар туристического сезона), а лето короткое — июнь-август.
 */
export function baikalSeason(month: number): Season {
  if (month >= 11 || month <= 3) return 'winter'
  if (month === 4 || month === 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  return 'autumn'
}

const MONTHS: Record<Lang, string[]> = {
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
       'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'],
  zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
}

/**
 * Дата словами. Своя таблица месяцев, а не Intl: Hermes собирают без полного ICU,
 * и на устройстве русские месяцы вырождаются в «July».
 */
export function formatHeroDate(date: Date, lang: Lang): string {
  const day = date.getDate()
  const month = MONTHS[lang][date.getMonth()]
  if (lang === 'zh') return `${month}${day}日`
  if (lang === 'en') return `${day} ${month}`
  return `${day} ${month}`
}

/**
 * Виды города для шапки. Свои файлы, а не кадры из каталога: там набережная снята так,
 * что видно воду и небо, а Московские ворота — в строительных лесах.
 *
 * Зимний кадр отдельный, потому что летняя набережная в январе была бы прямым враньём,
 * а парящая на морозе Ангара — самый иркутский зимний образ, какой есть: река не встаёт
 * из-за ГЭС и дымится всю зиму.
 */
const HERO_BASE = 'https://guide.getastrodaily.com/assets/hero/'
export const HERO_IMAGES: Record<'winter' | 'warm', string> = {
  winter: HERO_BASE + 'irkutsk-winter.jpg',
  warm: HERO_BASE + 'irkutsk-summer.jpg',
}

/**
 * Городские виды каталога на случай, если свои файлы недоступны. Байкала в списке нет
 * намеренно: он в шапке только как расстояние — пока вы читаете этот экран, вы не там.
 */
export const HERO_SLUGS = ['lower-embankment', 'kvartal-130', 'old-irkutsk', 'gagarin-blvd']

/** Фото шапки по сезону; каталог остаётся запасным вариантом. */
export function heroPhoto(places: Place[], month?: number): string {
  const season = baikalSeason(month ?? new Date().getMonth() + 1)
  return HERO_IMAGES[season === 'winter' ? 'winter' : 'warm']
}

/** Городской вид из каталога — запасной путь, если свой файл не отдался. */
export function heroPhotoFromPack(places: Place[]): string | null {
  for (const slug of HERO_SLUGS) {
    const found = places.find((p) => p.slug === slug && p.photoUrl)
    if (found?.photoUrl) return found.photoUrl
  }
  const cityFallback = places.find((p) => p.section === 'city' && p.photoUrl)
  return cityFallback?.photoUrl ?? places.find((p) => p.photoUrl)?.photoUrl ?? null
}
