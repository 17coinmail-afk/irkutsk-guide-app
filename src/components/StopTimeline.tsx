import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Press } from './Press'
import { FadeInUp } from './FadeInUp'
import { isDayBreak, dayOfStop } from '../lib/routePlan'
import { staggerDelay } from '../lib/motion'
import { placeChipLabel } from '../i18n/labels'
import type { Lang } from '../i18n/strings'
import { colors, font, fontFamily, gradients, radius, space } from '../theme/tokens'

export interface TimelineStop {
  id: string
  slug: string
  photoUrl: string | null
  category: string
  cuisine?: string | null
  title: string
  subtitle: string
}

/** Маршрут как последовательность: линия, номера, разделители дней. */
export function StopTimeline({
  stops, days, lang, dayLabel, onPress, reduceMotion,
}: {
  stops: TimelineStop[]
  days: number
  lang: Lang
  /** Подпись разделителя, например «День 2». */
  dayLabel: (day: number) => string
  onPress: (slug: string) => void
  reduceMotion?: boolean
}) {
  return (
    <View style={s.wrap}>
      {stops.map((stop, i) => {
        const breakHere = isDayBreak(i, stops.length, days)
        return (
          <View key={stop.id}>
            {breakHere ? (
              <View style={s.dayRow}>
                <Text style={s.dayTxt}>{dayLabel(dayOfStop(i, stops.length, days))}</Text>
                <View style={s.dayLine} />
              </View>
            ) : null}
            <FadeInUp delay={staggerDelay(i, { reduceMotion })}>
              <Press onPress={() => onPress(stop.slug)} haptic="light">
                <View style={s.row}>
                  <View style={s.railCol}>
                    <View style={s.bullet}><Text style={s.idx}>{i + 1}</Text></View>
                    {i < stops.length - 1 ? (
                      <LinearGradient
                        colors={gradients.iceEdge as unknown as [string, string, string]}
                        style={s.rail}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                    ) : null}
                  </View>
                  <Image source={stop.photoUrl} style={s.thumb} contentFit="cover" cachePolicy="memory-disk" transition={200} />
                  <View style={s.txtCol}>
                    <Text style={s.chip} numberOfLines={1}>{placeChipLabel(stop, lang)}</Text>
                    <Text style={s.title} numberOfLines={1}>{stop.title}</Text>
                    <Text style={s.sub} numberOfLines={1}>{stop.subtitle}</Text>
                  </View>
                </View>
              </Press>
            </FadeInUp>
          </View>
        )
      })}
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { paddingHorizontal: space.md, paddingTop: space.sm },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.lg, marginBottom: space.sm },
  dayTxt: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1.4 },
  dayLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.smd, paddingVertical: space.sm },
  railCol: { width: 28, alignItems: 'center', alignSelf: 'stretch' },
  bullet: {
    width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
  },
  idx: { color: colors.gold, fontFamily: fontFamily.heading, fontSize: font.scale.small },
  rail: { flex: 1, width: 2, marginTop: 4, opacity: 0.5 },
  thumb: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.surfaceAlt },
  txtCol: { flex: 1, gap: 1 },
  chip: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  sub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
})
