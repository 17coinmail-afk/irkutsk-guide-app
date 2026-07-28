import { describe, it, expect } from 'vitest'
import {
  isRunningInMonth, isRunningOn, pickSeasonal, isStale,
  formatWindow, formatDuration, linksToPlace, MODE_ICON,
} from './transport'
import type { TransportLink } from './contentTypes'

const base: TransportLink = {
  id: '1', slug: 'ferry', mode: 'ferry',
  fromSlug: null, toSlug: 'olkhon',
  boardLat: 53.02, boardLng: 106.95,
  durationMin: 20, priceFrom: 0,
  firstDeparture: '07:00', lastDeparture: '22:00',
  months: [5, 6, 7, 8, 9, 10],
  sourceUrl: 'https://example.com', checkedAt: '2026-07-28',
  translations: {
    ru: { title: 'Паром', frequency: 'каждые 30–60 минут', note: null },
    en: { title: 'Ferry', frequency: 'every 30–60 minutes', note: null },
    zh: { title: '轮渡', frequency: '每 30–60 分钟', note: null },
  },
}
const ice: TransportLink = {
  ...base, id: '2', slug: 'ice', mode: 'ice_road',
  months: [2, 3], durationMin: 20, firstDeparture: null, lastDeparture: null,
  translations: {
    ru: { title: 'Переправа', frequency: 'круглосуточно', note: 'опасно вне трассы' },
    en: { title: 'Ice road', frequency: 'around the clock', note: 'deadly off-track' },
    zh: { title: '冰上通道', frequency: '全天', note: '危险' },
  },
}
const shuttle: TransportLink = {
  ...base, id: '3', slug: 'shuttle', mode: 'shuttle',
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], durationMin: 360,
}

describe('сезонность', () => {
  it('месяц входит в расписание', () => {
    expect(isRunningInMonth([5, 6], 5)).toBe(true)
    expect(isRunningInMonth([5, 6], 1)).toBe(false)
  })
  it('в июле ходит паром, а не переправа', () => {
    const july = new Date('2026-07-15T12:00:00')
    expect(isRunningOn(base, july)).toBe(true)
    expect(isRunningOn(ice, july)).toBe(false)
  })
  it('в марте наоборот', () => {
    const march = new Date('2026-03-10T12:00:00')
    expect(isRunningOn(base, march)).toBe(false)
    expect(isRunningOn(ice, march)).toBe(true)
  })
})

describe('pickSeasonal', () => {
  it('зимой переправа поднимается выше парома', () => {
    const march = new Date('2026-03-10T12:00:00')
    const order = pickSeasonal([base, ice, shuttle], march).map((l) => l.slug)
    expect(order[0]).toBe('ice')
    expect(order.indexOf('ferry')).toBeGreaterThan(order.indexOf('shuttle'))
  })
  it('летом первым идёт паром как самый быстрый из работающих', () => {
    const july = new Date('2026-07-15T12:00:00')
    const order = pickSeasonal([shuttle, base, ice], july).map((l) => l.slug)
    expect(order[0]).toBe('ferry')
    expect(order[order.length - 1]).toBe('ice')
  })
  it('внесезонные варианты не выбрасываются', () => {
    const july = new Date('2026-07-15T12:00:00')
    expect(pickSeasonal([base, ice, shuttle], july)).toHaveLength(3)
  })
})

describe('устаревание данных', () => {
  it('свежая проверка не считается устаревшей', () => {
    expect(isStale('2026-07-01', new Date('2026-07-28T00:00:00'))).toBe(false)
  })
  it('через полгода — предупреждаем', () => {
    expect(isStale('2025-12-01', new Date('2026-07-28T00:00:00'))).toBe(true)
  })
  it('битая дата трактуется как устаревшая, а не как свежая', () => {
    expect(isStale('не дата', new Date('2026-07-28T00:00:00'))).toBe(true)
  })
})

describe('форматирование', () => {
  it('окно с часами и частотой', () => {
    expect(formatWindow(base, 'ru')).toBe('07:00–22:00 · каждые 30–60 минут')
  })
  it('без часов остаётся только частота', () => {
    expect(formatWindow(ice, 'ru')).toBe('круглосуточно')
  })
  it('длительность на трёх языках', () => {
    expect(formatDuration(380, 'ru')).toBe('6 ч 20 мин')
    expect(formatDuration(380, 'en')).toBe('6 h 20 min')
    expect(formatDuration(45, 'zh')).toBe('45 分钟')
    expect(formatDuration(120, 'ru')).toBe('2 ч')
  })
})

describe('связь с местами', () => {
  it('находит варианты добраться до места', () => {
    expect(linksToPlace([base, ice, shuttle], 'olkhon')).toHaveLength(3)
    expect(linksToPlace([base], 'arshan')).toHaveLength(0)
  })
  it('у каждого способа передвижения есть иконка', () => {
    for (const mode of ['ferry', 'shuttle', 'bus', 'train', 'kbzh', 'boat', 'ice_road', 'taxi'] as const) {
      expect(MODE_ICON[mode], mode).toBeTruthy()
    }
  })
})
