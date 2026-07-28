import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContent } from '../src/content/ContentProvider'
import { ScreenHeader } from '../src/components/ScreenHeader'
import { Press } from '../src/components/Press'
import { GlowCard } from '../src/components/GlowCard'
import { FadeInUp } from '../src/components/FadeInUp'
import { PEOPLE } from '../src/content/people'
import { staggerDelay } from '../src/lib/motion'
import { useReduceMotion } from '../src/hooks/useReduceMotion'
import { colors, font, fontFamily, radius, space } from '../src/theme/tokens'

/** Люди города. Карточка раскрывается по нажатию: список остаётся обозримым. */
export default function PeopleScreen() {
  const { lang, t, pack } = useContent()
  const router = useRouter()
  const reduceMotion = useReduceMotion()
  const [open, setOpen] = useState<string | null>(PEOPLE[0]?.id ?? null)

  const placeTitle = (slug?: string) => {
    if (!slug) return null
    const place = pack?.data.places.find((p) => p.slug === slug)
    return place ? place.translations[lang].title : null
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScreenHeader title={t('peopleTitle')} subtitle={t('peopleSub')} />
      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {PEOPLE.map((person, i) => {
          const isOpen = open === person.id
          const linked = placeTitle(person.placeSlug)
          return (
            <FadeInUp key={person.id} delay={staggerDelay(i, { reduceMotion })}>
              <GlowCard tone={isOpen ? 'gold' : 'ice'} contentStyle={s.card}>
                <Press onPress={() => setOpen(isOpen ? null : person.id)} haptic="selection">
                  <View style={s.head}>
                    <View style={s.headCol}>
                      <Text style={s.name}>{person.name[lang]}</Text>
                      <Text style={s.role}>{person.role[lang]}</Text>
                    </View>
                    <Text style={s.years}>{person.years}</Text>
                  </View>
                </Press>

                  {isOpen && (
                    <>
                      <Text style={s.text}>{person.text[lang]}</Text>
                      {linked && person.placeSlug ? (
                        <Press
                          onPress={() => router.push(`/place/${person.placeSlug}`)}
                          haptic="light"
                        >
                          <View style={s.link}>
                            <Ionicons name="location-outline" size={15} color={colors.turquoise} />
                            <Text style={s.linkTxt}>{linked}</Text>
                            <Ionicons name="chevron-forward" size={14} color={colors.turquoise} />
                          </View>
                        </Press>
                      ) : null}
                    </>
                  )}
              </GlowCard>
            </FadeInUp>
          )
        })}
        <Text style={s.note}>{t('peopleNote')}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, paddingBottom: 96, gap: space.smd },
  card: { gap: space.sm },
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: space.sm },
  headCol: { flex: 1, gap: 2 },
  name: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  role: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
  years: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small, letterSpacing: 0.4 },
  text: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 25 },
  link: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderSoft,
    paddingTop: space.sm, marginTop: space.xs,
  },
  linkTxt: { flex: 1, color: colors.turquoise, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  note: {
    color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small,
    lineHeight: 19, marginTop: space.sm,
  },
})
