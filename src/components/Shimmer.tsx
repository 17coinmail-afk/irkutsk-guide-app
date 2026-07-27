import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useReduceMotion } from '../hooks/useReduceMotion'

/** Бегущий блик поверх родителя: скелетоны загрузки и главная кнопка действия. */
export function Shimmer({
  style, radius = 0, width = 260,
}: {
  style?: StyleProp<ViewStyle>
  radius?: number
  /** Ширина «луча»: чем шире элемент, тем длиннее ход блика. */
  width?: number
}) {
  const x = useRef(new Animated.Value(-1)).current
  const reduceMotion = useReduceMotion()

  useEffect(() => {
    if (reduceMotion) return
    const loop = Animated.loop(
      Animated.timing(x, { toValue: 1, duration: 1600, useNativeDriver: true, isInteraction: false }),
    )
    loop.start()
    return () => loop.stop()
  }, [x, reduceMotion])

  if (reduceMotion) return null

  const translateX = x.interpolate({ inputRange: [-1, 1], outputRange: [-width, width] })
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden' }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.13)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  )
}
