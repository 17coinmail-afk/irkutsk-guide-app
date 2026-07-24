import React, { useEffect, useRef } from 'react'
import { Animated, type StyleProp, type ViewStyle } from 'react-native'
import { useReduceMotion } from '../hooks/useReduceMotion'

/** Плавное появление секции при монтировании (fade + translateY), уважает reduce-motion. */
export function FadeInUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: StyleProp<ViewStyle> }) {
  const reduceMotion = useReduceMotion()
  const anim = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current

  useEffect(() => {
    if (reduceMotion) { anim.setValue(1); return }
    const t = Animated.timing(anim, { toValue: 1, duration: 520, delay, useNativeDriver: true })
    t.start()
    return () => t.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, delay])

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] })
  return <Animated.View style={[style, { opacity: anim, transform: [{ translateY }] }]}>{children}</Animated.View>
}
