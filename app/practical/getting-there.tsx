import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { TRANSPORT } from '../../src/content/practical/transport'
import { pick } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

export default function GettingThere() {
  const { t, lang } = useContent()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modGetThere')} subtitle={t('pricesApprox')} />
      <ScrollView contentContainerStyle={s.list}>
        {TRANSPORT.map((r) => (
          <View key={r.id} style={s.card}>
            <View style={s.head}>
              <View style={s.iconWrap}><Ionicons name={r.icon as any} size={22} color={colors.turquoise} /></View>
              <Text style={s.title}>{pick(r.title, lang)}</Text>
            </View>
            <Text style={s.summary}>{pick(r.summary, lang)}</Text>
            {r.options.map((o, i) => (
              <View key={i} style={[s.opt, i > 0 && s.optBorder]}>
                <View style={s.optHead}>
                  <Text style={s.optMode}>{pick(o.mode, lang)}</Text>
                  <Text style={s.optPrice}>{pick(o.price, lang)}</Text>
                </View>
                <View style={s.optMeta}>
                  <Ionicons name="time-outline" size={14} color={colors.textDim} />
                  <Text style={s.optDuration}>{pick(o.duration, lang)}</Text>
                </View>
                <Text style={s.optNote}>{pick(o.note, lang)}</Text>
              </View>
            ))}
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
  iconWrap: { width: 40, height: 40, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.turquoise, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  title: { flex: 1, color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  summary: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21 },
  opt: { gap: 4, paddingTop: space.sm },
  optBorder: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: space.xs },
  optHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optMode: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  optPrice: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  optMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  optDuration: { color: colors.textDim, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  optNote: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, lineHeight: 19 },
})
