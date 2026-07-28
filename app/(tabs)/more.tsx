import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { LANGS } from '../../src/i18n/strings'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'
const LABEL: Record<string, string> = { ru: 'Русский', en: 'English', zh: '中文' }
export default function MoreTab() {
  const { lang, setLang, t, pack } = useContent()
  const router = useRouter()
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.wrap}>
        <Pressable style={s.practical} onPress={() => router.push('/practical')}>
          <View style={s.practicalIcon}><Ionicons name="compass-outline" size={26} color={colors.turquoise} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.practicalTitle}>{t('practicalTitle')}</Text>
            <Text style={s.practicalSub} numberOfLines={2}>{t('practicalSubtitle')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </Pressable>
        <Pressable style={s.practical} onPress={() => router.push('/assistant')}>
          <View style={s.practicalIcon}><Ionicons name="sparkles-outline" size={24} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.practicalTitle}>{t('assistantTitle')}</Text>
            <Text style={s.practicalSub} numberOfLines={2}>{t('assistantSub')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </Pressable>
        <Pressable style={s.practical} onPress={() => router.push('/offline-maps')}>
          <View style={s.practicalIcon}><Ionicons name="cloud-download-outline" size={24} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.practicalTitle}>{t('offlineMapsTitle')}</Text>
            <Text style={s.practicalSub} numberOfLines={2}>{t('offlineMapsSub')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </Pressable>
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
  practical: { flexDirection: 'row', alignItems: 'center', gap: space.md, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: space.md, marginTop: space.sm },
  practicalIcon: { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  practicalTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  practicalSub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, lineHeight: 18 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, gap: space.md },
  body: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 24 },
  divider: { height: 1, backgroundColor: colors.border },
  meta: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
})
