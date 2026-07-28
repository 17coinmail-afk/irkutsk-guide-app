import React, { useMemo, useState } from 'react'
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { SegmentedChips } from '../../src/components/SegmentedChips'
import { Press } from '../../src/components/Press'
import { FadeInUp } from '../../src/components/FadeInUp'
import {
  pickSeasonal, isRunningOn, isStale, formatWindow, formatDuration, MODE_ICON,
} from '../../src/lib/transport'
import { staggerDelay } from '../../src/lib/motion'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import type { TransportLink } from '../../src/lib/contentTypes'
import { colors, font, fontFamily, radius, space } from '../../src/theme/tokens'

// Направления группируем по конечной точке — турист думает «как попасть на Ольхон», а не «какие есть паромы».
const GROUPS = [
  { key: 'all', label: 'filterAll' as const },
  { key: 'olkhon', label: 'trGroupOlkhon' as const },
  { key: 'listvyanka', label: 'trGroupListvyanka' as const },
  { key: 'rail', label: 'trGroupRail' as const },
  { key: 'city', label: 'trGroupCity' as const },
]

function groupOf(link: TransportLink): string {
  if (link.toSlug === 'olkhon') return 'olkhon'
  if (link.toSlug === 'listvyanka') return 'listvyanka'
  if (link.mode === 'train' || link.mode === 'kbzh') return 'rail'
  return 'city'
}

export default function TransportScreen() {
  const { pack, lang, t } = useContent()
  const reduceMotion = useReduceMotion()
  const [group, setGroup] = useState('all')
  const today = useMemo(() => new Date(), [])

  const links = pack?.data.transport ?? []
  const shown = useMemo(() => {
    const filtered = group === 'all' ? links : links.filter((l) => groupOf(l) === group)
    return pickSeasonal(filtered, today)
  }, [links, group, today])

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScreenHeader title={t('modTransport')} subtitle={t('modTransportSub')} />
      <SegmentedChips
        value={group}
        options={GROUPS.map((g) => ({ key: g.key, label: t(g.label) }))}
        onChange={setGroup}
      />
      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {shown.map((link, i) => {
          const tr = link.translations[lang]
          const running = isRunningOn(link, today)
          const stale = isStale(link.checkedAt, today)
          return (
            <FadeInUp key={link.id} delay={staggerDelay(i, { reduceMotion })}>
              <View style={[s.card, !running && s.cardResting]}>
                <View style={s.head}>
                  <View style={s.iconWrap}>
                    <Ionicons name={MODE_ICON[link.mode] as never} size={18} color={running ? colors.turquoise : colors.textDim} />
                  </View>
                  <Text style={s.title}>{tr.title}</Text>
                </View>

                {!running && <Text style={s.resting}>{t('trOffSeason')}</Text>}

                <Text style={s.window}>{formatWindow(link, lang)}</Text>

                <View style={s.factRow}>
                  <Text style={s.fact}>{formatDuration(link.durationMin, lang)}</Text>
                  {link.priceFrom != null && (
                    <Text style={s.fact}>
                      {link.priceFrom === 0 ? t('trFree') : `${t('trFrom')} ${link.priceFrom} ₽`}
                    </Text>
                  )}
                </View>

                {tr.note ? <Text style={s.note}>{tr.note}</Text> : null}

                {stale && (
                  <View style={s.staleRow}>
                    <Ionicons name="time-outline" size={14} color={colors.gold} />
                    <Text style={s.staleTxt}>{t('trStale')}</Text>
                  </View>
                )}

                <Press onPress={() => Linking.openURL(link.sourceUrl)} haptic="light">
                  <View style={s.sourceRow}>
                    <Text style={s.sourceTxt}>{t('trSource')} · {link.checkedAt}</Text>
                    <Ionicons name="open-outline" size={14} color={colors.turquoise} />
                  </View>
                </Press>
              </View>
            </FadeInUp>
          )
        })}
        {shown.length === 0 && <Text style={s.empty}>{t('noResults')}</Text>}
        <Text style={s.disclaimer}>{t('trDisclaimer')}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, paddingBottom: 96, gap: space.smd },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1,
    borderColor: colors.border, padding: space.md, gap: space.sm,
  },
  cardResting: { opacity: 0.62 },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  iconWrap: {
    width: 34, height: 34, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  title: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  resting: { color: colors.gold, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  window: { color: colors.turquoise, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  factRow: { flexDirection: 'row', gap: space.md },
  fact: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
  note: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21 },
  staleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  staleTxt: { color: colors.gold, fontFamily: fontFamily.body, fontSize: font.scale.small, flex: 1 },
  sourceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderSoft,
  },
  sourceTxt: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small, flex: 1 },
  empty: { color: colors.textMuted, fontFamily: fontFamily.body, textAlign: 'center', marginTop: space.xl },
  disclaimer: {
    color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small,
    lineHeight: 19, marginTop: space.sm,
  },
})
