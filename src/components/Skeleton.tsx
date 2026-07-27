import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { colors, radius as radiusTokens } from '../theme/tokens'
import { useReduceMotion } from '../hooks/useReduceMotion'
import { Shimmer } from './Shimmer'

/** Пульсирующий плейсхолдер для карточек/фото, пока грузится pack или изображение. */
export function Skeleton({ style, radius = radiusTokens.md }: { style?: StyleProp<ViewStyle>; radius?: number }) {
  const opacity = useRef(new Animated.Value(0.5)).current
  const reduceMotion = useReduceMotion()

  useEffect(() => {
    if (reduceMotion) { opacity.setValue(0.6); return }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 750, useNativeDriver: true }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [opacity, reduceMotion])

  return (
    <Animated.View style={[s.base, { borderRadius: radius, opacity }, style]}>
      <Shimmer radius={radius} />
    </Animated.View>
  )
}

const s = StyleSheet.create({
  base: { backgroundColor: colors.surfaceAlt },
})
