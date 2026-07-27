import { describe, it, expect } from 'vitest'
import { stopsPerDay, dayOfStop, isDayBreak } from './routePlan'

describe('stopsPerDay', () => {
  it('делит с округлением вверх', () => {
    expect(stopsPerDay(7, 3)).toBe(3)
    expect(stopsPerDay(6, 3)).toBe(2)
  })
  it('вырожденные значения не роняют', () => {
    expect(stopsPerDay(0, 3)).toBe(0)
    expect(stopsPerDay(5, 0)).toBe(0)
  })
})

describe('dayOfStop', () => {
  it('первые остановки — первый день', () => {
    expect(dayOfStop(0, 6, 3)).toBe(1)
    expect(dayOfStop(1, 6, 3)).toBe(1)
    expect(dayOfStop(2, 6, 3)).toBe(2)
  })
  it('не выходит за число дней при неровном делении', () => {
    // 7 остановок на 3 дня → по 3; последняя остановка не должна дать «день 4»
    expect(dayOfStop(6, 7, 3)).toBe(3)
  })
})

describe('isDayBreak', () => {
  it('однодневный маршрут без разделителей', () => {
    expect(isDayBreak(0, 5, 1)).toBe(false)
    expect(isDayBreak(3, 5, 1)).toBe(false)
  })
  it('многодневный: разделитель перед первой остановкой каждого дня', () => {
    const breaks = [0, 1, 2, 3, 4, 5].filter((i) => isDayBreak(i, 6, 3))
    expect(breaks).toEqual([0, 2, 4])
  })
})
