import React from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { EMERGENCY } from '../../src/content/practical/emergency'
import { pick } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

export default function Emergency() {
  const { t, lang } = useContent()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modEmergency')} subtitle={t('modEmergencySub')} />
      <ScrollView contentContainerStyle={s.list}>
        {EMERGENCY.map((c) => (
          <Pressable key={c.id} style={s.card} onPress={() => Linking.openURL(`tel:${c.tel}`)}>
            <View style={s.iconWrap}><Ionicons name={c.icon as any} size={24} color={colors.danger} /></View>
            <View style={s.text}>
              <Text style={s.label}>{pick(c.label, lang)}</Text>
              <Text style={s.desc}>{pick(c.desc, lang)}</Text>
            </View>
            <View style={s.callBtn}><Ionicons name="call" size={20} color={colors.bg} /></View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  card: { flexDirection: 'row', alignItems: 'center', gap: space.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, ...shadow.card },
  iconWrap: { width: 46, height: 46, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.danger, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  text: { flex: 1 },
  label: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, lineHeight: 18 },
  callBtn: { width: 42, height: 42, borderRadius: radius.pill, backgroundColor: colors.turquoise, alignItems: 'center', justifyContent: 'center', ...shadow.glow },
})
