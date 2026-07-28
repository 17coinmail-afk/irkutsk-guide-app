import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContent } from '../src/content/ContentProvider'
import { ScreenHeader } from '../src/components/ScreenHeader'
import { FadeInUp } from '../src/components/FadeInUp'
import { CITY_STORY, CITY_STORY_INTRO, readingMinutes } from '../src/content/cityStory'
import { staggerDelay } from '../src/lib/motion'
import { useReduceMotion } from '../src/hooks/useReduceMotion'
import { colors, font, fontFamily, radius, space } from '../src/theme/tokens'

const COVER = 'https://guide.getastrodaily.com/assets/img/irk-kvartal.jpg'

/** Длинный текст читают, когда он разбит на главы и видно, сколько осталось. */
export default function CityStoryScreen() {
  const { lang, t } = useContent()
  const reduceMotion = useReduceMotion()

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScreenHeader title={t('cityStoryTitle')} subtitle={`${readingMinutes(lang)} ${t('minRead')}`} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Image source={COVER} style={s.cover} contentFit="cover" cachePolicy="memory-disk" transition={280} />

        <Text style={s.intro}>{CITY_STORY_INTRO[lang]}</Text>

        {CITY_STORY.map((ch, i) => (
          <FadeInUp key={ch.id} delay={staggerDelay(i, { reduceMotion })}>
            <View style={s.chapter}>
              <Text style={s.year}>{ch.year[lang]}</Text>
              <Text style={s.chapterTitle}>{ch.title[lang]}</Text>
              <Text style={s.text}>{ch.text[lang]}</Text>
            </View>
          </FadeInUp>
        ))}

        <Text style={s.note}>{t('cityStoryNote')}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.md, paddingBottom: 96, gap: space.md },
  cover: { width: '100%', height: 180, borderRadius: radius.photo, backgroundColor: colors.surfaceAlt },
  intro: {
    color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg,
    lineHeight: 27, marginTop: space.xs,
  },
  chapter: { gap: 6, paddingTop: space.smd },
  year: {
    color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip,
    textTransform: 'uppercase', letterSpacing: 1.6,
  },
  chapterTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  text: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 25 },
  note: {
    color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small,
    lineHeight: 19, marginTop: space.sm,
  },
})
