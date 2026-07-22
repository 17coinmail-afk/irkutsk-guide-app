import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useContent } from '../../src/content/ContentProvider'
import { LANGS } from '../../src/i18n/strings'
import { colors, space, font, radius } from '../../src/theme/tokens'
const LABEL: Record<string, string> = { ru: 'Русский', en: 'English', zh: '中文' }
export default function MoreTab() {
  const { lang, setLang, t, pack } = useContent()
  return (
    <View style={s.wrap}>
      <Text style={s.h}>{t('language')}</Text>
      <View style={s.langRow}>
        {LANGS.map((l) => (
          <Pressable key={l} onPress={() => setLang(l)} style={[s.langBtn, l === lang && s.langActive]}>
            <Text style={[s.langTxt, l === lang && s.langTxtActive]}>{LABEL[l]}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={s.h}>{t('aboutTitle')}</Text>
      <Text style={s.body}>{t('aboutBody')}</Text>
      <Text style={s.meta}>{t('cacheStatus')}: v{pack?.version ?? '—'} · {pack?.data.places.length ?? 0} / {pack?.data.routes.length ?? 0}</Text>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: space.md, gap: space.md },
  h: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '700', marginTop: space.md },
  langRow: { flexDirection: 'row', gap: space.sm },
  langBtn: { paddingHorizontal: space.md, paddingVertical: space.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  langActive: { backgroundColor: colors.turquoise, borderColor: colors.turquoise },
  langTxt: { color: colors.textMuted },
  langTxtActive: { color: colors.bg, fontWeight: '700' },
  body: { color: colors.textMuted, fontSize: font.sizes.md, lineHeight: 22 },
  meta: { color: colors.textMuted, fontSize: font.sizes.sm, marginTop: space.md },
})
