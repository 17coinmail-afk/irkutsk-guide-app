import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { colors, space, font, fontFamily } from '../theme/tokens'

// Единая шапка под-экранов: кнопка «назад» + заголовок + опциональный подзаголовок.
export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  return (
    <View style={[s.wrap, { paddingTop: insets.top + space.sm }]}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={s.back}>
        <Ionicons name="chevron-back" size={26} color={colors.text} />
      </Pressable>
      <View style={s.titles}>
        <Text style={s.title} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={s.sub} numberOfLines={1}>{subtitle}</Text> : null}
      </View>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md, paddingBottom: space.sm, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginLeft: -6 },
  titles: { flex: 1 },
  title: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  sub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 1 },
})
