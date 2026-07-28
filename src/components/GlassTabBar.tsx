import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
// Классические JS-вкладки живут в отдельной точке входа expo-router (SDK 57), типы — оттуда же.
import type { BottomTabBarProps } from 'expo-router/js-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { Glass } from './Glass'
import { SPRING } from '../lib/motion'
import { useReduceMotion } from '../hooks/useReduceMotion'
import { colors, fontFamily, radius, space } from '../theme/tokens'

const PILL_INSET = 3
const BAR_HEIGHT = 58

/** Нижняя навигация: стекло + «таблетка», которая переезжает под активную вкладку. */
export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const reduceMotion = useReduceMotion()

  const cell = width / state.routes.length
  const x = useRef(new Animated.Value(state.index * cell)).current

  useEffect(() => {
    const to = state.index * cell
    if (reduceMotion) { x.setValue(to); return }
    Animated.spring(x, { ...SPRING.indicator, toValue: to }).start()
  }, [state.index, cell, x, reduceMotion])

  return (
    <Glass edge="top" density="dense" style={[s.bar, { paddingBottom: insets.bottom }]}>
      <Animated.View
        pointerEvents="none"
        style={[
          s.pill,
          { width: cell - PILL_INSET * 2, left: PILL_INSET, transform: [{ translateX: x }] },
        ]}
      />
      <View style={s.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const focused = state.index === index
          const color = focused ? colors.bg : colors.textMuted
          const label = typeof options.title === 'string' ? options.title : route.name

          const onPress = () => {
            void Haptics.selectionAsync()
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name)
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={label}
              style={s.cell}
            >
              {options.tabBarIcon?.({ focused, color, size: 22 })}
              <Text style={[s.label, { color }, focused && s.labelActive]} numberOfLines={1}>{label}</Text>
            </Pressable>
          )
        })}
      </View>
    </Glass>
  )
}

const s = StyleSheet.create({
  bar: { position: 'relative' },
  row: { flexDirection: 'row', height: BAR_HEIGHT, alignItems: 'center' },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, paddingHorizontal: 2 },
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 9, letterSpacing: 0 },
  labelActive: { fontFamily: fontFamily.bodyBold },
  pill: {
    position: 'absolute',
    top: 6,
    height: BAR_HEIGHT - 12,
    borderRadius: radius.pill,
    // Активная вкладка — не подсветка, а более плотный слой того же материала.
    backgroundColor: 'rgba(255,255,255,0.90)',
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
})

export const TAB_BAR_HEIGHT = BAR_HEIGHT + space.sm
