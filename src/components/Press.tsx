import React, { useRef } from 'react'
import { Animated, Pressable, type StyleProp, type ViewStyle } from 'react-native'
import * as Haptics from 'expo-haptics'
import { SPRING } from '../lib/motion'
import { useReduceMotion } from '../hooks/useReduceMotion'

export type HapticKind = 'light' | 'selection' | 'none'

/**
 * Единая обёртка нажатия: пружинное сжатие + тактильная отдача.
 * Одна на всё приложение, чтобы отклик был везде одинаковым.
 */
export function Press({
  onPress, haptic = 'light', style, disabled, accessibilityLabel, testID, children,
}: {
  onPress: () => void
  haptic?: HapticKind
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
  children: React.ReactNode
}) {
  const scale = useRef(new Animated.Value(1)).current
  const reduceMotion = useReduceMotion()

  const fire = () => {
    if (haptic === 'none') return
    if (haptic === 'selection') void Haptics.selectionAsync()
    else void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        testID={testID}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={() => { fire(); onPress() }}
        onPressIn={() => { if (!reduceMotion) Animated.spring(scale, SPRING.pressIn).start() }}
        onPressOut={() => { if (!reduceMotion) Animated.spring(scale, SPRING.pressOut).start() }}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}
