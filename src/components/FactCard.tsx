import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Glass } from './Glass'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'

export interface Fact { icon: string; text: string; note?: string }

/** Стеклянная карточка фактов, лежащая на нижней кромке герой-фото. */
export function FactCard({ eyebrow, facts }: { eyebrow: string; facts: Fact[] }) {
  if (facts.length === 0) return null
  return (
    <Glass edge="none" style={s.card} intensity={55}>
      {eyebrow ? <Text style={s.eyebrow}>{eyebrow}</Text> : null}
      {facts.map((f, i) => (
        <View key={i} style={s.row}>
          <Ionicons name={f.icon as never} size={16} color={colors.turquoise} />
          <Text style={s.txt} numberOfLines={2}>
            {f.text}
            {f.note ? <Text style={s.note}>{` · ${f.note}`}</Text> : null}
          </Text>
        </View>
      ))}
    </Glass>
  )
}

const s = StyleSheet.create({
  card: {
    marginHorizontal: space.md,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSoft,
    padding: space.md,
    gap: space.sm,
  },
  eyebrow: {
    color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip,
    textTransform: 'uppercase', letterSpacing: 1.2,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  txt: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.body, flex: 1 },
  note: { color: colors.textDim },
})
