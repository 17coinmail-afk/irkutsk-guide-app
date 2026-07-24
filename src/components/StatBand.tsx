import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'
import { useReduceMotion } from '../hooks/useReduceMotion'

export interface StatItem {
  id: string
  /** Целевое значение (может быть отрицательным, напр. глубина −1642 м). */
  target: number
  unit: string
  label: string
  /** Форматирование числа (по умолчанию — округление). */
  format?: (value: number) => string
}

function StatValue({ item, reduceMotion }: { item: StatItem; reduceMotion: boolean }) {
  const [display, setDisplay] = useState(reduceMotion ? item.target : 0)
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (reduceMotion) { setDisplay(item.target); return }
    anim.setValue(0)
    const id = anim.addListener(({ value }) => setDisplay(value))
    Animated.timing(anim, {
      toValue: item.target,
      duration: 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start()
    return () => anim.removeListener(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.target, reduceMotion])

  const format = item.format ?? ((v: number) => `${Math.round(v)}`)
  return (
    <View style={s.item}>
      <Text style={s.value}>{format(display)}<Text style={s.unit}> {item.unit}</Text></Text>
      <Text style={s.label}>{item.label}</Text>
    </View>
  )
}

/** «Байкал в цифрах» — анимированные счётчики, запускаются при монтировании (уважают reduce-motion). */
export function StatBand({ stats }: { stats: StatItem[] }) {
  const reduceMotion = useReduceMotion()
  return (
    <View style={s.band}>
      {stats.map((item) => <StatValue key={item.id} item={item} reduceMotion={reduceMotion} />)}
    </View>
  )
}

const s = StyleSheet.create({
  band: {
    flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.surface,
    borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    marginHorizontal: space.md, padding: space.md, gap: space.md,
  },
  item: { flexBasis: '45%', flexGrow: 1 },
  value: { color: colors.gold, fontFamily: fontFamily.heading, fontSize: font.scale.h1 },
  unit: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  label: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
})
