import React, { useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContent } from '../src/content/ContentProvider'
import { Press } from '../src/components/Press'
import { MARKS, type MarkKey } from '../src/content/marks'
import { colors, font, fontFamily, radius, space } from '../src/theme/tokens'
import type { UiKey } from '../src/i18n/strings'

export const ONBOARDING_KEY = 'ig_onboarding_done'

const { width } = Dimensions.get('window')

/**
 * Три экрана: что это, что скачать до поездки, где искать практику. Больше — не читают.
 * Знаки вместо иконок: бабр с герба, лёд Байкала и паровоз Кругобайкалки — первое,
 * что видит приезжий, должно быть про это место, а не про компас из любого приложения.
 */
const SLIDES: { mark: MarkKey; title: UiKey; text: UiKey }[] = [
  { mark: 'babr', title: 'obTitle1', text: 'obText1' },
  { mark: 'ice', title: 'obTitle2', text: 'obText2' },
  { mark: 'train', title: 'obTitle3', text: 'obText3' },
]

export default function Onboarding() {
  const { t } = useContent()
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const ref = useRef<ScrollView>(null)

  const finish = async () => {
    try { await AsyncStorage.setItem(ONBOARDING_KEY, '1') } catch {}
    router.replace('/')
  }

  const next = () => {
    if (index >= SLIDES.length - 1) { void finish(); return }
    const to = index + 1
    setIndex(to)
    ref.current?.scrollTo({ x: to * width, animated: true })
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
      >
        {SLIDES.map((slide) => (
          <View key={slide.title} style={[s.slide, { width }]}>
            <Image
              source={MARKS[slide.mark]}
              style={s.mark}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
            <Text style={s.title}>{t(slide.title)}</Text>
            <Text style={s.text}>{t(slide.text)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={s.dots}>
        {SLIDES.map((slide, i) => (
          <View key={slide.title} style={[s.dot, i === index && s.dotOn]} />
        ))}
      </View>

      <View style={s.actions}>
        <Press onPress={next} haptic="light" style={s.primaryWrap}>
          <View style={s.primary}>
            <Text style={s.primaryTxt}>
              {index >= SLIDES.length - 1 ? t('obStart') : t('obNext')}
            </Text>
          </View>
        </Press>
        <Press onPress={finish} haptic="none">
          <Text style={s.skip}>{t('obSkip')}</Text>
        </Press>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space.xl, gap: space.md },
  mark: { width: 168, height: 168, opacity: 0.9 },
  title: {
    color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h1,
    textAlign: 'center', marginTop: space.sm,
  },
  text: {
    color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg,
    lineHeight: 25, textAlign: 'center',
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 7, marginBottom: space.lg },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.border },
  dotOn: { backgroundColor: colors.turquoise, width: 20 },
  actions: { paddingHorizontal: space.lg, paddingBottom: space.lg, gap: space.smd, alignItems: 'center' },
  primaryWrap: { alignSelf: 'stretch' },
  primary: {
    backgroundColor: colors.turquoise, borderRadius: radius.pill,
    paddingVertical: 14, alignItems: 'center',
  },
  primaryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  skip: { color: colors.textDim, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body, padding: space.sm },
})
