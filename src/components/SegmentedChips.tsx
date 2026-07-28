import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native'
import { Press } from './Press'
import { SPRING, indicatorGeometry } from '../lib/motion'
import { useReduceMotion } from '../hooks/useReduceMotion'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'

export interface ChipOpt { key: string; label: string }

const GAP = space.sm

/** Фильтры со скользящим индикатором: активность показывает движение, а не перекраска. */
export function SegmentedChips({
  value, options, onChange,
}: {
  value: string
  options: ChipOpt[]
  onChange: (k: string) => void
}) {
  const [widths, setWidths] = useState<number[]>([])
  const x = useRef(new Animated.Value(0)).current
  const w = useRef(new Animated.Value(0)).current
  const reduceMotion = useReduceMotion()

  const activeIndex = options.findIndex((o) => o.key === value)
  const measured = widths.length === options.length && widths.every((n) => n > 0)

  useEffect(() => {
    if (!measured) return
    const geo = indicatorGeometry(widths, GAP, activeIndex)
    if (reduceMotion) { x.setValue(geo.x); w.setValue(geo.width); return }
    Animated.parallel([
      Animated.spring(x, { ...SPRING.indicator, toValue: geo.x }),
      Animated.spring(w, { ...SPRING.indicator, toValue: geo.width }),
    ]).start()
  }, [measured, widths, activeIndex, x, w, reduceMotion])

  const onChipLayout = (i: number) => (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width
    setWidths((prev) => {
      if (prev[i] === width) return prev
      const next = [...prev]
      next[i] = width
      return next
    })
  }

  return (
    // Высота задаётся явно: горизонтальный ScrollView внутри flex-колонки иначе схлопывается.
    <View style={s.wrap}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.scroll} contentContainerStyle={s.row}>
      <View style={s.track}>
        {measured ? (
          <Animated.View
            pointerEvents="none"
            style={[s.indicator, { width: w, transform: [{ translateX: x }] }]}
          />
        ) : null}
        {options.map((o, i) => {
          const active = o.key === value
          return (
            <Press key={o.key} onPress={() => onChange(o.key)} haptic="selection" accessibilityLabel={o.label}>
              <View onLayout={onChipLayout(i)} style={[s.chip, active && s.chipActive]}>
                <Text style={[s.txt, active && s.txtActive]}>{o.label}</Text>
              </View>
            </Press>
          )
        })}
      </View>
    </ScrollView>
    </View>
  )
}

const CHIP_H = 38
const s = StyleSheet.create({
  wrap: { height: CHIP_H + space.sm * 2 },
  scroll: { flexGrow: 0 },
  row: { paddingVertical: space.sm, paddingHorizontal: space.md },
  track: { flexDirection: 'row', gap: GAP, position: 'relative' },
  indicator: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.90)',
    shadowColor: '#000', shadowOpacity: 0.22, shadowRadius: 7, shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chip: {
    paddingHorizontal: space.md, height: CHIP_H, justifyContent: 'center',
    borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  // Активный чип отдаёт фон индикатору: рамка гасится, чтобы под ней не было двойного контура.
  chipActive: { borderColor: 'transparent', backgroundColor: 'transparent' },
  txt: {
    color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.chip,
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  txtActive: { color: colors.bg, fontFamily: fontFamily.bodyBold },
})
