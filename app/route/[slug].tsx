import React, { useMemo } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { placesById, resolveRouteStops } from '../../src/lib/selectors'
import { PlaceCard } from '../../src/components/PlaceCard'
import { dayWord } from '../../src/lib/dayWord'
import { colors, space, font } from '../../src/theme/tokens'

export default function RouteDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang } = useContent()
  const router = useRouter()
  const route = pack?.data.routes.find((r) => r.slug === slug)
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])
  if (!route) return <View style={s.wrap}><Text style={s.title}>—</Text></View>
  const tr = route.translations[lang]
  const stops = resolveRouteStops(route, byId)
  const coords = stops.map((p) => ({ latitude: p.lat, longitude: p.lng }))
  const mid = coords[Math.floor(coords.length / 2)] ?? { latitude: 52.5, longitude: 106 }
  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ paddingBottom: space.xl }}>
      <View style={s.head}>
        <Text style={s.title}>{tr.title}</Text>
        <Text style={s.meta}>{route.days} {dayWord(route.days, lang)} · {route.theme} · {route.difficulty}</Text>
        <Text style={s.desc}>{tr.description}</Text>
      </View>
      {coords.length > 0 && (
        <MapView provider={PROVIDER_DEFAULT} style={s.map} initialRegion={{ latitude: mid.latitude, longitude: mid.longitude, latitudeDelta: 3, longitudeDelta: 3 }}>
          {stops.map((p, i) => <Marker key={p.id} coordinate={{ latitude: p.lat, longitude: p.lng }} title={`${i + 1}. ${p.translations[lang].title}`} />)}
          <Polyline coordinates={coords} strokeColor={colors.turquoise} strokeWidth={3} />
        </MapView>
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
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '700' },
  meta: { color: colors.turquoise, fontSize: font.sizes.sm },
  desc: { color: colors.textMuted, fontSize: font.sizes.md, lineHeight: 24 },
  map: { width: '100%', height: 220 },
  list: { padding: space.md },
  stopRow: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' },
  idx: { color: colors.gold, fontSize: font.sizes.lg, fontWeight: '700', width: 22, paddingTop: space.md },
})
