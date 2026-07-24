import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { colors, radius, space, font } from '../theme/tokens'
import { useContent } from '../content/ContentProvider'
import { dayWord } from '../lib/dayWord'
import { FavHeart } from './FavHeart'
import type { Route } from '../lib/contentTypes'
export function RouteCard({ route, onPress }: { route: Route; onPress: () => void }) {
  const { lang } = useContent()
  const tr = route.translations[lang]
  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={s.badge}><Text style={s.num}>{route.days}</Text><Text style={s.unit}>{dayWord(route.days, lang)}</Text></View>
      <View style={s.body}>
        <Text style={s.title} numberOfLines={2}>{tr.title}</Text>
        <Text style={s.desc} numberOfLines={2}>{tr.description}</Text>
        <Text style={s.stops}>{route.stops.length} · {route.theme}</Text>
      </View>
      <FavHeart kind="route" slug={route.slug} style={s.heart} />
    </Pressable>
  )
}
const s = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.md, marginBottom: space.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', position: 'relative' },
  heart: { position: 'absolute', top: 8, right: 8 },
  badge: { width: 72, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt, gap: 2 },
  num: { color: colors.gold, fontSize: font.sizes.xl, fontWeight: '700' },
  unit: { color: colors.textMuted, fontSize: font.sizes.xs },
  body: { flex: 1, padding: space.md, gap: 4 },
  title: { color: colors.text, fontSize: font.sizes.md, fontWeight: '700' },
  desc: { color: colors.textMuted, fontSize: font.sizes.sm },
  stops: { color: colors.turquoise, fontSize: font.sizes.xs, textTransform: 'uppercase', letterSpacing: 1 },
})
