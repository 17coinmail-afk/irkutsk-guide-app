import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { parseWeather, weatherCodeInfo, iceStatus, pick, type Weather } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=52.29&longitude=104.30' +
  '&current=temperature_2m,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Irkutsk&forecast_days=5'

const DAYS_RU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAYS_ZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
function weekday(dateStr: string, lang: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const i = d.getDay()
  return lang === 'zh' ? DAYS_ZH[i] : lang === 'en' ? DAYS_EN[i] : DAYS_RU[i]
}

export default function WeatherScreen() {
  const { t, lang } = useContent()
  const [state, setState] = useState<'loading' | 'error' | 'ok'>('loading')
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(URL)
        const json = await res.json()
        const w = parseWeather(json)
        if (!alive) return
        if (w) { setWeather(w); setState('ok') } else setState('error')
      } catch {
        if (alive) setState('error')
      }
    })()
    return () => { alive = false }
  }, [])

  const ice = iceStatus(new Date())
  const iceTint = ice.state === 'solid' ? colors.turquoise : ice.state === 'open' ? colors.gold : colors.danger

  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modWeather')} subtitle={t('approxNote')} />
      <ScrollView contentContainerStyle={s.list}>
        {/* Текущая погода */}
        <View style={s.card}>
          <Text style={s.cardLabel}>{t('weatherHeader')}</Text>
          {state === 'loading' && <ActivityIndicator color={colors.turquoise} style={{ marginVertical: space.md }} />}
          {state === 'error' && <Text style={s.err}>{t('weatherError')}</Text>}
          {state === 'ok' && weather && (
            <View style={s.currentRow}>
              <Ionicons name={weatherCodeInfo(weather.code).icon as any} size={56} color={colors.turquoise} />
              <View style={{ flex: 1 }}>
                <Text style={s.temp}>{weather.temp > 0 ? '+' : ''}{weather.temp}°</Text>
                <Text style={s.cond}>{pick(weatherCodeInfo(weather.code).label, lang)}</Text>
                <View style={s.windRow}>
                  <Ionicons name="navigate-circle-outline" size={14} color={colors.textDim} />
                  <Text style={s.wind}>{weather.wind} м/с</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Прогноз */}
        {state === 'ok' && weather && (
          <View style={s.card}>
            <Text style={s.cardLabel}>{t('forecastTitle')}</Text>
            {weather.daily.map((d, i) => (
              <View key={d.date} style={[s.dayRow, i > 0 && s.dayBorder]}>
                <Text style={s.dayName}>{i === 0 ? t('todayLabel') : weekday(d.date, lang)}</Text>
                <Ionicons name={weatherCodeInfo(d.code).icon as any} size={22} color={colors.textMuted} />
                <Text style={s.dayTemps}>
                  <Text style={s.tmax}>{d.tmax > 0 ? '+' : ''}{d.tmax}°</Text>
                  <Text style={s.tmin}>  {d.tmin > 0 ? '+' : ''}{d.tmin}°</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Лёд Байкала */}
        <View style={[s.card, { borderColor: iceTint }]}>
          <Text style={s.cardLabel}>{t('iceHeader')}</Text>
          <View style={s.iceRow}>
            <Ionicons name="snow-outline" size={28} color={iceTint} />
            <Text style={[s.iceState, { color: iceTint }]}>{pick(ice.label, lang)}</Text>
          </View>
          <Text style={s.iceNote}>{pick(ice.note, lang)}</Text>
        </View>
      </ScrollView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, gap: space.sm, ...shadow.card },
  cardLabel: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, letterSpacing: 1, textTransform: 'uppercase' },
  currentRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  temp: { color: colors.text, fontFamily: fontFamily.headingBlack, fontSize: 44 },
  cond: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.bodyLg },
  windRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  wind: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
  err: { color: colors.danger, fontFamily: fontFamily.body, fontSize: font.scale.body, paddingVertical: space.sm },
  dayRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: space.sm },
  dayBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  dayName: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  dayTemps: { flex: 1, textAlign: 'right' },
  tmax: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  tmin: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.body },
  iceRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  iceState: { fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  iceNote: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21 },
})
