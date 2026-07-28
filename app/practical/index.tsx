import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { MARKS, type MarkKey } from '../../src/content/marks'
import type { UiKey } from '../../src/i18n/strings'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

/**
 * Карточки разделов держатся на гравюрах, а не на цвете: в монохромной палитре
 * прежние цветные градиенты превращались в восемь одинаковых белёсых плашек.
 * Цвет остался ровно там, где он несёт смысл, — на «Экстренном».
 */
const MODULES: { route: string; mark: MarkKey; title: UiKey; sub: UiKey; danger?: true }[] = [
  { route: '/practical/getting-there', mark: 'train', title: 'modGetThere', sub: 'modGetThereSub' },
  { route: '/practical/transport', mark: 'ferry', title: 'modTransport', sub: 'modTransportSub' },
  { route: '/practical/phrasebook', mark: 'phrasebook', title: 'modPhrasebook', sub: 'modPhrasebookSub' },
  { route: '/practical/weather', mark: 'ice', title: 'modWeather', sub: 'modWeatherSub' },
  { route: '/practical/cuisine', mark: 'buuzy', title: 'modCuisine', sub: 'modCuisineSub' },
  { route: '/practical/souvenirs', mark: 'nalichnik', title: 'modSouvenirs', sub: 'modSouvenirsSub' },
  { route: '/practical/events', mark: 'events', title: 'modEvents', sub: 'modEventsSub' },
  { route: '/practical/emergency', mark: 'emergency', title: 'modEmergency', sub: 'modEmergencySub', danger: true },
]

export default function PracticalHub() {
  const { t } = useContent()
  const router = useRouter()
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('practicalTitle')} subtitle={t('practicalSubtitle')} />
      <ScrollView contentContainerStyle={s.list}>
        {MODULES.map((m) => (
          <Pressable
            key={m.route}
            onPress={() => router.push(m.route as any)}
            style={({ pressed }) => [s.card, m.danger && s.cardDanger, pressed && s.pressed]}
          >
            <Image
              source={MARKS[m.mark]}
              style={s.mark}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
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
  list: { padding: space.md, gap: space.smd, paddingBottom: space.xl },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: space.md,
    borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    backgroundColor: colors.surface, padding: space.md, ...shadow.card,
  },
  cardDanger: { borderColor: 'rgba(217, 115, 106, 0.45)' },
  mark: { width: 46, height: 46, opacity: 0.75 },
  cardText: { flex: 1 },
  cardTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  cardSub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2, lineHeight: 18 },
})
