import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, type ImageStyle, type StyleProp } from 'react-native'
import { Image } from 'expo-image'
import { DURATION } from '../lib/motion'
import { useReduceMotion } from '../hooks/useReduceMotion'

const AnimatedImage = Animated.createAnimatedComponent(Image)

/**
 * Медленный наезд на герой-фото: статичный кадр начинает жить, кадр не «дёргается».
 * Дополнительные трансформации (параллакс экрана) передаются через `extraTransform`.
 */
export function KenBurns({
  source, style, extraTransform, onLoad, contentFit = 'cover',
}: {
  source: string
  style?: StyleProp<ImageStyle>
  extraTransform?: Animated.WithAnimatedArray<{ translateY?: Animated.AnimatedInterpolation<number> }>
  onLoad?: () => void
  contentFit?: 'cover' | 'contain'
}) {
  const zoom = useRef(new Animated.Value(0)).current
  const reduceMotion = useReduceMotion()

  useEffect(() => {
    if (reduceMotion) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(zoom, { toValue: 1, duration: DURATION.kenBurns, useNativeDriver: true, isInteraction: false }),
        Animated.timing(zoom, { toValue: 0, duration: DURATION.kenBurns, useNativeDriver: true, isInteraction: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [zoom, reduceMotion])

  const scale = zoom.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] })
  const transform = [...(extraTransform ?? []), { scale }] as never

  return (
    <AnimatedImage
      source={source}
      style={[StyleSheet.absoluteFill, style, reduceMotion ? undefined : { transform }]}
      contentFit={contentFit}
      cachePolicy="memory-disk"
      transition={320}
      onLoad={onLoad}
    />
  )
}
