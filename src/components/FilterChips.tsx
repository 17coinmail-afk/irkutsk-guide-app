import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { colors, font, fontFamily, radius, shadow, space } from '../theme/tokens'

export interface ChipOpt { key: string; label: string }

export function FilterChips({ value, options, onChange }: { value: string; options: ChipOpt[]; onChange: (k: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
      {options.map((o) => {
        const active = o.key === value
        return (
          <Pressable key={o.key} onPress={() => onChange(o.key)} style={[s.chip, active && s.chipActive]}>
            <Text style={[s.txt, active && s.txtActive]}>{o.label}</Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  row: { gap: space.sm, paddingVertical: space.sm, paddingHorizontal: space.md },
  chip: { paddingHorizontal: space.md, paddingVertical: 9, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.turquoise, borderColor: colors.turquoise, ...shadow.glow },
  txt: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 0.6 },
  txtActive: { color: colors.bg, fontFamily: fontFamily.bodyBold },
})
