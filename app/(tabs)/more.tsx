import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContent } from '../../src/content/ContentProvider'
import { LANGS } from '../../src/i18n/strings'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'
const LABEL: Record<string, string> = { ru: 'Русский', en: 'English', zh: '中文' }
export default function MoreTab() {
  const { lang, setLang, t, pack } = useContent()
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.wrap}>
        <Text style={s.h}>{t('language')}</Text>
        <View style={s.langRow}>
          {LANGS.map((l) => (
            <Pressable key={l} onPress={() => setLang(l)} style={[s.langBtn, l === lang && s.langActive]}>
              <Text style={[s.langTxt, l === lang && s.langTxtActive]}>{LABEL[l]}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={s.h}>{t('aboutTitle')}</Text>
        <View style={s.card}>
          <Text style={s.body}>{t('aboutBody')}</Text>
          <View style={s.divider} />
          <Text style={s.meta}>{t('cacheStatus')}: v{pack?.version ?? '—'} · {pack?.data.places.length ?? 0} / {pack?.data.routes.length ?? 0}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  wrap: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  h: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h1, marginTop: space.md },
  langRow: { flexDirection: 'row', gap: space.sm },
  langBtn: { paddingHorizontal: space.md, paddingVertical: space.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  langActive: { backgroundColor: colors.turquoise, borderColor: colors.turquoise, ...shadow.glow },
  langTxt: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium },
  langTxtActive: { color: colors.bg, fontFamily: fontFamily.bodyBold },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, gap: space.md },
  body: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 24 },
  divider: { height: 1, backgroundColor: colors.border },
  meta: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
})
