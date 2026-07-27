import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { SOUVENIRS } from '../../src/content/practical/souvenirs'
import { pick } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

export default function Souvenirs() {
  const { t, lang } = useContent()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modSouvenirs')} subtitle={t('modSouvenirsSub')} />
      <ScrollView contentContainerStyle={s.list}>
        {SOUVENIRS.map((it, i) => (
          <View key={i} style={s.card}>
            <View style={s.iconWrap}><Ionicons name={it.icon as any} size={22} color={colors.turquoise} /></View>
            <View style={s.text}>
              <Text style={s.name}>{pick(it.name, lang)}</Text>
              <Text style={s.desc}>{pick(it.desc, lang)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  card: { flexDirection: 'row', gap: space.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, ...shadow.card },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.turquoise, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  text: { flex: 1 },
  name: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21, marginTop: 2 },
})
