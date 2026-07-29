import { describe, it, expect } from 'vitest'
import { baikalSeason, formatHeroDate, heroPhoto, heroPhotoFromPack, HERO_SLUGS, HERO_IMAGES } from './homeHero'
import type { Place } from './contentTypes'

const place = (slug: string, extra: Partial<Place> = {}): Place =>
  ({
    id: slug,
    slug,
    section: 'city',
    category: 'walk',
    photoUrl: `https://example.com/${slug}.jpg`,
    translations: { ru: { title: slug }, en: { title: slug }, zh: { title: slug } },
    ...extra,
  }) as Place

describe('шапка Главного', () => {
  it('зима в Прибайкалье длинная: с ноября по март', () => {
    for (const m of [11, 12, 1, 2, 3]) expect(baikalSeason(m), String(m)).toBe('winter')
    // февраль — разгар сезона на льду, он обязан быть зимой, а не «поздней зимой»
    expect(baikalSeason(2)).toBe('winter')
  })

  it('лето короткое, весна и осень — по два месяца', () => {
    for (const m of [6, 7, 8]) expect(baikalSeason(m), String(m)).toBe('summer')
    for (const m of [4, 5]) expect(baikalSeason(m), String(m)).toBe('spring')
    for (const m of [9, 10]) expect(baikalSeason(m), String(m)).toBe('autumn')
  })

  it('каждый месяц попадает ровно в один сезон', () => {
    const seasons = Array.from({ length: 12 }, (_, i) => baikalSeason(i + 1))
    expect(seasons.filter(Boolean)).toHaveLength(12)
    expect(new Set(seasons).size).toBe(4)
  })

  it('дата словами на трёх языках', () => {
    const d = new Date(2026, 6, 29)
    expect(formatHeroDate(d, 'ru')).toBe('29 июля')
    expect(formatHeroDate(d, 'en')).toBe('29 July')
    expect(formatHeroDate(d, 'zh')).toBe('7月29日')
  })

  it('в русской дате месяц стоит в родительном падеже', () => {
    // «29 июль» — типичная ошибка Intl без ICU, ради которой заведена своя таблица
    expect(formatHeroDate(new Date(2026, 0, 5), 'ru')).toBe('5 января')
    expect(formatHeroDate(new Date(2026, 4, 1), 'ru')).toBe('1 мая')
  })

  it('зимой в шапке зимний кадр, в остальные сезоны — летний', () => {
    for (const m of [12, 1, 2, 3, 11]) expect(heroPhoto([], m), String(m)).toBe(HERO_IMAGES.winter)
    for (const m of [4, 6, 7, 9, 10]) expect(heroPhoto([], m), String(m)).toBe(HERO_IMAGES.warm)
  })

  it('шапка не остаётся без картинки даже при пустом каталоге', () => {
    expect(heroPhoto([], 7).startsWith('https://')).toBe(true)
  })

  it('запасной путь берёт городской вид, а не первое место каталога', () => {
    const places = [
      place('baikal', { section: 'sights', category: 'nature' }),
      place('kvartal-130'),
      place('lower-embankment'),
    ]
    expect(heroPhotoFromPack(places)).toContain('lower-embankment')
  })

  it('если предпочтительных видов нет — берётся любое городское фото', () => {
    const places = [
      place('baikal', { section: 'sights', category: 'nature' }),
      place('drama-theatre', { category: 'culture' }),
    ]
    expect(heroPhotoFromPack(places)).toContain('drama-theatre')
  })

  it('места без фотографии в запасной путь не попадают', () => {
    const places = [place('lower-embankment', { photoUrl: null }), place('kvartal-130')]
    expect(heroPhotoFromPack(places)).toContain('kvartal-130')
  })

  it('пустой каталог не роняет запасной путь', () => {
    expect(heroPhotoFromPack([])).toBeNull()
  })

  it('Байкала в списке видов для шапки нет: пока вы читаете этот экран, вы не там', () => {
    expect(HERO_SLUGS.some((s) => /baikal|olkhon|listvyanka/i.test(s))).toBe(false)
  })
})
