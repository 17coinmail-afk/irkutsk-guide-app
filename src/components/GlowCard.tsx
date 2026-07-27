import React from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, gradients, radius, shadow, space } from '../theme/tokens'

/**
 * Карточка со светящейся кромкой: градиент рисуется подложкой, содержимое лежит поверх
 * с зазором в 1 px — так кромка получается ровной на любом радиусе.
 * `ice` — интерактивное/избранное, `gold` — смысловой акцент (истории).
 */
export function GlowCard({
  tone = 'ice', glow = false, style, contentStyle, children,
}: {
  tone?: 'ice' | 'gold'
  glow?: boolean
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  children: React.ReactNode
}) {
  const edge = (tone === 'gold' ? gradients.goldEdge : gradients.iceEdge) as unknown as [string, string, string]
  const glowStyle = glow
    ? { ...shadow.glow, shadowColor: tone === 'gold' ? colors.gold : colors.turquoise }
    : undefined

  return (
    <LinearGradient
      colors={edge}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[s.edge, glowStyle, style]}
    >
      <View style={[s.inner, contentStyle]}>{children}</View>
    </LinearGradient>
  )
}

const s = StyleSheet.create({
  edge: { borderRadius: radius.card, padding: 1 },
  inner: {
    borderRadius: radius.card - 1,
    backgroundColor: colors.surface,
    padding: space.md,
    overflow: 'hidden',
  },
})
