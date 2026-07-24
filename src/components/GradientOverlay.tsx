import React from 'react'
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradients } from '../theme/tokens'

/** Обёртка LinearGradient для читаемости заголовков поверх фото. */
export function GradientOverlay({
  variant = 'photo',
  style,
}: {
  variant?: 'photo' | 'hero' | 'scrim'
  style?: StyleProp<ViewStyle>
}) {
  const stops = variant === 'hero' ? gradients.heroOverlay : variant === 'scrim' ? gradients.scrim : gradients.photoOverlay
  return <LinearGradient colors={stops} style={[StyleSheet.absoluteFill, style]} pointerEvents="none" />
}
