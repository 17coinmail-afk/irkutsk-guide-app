import { describe, it, expect } from 'vitest'
import { PEOPLE, personById } from './people'
import { LANGS } from '../i18n/strings'

describe('люди Иркутска', () => {
  it('идентификаторы уникальны', () => {
    expect(new Set(PEOPLE.map((p) => p.id)).size).toBe(PEOPLE.length)
  })

  it('у каждого есть имя, роль и текст на трёх языках', () => {
    for (const p of PEOPLE) for (const lang of LANGS) {
      expect(p.name[lang].trim().length, `${p.id}.name.${lang}`).toBeGreaterThan(0)
      expect(p.role[lang].trim().length, `${p.id}.role.${lang}`).toBeGreaterThan(0)
      // Иероглифы вмещают больше смысла в знак — порог для zh ниже
      const min = lang === 'zh' ? 60 : 200
      expect(p.text[lang].trim().length, `${p.id}.text.${lang}`).toBeGreaterThan(min)
    }
  })

  it('в китайском и английском нет кириллицы — признак недопереведённой строки', () => {
    for (const p of PEOPLE) {
      expect(/[А-Яа-яЁё]/.test(p.name.zh + p.role.zh + p.text.zh), `${p.id}.zh`).toBe(false)
      expect(/[А-Яа-яЁё]/.test(p.name.en + p.role.en + p.text.en), `${p.id}.en`).toBe(false)
    }
  })

  it('годы жизни записаны единообразно', () => {
    for (const p of PEOPLE) expect(p.years, p.id).toMatch(/^\d{4}(–\d{4})?$/)
  })

  it('поиск по идентификатору работает', () => {
    expect(personById('kolchak')?.name.ru).toBe('Александр Колчак')
    expect(personById('нет такого')).toBeUndefined()
  })

  it('у большинства есть привязка к месту — иначе раздел висит в воздухе', () => {
    const linked = PEOPLE.filter((p) => p.placeSlug).length
    expect(linked).toBeGreaterThanOrEqual(Math.ceil(PEOPLE.length * 0.8))
  })

  it('у каждого пять фото, и все они с подписью на трёх языках', () => {
    for (const p of PEOPLE) {
      expect(p.photos?.length, p.id).toBe(5)
      for (const ph of p.photos ?? []) {
        expect(ph.file, ph.file).toMatch(new RegExp(`^${p.id}-\\d\\.jpg$`))
        for (const lang of ['ru', 'en', 'zh'] as const) {
          // Порог зависит от языка: «演奏中» — это полноценная подпись из трёх знаков,
          // а три буквы кириллицей или латиницей означали бы обрубок.
          const min = lang === 'zh' ? 2 : 4
          expect(ph.caption[lang].length, `${ph.file}.${lang}`).toBeGreaterThanOrEqual(min)
        }
      }
    }
  })

  it('у каждого фото есть автор, лицензия и ссылка на источник', () => {
    // CC BY и CC BY-SA требуют указания автора и ссылки на работу: без этого
    // публиковать снимок нельзя, поэтому проверяем не «желательно», а строго.
    for (const p of PEOPLE) {
      for (const ph of p.photos ?? []) {
        expect(ph.credit, ph.file).toMatch(/ · .+$/)
        expect(ph.source, ph.file).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      }
    }
  })

  it('внутри одной галереи снимки не повторяются', () => {
    for (const p of PEOPLE) {
      const sources = (p.photos ?? []).map((ph) => ph.source)
      expect(new Set(sources).size, p.id).toBe(sources.length)
    }
  })
})
