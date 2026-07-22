import React from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Linking } from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { colors, space, font, radius } from '../../src/theme/tokens'

export default function PlaceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang, t } = useContent()
  const router = useRouter()
  const place = pack?.data.places.find((p) => p.slug === slug)
  if (!place) return <View style={s.wrap}><Text style={s.title}>—</Text></View>
  const tr = place.translations[lang]
  const geo = `https://maps.google.com/?q=${place.lat},${place.lng}`
  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ paddingBottom: space.xl }}>
      {place.photoUrl && <Image source={place.photoUrl} style={s.img} contentFit="cover" />}
      <View style={s.body}>
        <Text style={s.cat}>{place.cuisine ?? place.category}</Text>
        <Text style={s.title}>{tr.title}</Text>
        <Text style={s.desc}>{tr.description}</Text>
        {place.address ? <Text style={s.meta}>{place.address}</Text> : null}
        {place.hours ? <Text style={s.meta}>{place.hours}  ·  {t('hoursNote')}</Text> : null}
        <View style={s.actions}>
          <Pressable style={s.btn} onPress={() => Linking.openURL(geo)}><Text style={s.btnTxt}>{t('openInMaps')}</Text></Pressable>
          {place.website ? <Pressable style={s.btn} onPress={() => Linking.openURL(place.website!)}><Text style={s.btnTxt}>{t('siteBtn')}</Text></Pressable> : null}
          {place.phone ? <Pressable style={s.btn} onPress={() => Linking.openURL(`tel:${place.phone}`)}><Text style={s.btnTxt}>{t('callBtn')}</Text></Pressable> : null}
        </View>
      </View>
    </ScrollView>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  img: { width: '100%', height: 260, backgroundColor: colors.surfaceAlt },
  body: { padding: space.md, gap: space.sm },
  cat: { color: colors.turquoise, fontSize: font.sizes.xs, textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '700' },
  desc: { color: colors.textMuted, fontSize: font.sizes.md, lineHeight: 24 },
  meta: { color: colors.text, fontSize: font.sizes.sm },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginTop: space.sm },
  btn: { backgroundColor: colors.turquoise, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.sm },
  btnTxt: { color: colors.bg, fontWeight: '700' },
})
