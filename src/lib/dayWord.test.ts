import { describe, it, expect } from 'vitest'
import { dayWord } from './dayWord'
describe('dayWord', () => {
  it('ru склонение', () => {
    expect(dayWord(1, 'ru')).toBe('день')
    expect(dayWord(2, 'ru')).toBe('дня')
    expect(dayWord(5, 'ru')).toBe('дней')
    expect(dayWord(11, 'ru')).toBe('дней')
  })
  it('en и zh', () => {
    expect(dayWord(1, 'en')).toBe('day')
    expect(dayWord(3, 'en')).toBe('days')
    expect(dayWord(3, 'zh')).toBe('天')
  })
})
