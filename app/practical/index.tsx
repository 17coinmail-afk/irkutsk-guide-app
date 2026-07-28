import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import type { UiKey } from '../../src/i18n/strings'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

function tint(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

const MODULES: { route: string; icon: string; title: UiKey; sub: UiKey; c: string }[] = [
  { route: '/practical/getting-there', icon: 'bus-outline', title: 'modGetThere', sub: 'modGetThereSub', c: colors.turquoise },
  { route: '/practical/transport', icon: 'boat-outline', title: 'modTransport', sub: 'modTransportSub', c: colors.turquoise },
  { route: '/practical/phrasebook', icon: 'language-outline', title: 'modPhrasebook', sub: 'modPhrasebookSub', c: colors.gold },
  { route: '/practical/weather', icon: 'partly-sunny-outline', title: 'modWeather', sub: 'modWeatherSub', c: colors.turquoise },
  { route: '/practical/cuisine', icon: 'restaurant-outline', title: 'modCuisine', sub: 'modCuisineSub', c: colors.gold },
  { route: '/practical/souvenirs', icon: 'gift-outline', title: 'modSouvenirs', sub: 'modSouvenirsSub', c: colors.turquoise },
  { route: '/practical/events', icon: 'calendar-outline', title: 'modEvents', sub: 'modEventsSub', c: colors.gold },
  { route: '/practical/emergency', icon: 'alert-circle-outline', title: 'modEmergency', sub: 'modEmergencySub', c: colors.danger },
]

export default function PracticalHub() {
  const { t } = useContent()
  const router = useRouter()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('practicalTitle')} subtitle={t('practicalSubtitle')} />
      <ScrollView contentContainerStyle={s.list}>
        {MODULES.map((m) => (
          <Pressable key={m.route} onPress={() => router.push(m.route as any)} style={({ pressed }) => [pressed && s.pressed]}>
            <LinearGradient colors={[tint(m.c, 0.16), colors.surface]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.card, { borderColor: tint(m.c, 0.4) }]}>
              <View style={[s.iconWrap, { backgroundColor: tint(m.c, 0.16), borderColor: tint(m.c, 0.5) }]}>
                <Ionicons name={m.icon as any} size={26} color={m.c} />
              </View>
              <View style={s.cardText}>
                <Text style={s.cardTitle}>{t(m.title)}</Text>
                <Text style={s.cardSub} numberOfLines={2}>{t(m.sub)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.md, paddingBottom: space.xl },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  card: { flexDirection: 'row', alignItems: 'center', gap: space.md, borderRadius: radius.lg, borderWidth: 1, padding: space.md, ...shadow.card },
  iconWrap: { width: 52, height: 52, borderRadius: radius.md, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1 },
  cardTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  cardSub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, lineHeight: 18 },
})
