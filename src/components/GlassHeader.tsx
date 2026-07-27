import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Glass } from './Glass'
import { Press } from './Press'
import { colors, fontFamily, font, space } from '../theme/tokens'

/**
 * Шапка, привязанная к скроллу: пока герой виден — только кнопка «назад»,
 * дальше проявляется стекло и заголовок выезжает снизу.
 */
export function GlassHeader({
  title, scrollY, from = 60, to = 140, onBack, right,
}: {
  title: string
  scrollY: Animated.Value
  from?: number
  to?: number
  onBack?: () => void
  right?: React.ReactNode
}) {
  const insets = useSafeAreaInsets()
  const range = { inputRange: [from, to], extrapolate: 'clamp' as const }

  const glassOpacity = scrollY.interpolate({ ...range, outputRange: [0, 1] })
  const titleOpacity = scrollY.interpolate({ ...range, outputRange: [0, 1] })
  const titleShift = scrollY.interpolate({ ...range, outputRange: [12, 0] })

  return (
    <View pointerEvents="box-none" style={[s.wrap, { paddingTop: insets.top }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: glassOpacity }]} pointerEvents="none">
        <Glass edge="bottom" style={StyleSheet.absoluteFill} />
      </Animated.View>

      <View style={s.row}>
        {onBack ? (
          <Press onPress={onBack} haptic="light" accessibilityLabel="Назад">
            <View style={s.iconBtn}>
              <Ionicons name="chevron-back" size={22} color={colors.text} />
            </View>
          </Press>
        ) : <View style={s.iconBtn} />}

        <Animated.Text
          numberOfLines={1}
          style={[s.title, { opacity: titleOpacity, transform: [{ translateY: titleShift }] }]}
        >
          {title}
        </Animated.Text>

        <View style={s.rightSlot}>{right}</View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  row: { height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: space.sm, gap: space.sm },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(7,12,18,0.45)',
  },
  title: { flex: 1, color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  rightSlot: { minWidth: 38, alignItems: 'flex-end' },
})
