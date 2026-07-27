import React, { useMemo } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { useFavorites } from '../../src/content/FavoritesProvider'
import { placesById, resolveRouteStops, routeCoverPhoto } from '../../src/lib/selectors'
import { dayWord } from '../../src/lib/dayWord'
import { stopWord } from '../../src/lib/stopWord'
import { PhotoCard } from '../../src/components/PhotoCard'
import type { Place, Route } from '../../src/lib/contentTypes'
import { placeChipLabel, themeLabel } from '../../src/i18n/labels'
import { colors, space, font, fontFamily } from '../../src/theme/tokens'

type Row = { kind: 'place'; place: Place } | { kind: 'route'; route: Route }

export default function TripTab() {
  const { pack, lang, t } = useContent()
  const { favs } = useFavorites()
  const router = useRouter()
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])
  const places = (pack?.data.places ?? []).filter((p) => favs.has(`place:${p.slug}`))
  const routes = (pack?.data.routes ?? []).filter((r) => favs.has(`route:${r.slug}`))
  const sections = useMemo(() => [
    { key: 'p', title: t('tripPlacesTitle'), data: places.map((place): Row => ({ kind: 'place', place })) },
    { key: 'r', title: t('tripRoutesTitle'), data: routes.map((route): Row => ({ kind: 'route', route })) },
  ].filter((sec) => sec.data.length), [places, routes, t])

  if (!places.length && !routes.length) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.empty}>
          <Ionicons name="heart-outline" size={40} color={colors.textDim} />
          <Text style={s.emptyTxt}>{t('tripEmpty')}</Text>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => (item.kind === 'place' ? `p-${item.place.id}` : `r-${item.route.id}`)}
        contentContainerStyle={s.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={s.h}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={s.cardWrap}>
            {item.kind === 'place' ? (
              <PhotoCard
                size="large"
                photoUrl={item.place.photoUrl}
                title={item.place.translations[lang].title}
                chip={placeChipLabel(item.place, lang)}
                meta={item.place.address ?? undefined}
                fav={{ kind: 'place', slug: item.place.slug }}
                onPress={() => router.push(`/place/${item.place.slug}`)}
              />
            ) : (
              <PhotoCard
                size="large"
                photoUrl={routeCoverPhoto(item.route, byId)}
                title={item.route.translations[lang].title}
                chip={themeLabel(item.route.theme, lang) || undefined}
                meta={`${resolveRouteStops(item.route, byId).length} ${stopWord(resolveRouteStops(item.route, byId).length, lang)}`}
                badge={{ value: item.route.days, label: dayWord(item.route.days, lang) }}
                fav={{ kind: 'route', slug: item.route.slug }}
                onPress={() => router.push(`/route/${item.route.slug}`)}
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  h: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1, marginTop: space.md, marginBottom: space.sm, paddingHorizontal: space.md },
  list: { padding: space.md },
  cardWrap: { marginBottom: space.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.lg, gap: space.md },
  emptyTxt: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, textAlign: 'center', lineHeight: 24 },
})
