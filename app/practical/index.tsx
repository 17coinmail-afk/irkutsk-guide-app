import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import type { UiKey } from '../../src/i18n/strings'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

const MODULES: { route: string; icon: string; title: UiKey; sub: UiKey; tint: string }[] = [
  { route: '/practical/getting-there', icon: 'bus-outline', title: 'modGetThere', sub: 'modGetThereSub', tint: colors.turquoise },
  { route: '/practical/phrasebook', icon: 'language-outline', title: 'modPhrasebook', sub: 'modPhrasebookSub', tint: colors.gold },
  { route: '/practical/weather', icon: 'partly-sunny-outline', title: 'modWeather', sub: 'modWeatherSub', tint: colors.turquoise },
  { route: '/practical/cuisine', icon: 'restaurant-outline', title: 'modCuisine', sub: 'modCuisineSub', tint: colors.gold },
  { route: '/practical/souvenirs', icon: 'gift-outline', title: 'modSouvenirs', sub: 'modSouvenirsSub', tint: colors.turquoise },
  { route: '/practical/events', icon: 'calendar-outline', title: 'modEvents', sub: 'modEventsSub', tint: colors.gold },
  { route: '/practical/emergency', icon: 'alert-circle-outline', title: 'modEmergency', sub: 'modEmergencySub', tint: colors.danger },
]

export default function PracticalHub() {
  const { t } = useContent()
  const router = useRouter()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('practicalTitle')} subtitle={t('practicalSubtitle')} />
      <ScrollView contentContainerStyle={s.list}>
        {MODULES.map((m) => (
          <Pressable key={m.route} style={s.card} onPress={() => router.push(m.route as any)}>
            <View style={[s.iconWrap, { borderColor: m.tint }]}>
              <Ionicons name={m.icon as any} size={24} color={m.tint} />
            </View>
            <View style={s.cardText}>
              <Text style={s.cardTitle}>{t(m.title)}</Text>
              <Text style={s.cardSub} numberOfLines={2}>{t(m.sub)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
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
  iconWrap: { width: 48, height: 48, borderRadius: radius.md, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  cardText: { flex: 1 },
  cardTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  cardSub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, lineHeight: 18 },
})
