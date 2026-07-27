import React from 'react'
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { glassPlan, type Os } from '../lib/glass'
import { colors } from '../theme/tokens'

/** Стеклянная панель: блюр там, где он дёшев, плотная подложка там, где дорог. */
export function Glass({
  style, intensity, edge = 'top', children,
}: {
  style?: StyleProp<ViewStyle>
  intensity?: number
  /** С какой стороны светлая кромка, отделяющая стекло от контента. */
  edge?: 'top' | 'bottom' | 'none'
  children?: React.ReactNode
}) {
  const plan = glassPlan(Platform.OS as Os, intensity)
  const edgeStyle =
    edge === 'top' ? s.edgeTop : edge === 'bottom' ? s.edgeBottom : undefined

  if (plan.mode === 'blur') {
    return (
      <BlurView intensity={plan.intensity} tint="dark" style={[s.base, edgeStyle, style]}>
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: plan.background }]} />
        {children}
      </BlurView>
    )
  }
  return <View style={[s.base, edgeStyle, { backgroundColor: plan.background }, style]}>{children}</View>
}

const s = StyleSheet.create({
  base: { overflow: 'hidden' },
  edgeTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderSoft },
  edgeBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderSoft },
})
