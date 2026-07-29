// Чистая логика погоды и статуса льда Байкала — без React/сети, покрыта тестами.
// Погода берётся из open-meteo (без ключа); здесь — только парсинг ответа и деривации.
import type { Lang } from '../i18n/strings'

export interface Tri { ru: string; en: string; zh: string }

export interface DayForecast {
  date: string // ISO YYYY-MM-DD
  code: number
  tmax: number
  tmin: number
}
export interface Weather {
  temp: number
  code: number
  wind: number
  daily: DayForecast[]
}

// WMO weather codes → иконка (Ionicons) + трёхъязычная подпись.
// Группируем коды по смыслу; неизвестное → «переменно».
export function weatherCodeInfo(code: number): { icon: string; label: Tri } {
  const g = (icon: string, ru: string, en: string, zh: string) => ({ icon, label: { ru, en, zh } })
  if (code === 0) return g('sunny-outline', 'Ясно', 'Clear', '晴')
  // «Переменная облачность» не помещалась в строку «сегодня» и обрывалась многоточием.
  if (code === 1 || code === 2) return g('partly-sunny-outline', 'Переменно', 'Partly cloudy', '多云')
  if (code === 3) return g('cloudy-outline', 'Пасмурно', 'Overcast', '阴')
  if (code === 45 || code === 48) return g('cloud-outline', 'Туман', 'Fog', '雾')
  if (code >= 51 && code <= 57) return g('rainy-outline', 'Морось', 'Drizzle', '毛毛雨')
  if (code >= 61 && code <= 67) return g('rainy-outline', 'Дождь', 'Rain', '雨')
  if (code >= 71 && code <= 77) return g('snow-outline', 'Снег', 'Snow', '雪')
  if (code >= 80 && code <= 82) return g('rainy-outline', 'Ливни', 'Rain showers', '阵雨')
  if (code === 85 || code === 86) return g('snow-outline', 'Снегопад', 'Snow showers', '阵雪')
  if (code >= 95 && code <= 99) return g('thunderstorm-outline', 'Гроза', 'Thunderstorm', '雷雨')
  return g('partly-sunny-outline', 'Переменно', 'Variable', '多变')
}

// Разбор ответа open-meteo forecast API. Возвращает null при некорректной структуре.
export function parseWeather(json: unknown): Weather | null {
  const j = json as any
  const cur = j?.current
  const d = j?.daily
  if (!cur || typeof cur.temperature_2m !== 'number' || typeof cur.weather_code !== 'number') return null
  if (!d || !Array.isArray(d.time) || !Array.isArray(d.weather_code)) return null
  const daily: DayForecast[] = d.time.map((date: string, i: number) => ({
    date,
    code: Number(d.weather_code[i] ?? 0),
    tmax: Math.round(Number(d.temperature_2m_max?.[i] ?? 0)),
    tmin: Math.round(Number(d.temperature_2m_min?.[i] ?? 0)),
  }))
  return {
    temp: Math.round(cur.temperature_2m),
    code: cur.weather_code,
    wind: Math.round(Number(cur.wind_speed_10m ?? 0)),
    daily,
  }
}

export type IceState = 'open' | 'forming' | 'solid' | 'melting'

// Приблизительный статус льда Байкала по месяцу (лёд — не в open-meteo, деривация сезонная).
// Реальные даты плавают год к году, поэтому в UI подаём с пометкой «ориентировочно».
export function iceStatus(date: Date): { state: IceState; label: Tri; note: Tri } {
  const m = date.getMonth() + 1 // 1..12
  if (m === 12 || m === 1)
    return {
      state: 'forming',
      label: { ru: 'Лёд встаёт', en: 'Ice forming', zh: '结冰中' },
      note: {
        ru: 'Лёд у берега появляется, но выходить на него ещё рано и опасно.',
        en: 'Ice is forming near the shore, but it is too early and unsafe to walk on.',
        zh: '近岸开始结冰，但上冰仍为时过早且危险。',
      },
    }
  if (m === 2 || m === 3)
    return {
      state: 'solid',
      label: { ru: 'Крепкий лёд', en: 'Solid ice', zh: '坚冰' },
      note: {
        ru: 'Лучшее время для льда: катки, хивусы, экскурсии. Ходите только с гидом.',
        en: 'Best time for the ice: skating, hovercraft, tours. Go only with a guide.',
        zh: '最佳冰上季节：滑冰、气垫船、观光。请务必跟随向导。',
      },
    }
  if (m === 4)
    return {
      state: 'melting',
      label: { ru: 'Лёд тает', en: 'Ice melting', zh: '融冰中' },
      note: {
        ru: 'Лёд слабеет и опасен. Выход на лёд не рекомендуется.',
        en: 'The ice is weakening and dangerous. Walking on it is not advised.',
        zh: '冰层变弱且危险，不建议上冰。',
      },
    }
  return {
    state: 'open',
    label: { ru: 'Открытая вода', en: 'Open water', zh: '开放水域' },
    note: {
      ru: 'Озеро свободно ото льда. Сезон паромов и прогулок по воде.',
      en: 'The lake is ice-free. Ferry and boat season.',
      zh: '湖面无冰，轮渡与游船季节。',
    },
  }
}

export function pick(t: Tri, lang: Lang): string {
  return t[lang] ?? t.ru
}
