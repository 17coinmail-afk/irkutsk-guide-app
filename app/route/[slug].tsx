import React, { useMemo } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { placesById, resolveRouteStops } from '../../src/lib/selectors'
import { PlaceCard } from '../../src/components/PlaceCard'
import { FavHeart } from '../../src/components/FavHeart'
import { dayWord } from '../../src/lib/dayWord'
import { buildMapHtml, type MapPoint } from '../../src/map/leafletHtml'
import { colors, space, font } from '../../src/theme/tokens'

export default function RouteDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang } = useContent()
  const router = useRouter()
  const route = pack?.data.routes.find((r) => r.slug === slug)
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])
  const stops = useMemo(() => (route ? resolveRouteStops(route, byId) : []), [route, byId])
  const html = useMemo(() => {
    const points: MapPoint[] = stops.map((p) => ({ lng: p.lng, lat: p.lat, slug: p.slug, title: p.translations[lang].title, city: p.section === 'city' }))
    return buildMapHtml(points, { line: true })
  }, [stops, lang])

  if (!route) return <View style={s.wrap}><Text style={s.title}>—</Text></View>
  const tr = route.translations[lang]

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ paddingBottom: space.xl }}>
      <View style={s.head}>
        <View style={s.titleRow}>
          <Text style={s.title}>{tr.title}</Text>
          <FavHeart kind="route" slug={route.slug} size={26} />
        </View>
        <Text style={s.meta}>{route.days} {dayWord(route.days, lang)} · {route.theme} · {route.difficulty}</Text>
        <Text style={s.desc}>{tr.description}</Text>
      </View>
      {stops.length > 0 && (
        <WebView originWhitelist={['*']} source={{ html }} style={s.map} javaScriptEnabled domStorageEnabled scrollEnabled={false} />
      )}
      <View style={s.list}>
        {stops.map((p, i) => (
          <View key={p.id} style={s.stopRow}>
            <Text style={s.idx}>{i + 1}</Text>
            <View style={{ flex: 1 }}><PlaceCard place={p} onPress={() => router.push(`/place/${p.slug}`)} /></View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  head: { padding: space.md, gap: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: space.sm },
  title: { flex: 1, color: colors.text, fontSize: font.sizes.xxl, fontWeight: '700' },
  meta: { color: colors.turquoise, fontSize: font.sizes.sm },
  desc: { color: colors.textMuted, fontSize: font.sizes.md, lineHeight: 24 },
  map: { width: '100%', height: 220, backgroundColor: colors.bg },
  list: { padding: space.md },
  stopRow: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' },
  idx: { color: colors.gold, fontSize: font.sizes.lg, fontWeight: '700', width: 22, paddingTop: space.md },
})
