import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { colors, radius, space, font } from '../theme/tokens'
import { useContent } from '../content/ContentProvider'
import { FavHeart } from './FavHeart'
import type { Place } from '../lib/contentTypes'
export function PlaceCard({ place, onPress, distanceLabel }: { place: Place; onPress: () => void; distanceLabel?: string }) {
  const { lang } = useContent()
  const tr = place.translations[lang]
  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={s.media}>
        {place.photoUrl && <Image source={place.photoUrl} style={s.img} contentFit="cover" transition={200} />}
        <FavHeart kind="place" slug={place.slug} style={s.heart} />
      </View>
      <View style={s.body}>
        <Text style={s.cat}>{place.cuisine ?? place.category}</Text>
        <Text style={s.title} numberOfLines={2}>{tr.title}</Text>
        {place.address ? <Text style={s.meta} numberOfLines={1}>{place.address}</Text> : <Text style={s.desc} numberOfLines={2}>{tr.description}</Text>}
        {place.hours ? <Text style={s.meta} numberOfLines={1}>{place.hours}</Text> : null}
        {distanceLabel ? <Text style={s.dist}>◎ {distanceLabel}</Text> : null}
      </View>
    </Pressable>
  )
}
const s = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden', marginBottom: space.md, borderWidth: 1, borderColor: colors.border },
  media: { position: 'relative' },
  heart: { position: 'absolute', top: 8, right: 8 },
  img: { width: '100%', height: 170, backgroundColor: colors.surfaceAlt },
  body: { padding: space.md, gap: 4 },
  cat: { color: colors.turquoise, fontSize: font.sizes.xs, textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '700' },
  desc: { color: colors.textMuted, fontSize: font.sizes.sm },
  meta: { color: colors.textMuted, fontSize: font.sizes.sm },
  dist: { color: colors.turquoise, fontSize: font.sizes.sm, fontWeight: '600' },
})
