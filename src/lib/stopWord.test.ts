import { describe, it, expect } from 'vitest'
import { stopWord } from './stopWord'
describe('stopWord', () => {
  it('ru склонение', () => {
    expect(stopWord(1, 'ru')).toBe('остановка')
    expect(stopWord(2, 'ru')).toBe('остановки')
    expect(stopWord(5, 'ru')).toBe('остановок')
    expect(stopWord(11, 'ru')).toBe('остановок')
  })
  it('en и zh', () => {
    expect(stopWord(1, 'en')).toBe('stop')
    expect(stopWord(3, 'en')).toBe('stops')
    expect(stopWord(3, 'zh')).toBe('站')
  })
})
