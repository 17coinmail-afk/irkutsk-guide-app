import React from 'react'
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native'
import { colors, radius, space, font } from '../theme/tokens'
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
  chip: { paddingHorizontal: space.md, paddingVertical: space.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.turquoise, borderColor: colors.turquoise },
  txt: { color: colors.textMuted, fontSize: font.sizes.sm },
  txtActive: { color: colors.bg, fontWeight: '700' },
})
