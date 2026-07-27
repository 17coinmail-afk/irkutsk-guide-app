import { describe, it, expect } from 'vitest'
import { parseWeather, weatherCodeInfo, iceStatus, pick } from './weather'

describe('parseWeather', () => {
  const good = {
    current: { temperature_2m: -12.4, weather_code: 71, wind_speed_10m: 3.6 },
    daily: {
      time: ['2026-02-01', '2026-02-02'],
      weather_code: [71, 3],
      temperature_2m_max: [-8.1, -5.9],
      temperature_2m_min: [-20.2, -18.7],
    },
  }
  it('парсит текущую погоду с округлением', () => {
    const w = parseWeather(good)!
    expect(w.temp).toBe(-12)
    expect(w.code).toBe(71)
    expect(w.wind).toBe(4)
  })
  it('парсит дневной прогноз', () => {
    const w = parseWeather(good)!
    expect(w.daily).toHaveLength(2)
    expect(w.daily[0]).toEqual({ date: '2026-02-01', code: 71, tmax: -8, tmin: -20 })
  })
  it('возвращает null на мусоре', () => {
    expect(parseWeather(null)).toBeNull()
    expect(parseWeather({})).toBeNull()
    expect(parseWeather({ current: { temperature_2m: 1, weather_code: 0 } })).toBeNull()
  })
})

describe('weatherCodeInfo', () => {
  it('ясно / снег / гроза', () => {
    expect(weatherCodeInfo(0).label.ru).toBe('Ясно')
    expect(weatherCodeInfo(73).label.en).toBe('Snow')
    expect(weatherCodeInfo(95).label.zh).toBe('雷雨')
  })
  it('неизвестный код → переменно', () => {
    expect(weatherCodeInfo(999).label.en).toBe('Variable')
  })
})

describe('iceStatus', () => {
  it('февраль/март — крепкий лёд', () => {
    expect(iceStatus(new Date('2026-03-15')).state).toBe('solid')
    expect(iceStatus(new Date('2026-02-10')).state).toBe('solid')
  })
  it('декабрь/январь — лёд встаёт', () => {
    expect(iceStatus(new Date('2026-12-20')).state).toBe('forming')
    expect(iceStatus(new Date('2026-01-05')).state).toBe('forming')
  })
  it('апрель — тает', () => {
    expect(iceStatus(new Date('2026-04-10')).state).toBe('melting')
  })
  it('лето — открытая вода', () => {
    expect(iceStatus(new Date('2026-07-27')).state).toBe('open')
    expect(iceStatus(new Date('2026-09-01')).state).toBe('open')
  })
})

describe('pick', () => {
  it('берёт язык, фолбэк на ru', () => {
    const t = { ru: 'р', en: 'e', zh: 'z' }
    expect(pick(t, 'en')).toBe('e')
    expect(pick(t, 'zh')).toBe('z')
  })
})
