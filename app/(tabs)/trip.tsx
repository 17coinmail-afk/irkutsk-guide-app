import React, { useMemo } from 'react'
import { SectionList, Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { useFavorites } from '../../src/content/FavoritesProvider'
import { PlaceCard } from '../../src/components/PlaceCard'
import { RouteCard } from '../../src/components/RouteCard'
import type { Place, Route } from '../../src/lib/contentTypes'
import { colors, space, font } from '../../src/theme/tokens'

export default function TripTab() {
  const { pack, t } = useContent()
  const { favs } = useFavorites()
  const router = useRouter()
  const places = (pack?.data.places ?? []).filter((p) => favs.has(`place:${p.slug}`))
  const routes = (pack?.data.routes ?? []).filter((r) => favs.has(`route:${r.slug}`))
  const sections = useMemo(() => [
    { key: 'p', title: t('tripPlacesTitle'), data: places as (Place | Route)[] },
    { key: 'r', title: t('tripRoutesTitle'), data: routes as (Place | Route)[] },
  ].filter((sec) => sec.data.length), [places, routes, t])

  if (!places.length && !routes.length) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.empty}><Text style={s.emptyTxt}>{t('tripEmpty')}</Text></View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <SectionList
        sections={sections} keyExtractor={(item) => (item as Place | Route).id}
        contentContainerStyle={{ padding: space.md }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={s.h}>{section.title}</Text>}
        renderItem={({ item, section }) => section.key === 'p'
          ? <PlaceCard place={item as Place} onPress={() => router.push(`/place/${(item as Place).slug}`)} />
          : <RouteCard route={item as Route} onPress={() => router.push(`/route/${(item as Route).slug}`)} />}
      />
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  h: { color: colors.gold, fontSize: font.sizes.sm, textTransform: 'uppercase', letterSpacing: 1, marginTop: space.md, marginBottom: space.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.lg },
  emptyTxt: { color: colors.textMuted, fontSize: font.sizes.md, textAlign: 'center', lineHeight: 24 },
})
