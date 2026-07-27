import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { EVENTS } from '../../src/content/practical/events'
import { pick } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

export default function Events() {
  const { t, lang } = useContent()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modEvents')} subtitle={t('datesNote')} />
      <ScrollView contentContainerStyle={s.list}>
        {EVENTS.map((it, i) => (
          <View key={i} style={s.card}>
            <View style={s.head}>
              <View style={s.iconWrap}><Ionicons name={it.icon as any} size={20} color={colors.turquoise} /></View>
              <Text style={s.name}>{pick(it.name, lang)}</Text>
              <View style={s.chip}><Text style={s.chipTxt}>{pick(it.when, lang)}</Text></View>
            </View>
            <Text style={s.desc}>{pick(it.desc, lang)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, gap: space.sm, ...shadow.card },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  iconWrap: { width: 36, height: 36, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  name: { flex: 1, color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  chip: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: space.sm, paddingVertical: 3 },
  chipTxt: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21 },
})
