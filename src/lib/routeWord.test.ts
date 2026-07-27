import { describe, it, expect } from 'vitest'
import { routeWord } from './routeWord'

describe('routeWord', () => {
  it('русское склонение по последней цифре', () => {
    expect(routeWord(1, 'ru')).toBe('маршрут')
    expect(routeWord(3, 'ru')).toBe('маршрута')
    expect(routeWord(7, 'ru')).toBe('маршрутов')
    expect(routeWord(21, 'ru')).toBe('маршрут')
  })
  it('исключение для 11–14', () => {
    expect(routeWord(11, 'ru')).toBe('маршрутов')
    expect(routeWord(13, 'ru')).toBe('маршрутов')
  })
  it('английский и китайский', () => {
    expect(routeWord(1, 'en')).toBe('route')
    expect(routeWord(2, 'en')).toBe('routes')
    expect(routeWord(5, 'zh')).toBe('条路线')
  })
})
