import React from 'react'
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { glassPlan, type GlassDensity, type GlassTone, type Os } from '../lib/glass'

/**
 * Стеклянная панель — общий материал интерфейса: шапки, таб-бар, карточка фактов, чипы.
 * Блюр там, где он дёшев; плотная подложка там, где дорог. Кромка света по верхнему краю
 * обязательна: без неё панель читается как обычная заливка, а не как стекло.
 */
export function Glass({
  style, intensity, density = 'regular', tone = 'neutral', edge = 'top', children,
}: {
  style?: StyleProp<ViewStyle>
  intensity?: number
  density?: GlassDensity
  tone?: GlassTone
  edge?: 'top' | 'bottom' | 'none'
  children?: React.ReactNode
}) {
  const plan = glassPlan(Platform.OS as Os, { density, tone, intensity })

  const edgeLine = edge === 'none' ? null : (
    <View
      pointerEvents="none"
      style={[
        s.edge,
        edge === 'top' ? s.edgeTop : s.edgeBottom,
        { backgroundColor: plan.edgeColor },
      ]}
    />
  )

  if (plan.mode === 'blur') {
    return (
      <BlurView intensity={plan.intensity} tint="dark" style={[s.base, style]}>
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: plan.background }]} />
        {edgeLine}
        {children}
      </BlurView>
    )
  }
  return (
    <View style={[s.base, { backgroundColor: plan.background }, style]}>
      {edgeLine}
      {children}
    </View>
  )
}

const s = StyleSheet.create({
  base: { overflow: 'hidden' },
  edge: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth },
  edgeTop: { top: 0 },
  edgeBottom: { bottom: 0 },
})
