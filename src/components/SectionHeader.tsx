import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, space, font, fontFamily } from '../theme/tokens'

export function SectionHeader({
  title,
  seeAllLabel,
  onSeeAll,
}: {
  title: string
  seeAllLabel?: string
  onSeeAll?: () => void
}) {
  return (
    <View style={s.row}>
      <Text style={s.title}>{title}</Text>
      {onSeeAll ? (
        <Pressable onPress={onSeeAll} hitSlop={8} style={({ pressed }) => [s.seeAll, pressed && s.pressed]}>
          <Text style={s.seeAllTxt}>{seeAllLabel}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.turquoise} />
        </Pressable>
      ) : null}
    </View>
  )
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.md, marginBottom: space.sm },
  title: { color: colors.text, fontSize: font.scale.h2, fontFamily: fontFamily.heading },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 4, paddingLeft: space.sm },
  pressed: { opacity: 0.6 },
  seeAllTxt: { color: colors.turquoise, fontSize: font.scale.small, fontFamily: fontFamily.bodyMedium },
})
