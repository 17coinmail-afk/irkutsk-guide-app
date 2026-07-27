import { describe, it, expect } from 'vitest'
import { categoryLabel, cuisineLabel, themeLabel, placeChipLabel, LABEL_TABLES } from './labels'
import { LANGS } from './strings'

describe('подписи категорий/кухонь/тем', () => {
  it('каждая таблица полна на трёх языках и без пустых строк', () => {
    for (const [name, table] of Object.entries(LABEL_TABLES)) {
      for (const [key, tri] of Object.entries(table)) {
        for (const lang of LANGS) {
          expect(tri[lang], `${name}.${key}.${lang}`).toBeTruthy()
          expect(tri[lang].trim().length, `${name}.${key}.${lang}`).toBeGreaterThan(0)
        }
      }
    }
  })
  it('покрыты все категории ContentPack', () => {
    const fromPack = ['nature', 'museum', 'food', 'walk', 'culture', 'fun', 'wildlife', 'city', 'lodging', 'activity', 'other']
    for (const c of fromPack) expect(categoryLabel(c, 'ru'), c).not.toBe(c)
  })
  it('покрыты все темы маршрутов ContentPack', () => {
    const fromPack = ['classic', 'gastro', 'ice', 'summer', 'family', 'spiritual', 'museum', 'walk', 'nature', 'active', 'olkhon', 'kbzh']
    for (const th of fromPack) expect(themeLabel(th, 'en'), th).not.toBe(th)
  })
  it('незнакомый ключ отдаётся как есть, а не пустой строкой', () => {
    expect(categoryLabel('spaceport', 'ru')).toBe('spaceport')
  })
  it('пустое значение не роняет и даёт пустую строку', () => {
    expect(cuisineLabel(null, 'ru')).toBe('')
    expect(themeLabel(undefined, 'zh')).toBe('')
  })
  it('у заведения подпись — кухня, у остальных — категория', () => {
    expect(placeChipLabel({ category: 'food', cuisine: 'buryat' }, 'ru')).toBe('Бурятская')
    expect(placeChipLabel({ category: 'food', cuisine: null }, 'ru')).toBe('Еда')
    expect(placeChipLabel({ category: 'nature' }, 'en')).toBe('Nature')
  })
})
