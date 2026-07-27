import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Glass } from './Glass'
import { Press } from './Press'
import { Skeleton } from './Skeleton'
import { useContent } from '../content/ContentProvider'
import { parseWeather, weatherCodeInfo, iceStatus, pick, type Weather } from '../lib/weather'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'

const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=52.29&longitude=104.30' +
  '&current=temperature_2m,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Irkutsk&forecast_days=1'

/** Строка «сегодня» поверх нижней кромки героя: погода и состояние льда, вход в Практику. */
export function TodayBar() {
  const { lang } = useContent()
  const router = useRouter()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(URL)
        const w = parseWeather(await res.json())
        if (!alive) return
        if (w) setWeather(w)
        else setFailed(true)
      } catch {
        if (alive) setFailed(true)
      }
    })()
    return () => { alive = false }
  }, [])

  // Сеть отвалилась — молча убираем плашку, герой не должен ломаться из-за погоды.
  if (failed) return null
  if (!weather) return <Skeleton style={s.skeleton} radius={radius.pill} />

  const info = weatherCodeInfo(weather.code)
  const ice = iceStatus(new Date())
  const iceTint = ice.state === 'solid' ? colors.turquoise : ice.state === 'open' ? colors.gold : colors.danger

  return (
    <Press onPress={() => router.push('/practical/weather')} haptic="light" style={s.wrap}>
      <Glass edge="none" style={s.bar} intensity={50}>
        <View style={s.cell}>
          <Ionicons name={info.icon as never} size={18} color={colors.turquoise} />
          <Text style={s.temp}>{Math.round(weather.temp)}°</Text>
          <Text style={s.label} numberOfLines={1}>{pick(info.label, lang)}</Text>
        </View>
        <View style={s.divider} />
        <View style={s.cell}>
          <View style={[s.dot, { backgroundColor: iceTint }]} />
          <Text style={s.label} numberOfLines={1}>{pick(ice.label, lang)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
      </Glass>
    </Press>
  )
}

const s = StyleSheet.create({
  wrap: { paddingHorizontal: space.md },
  skeleton: { height: 46, marginHorizontal: space.md },
  bar: {
    flexDirection: 'row', alignItems: 'center', gap: space.smd,
    paddingHorizontal: space.md, paddingVertical: space.smd,
    borderRadius: radius.pill, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderSoft,
  },
  cell: { flexDirection: 'row', alignItems: 'center', gap: space.xs, flexShrink: 1 },
  temp: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.bodyLg },
  label: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, flexShrink: 1 },
  divider: { width: StyleSheet.hairlineWidth, height: 18, backgroundColor: colors.border },
  dot: { width: 8, height: 8, borderRadius: 4 },
})
