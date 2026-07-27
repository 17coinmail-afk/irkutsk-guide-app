import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { filterPlaces } from '../../src/lib/selectors'
import { sortPlacesByDistance, formatDistance } from '../../src/lib/distance'
import type { Place } from '../../src/lib/contentTypes'
import { PhotoCard } from '../../src/components/PhotoCard'
import { SegmentedChips } from '../../src/components/SegmentedChips'
import { Skeleton } from '../../src/components/Skeleton'
import { Glass } from '../../src/components/Glass'
import { Press } from '../../src/components/Press'
import { FadeInUp } from '../../src/components/FadeInUp'
import { staggerDelay } from '../../src/lib/motion'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import OfflineFirstRun from '../offline-first-run'
import { placeChipLabel } from '../../src/i18n/labels'
import { colors, space, font, fontFamily, radius } from '../../src/theme/tokens'

function placeMeta(place: Place, description: string): string | undefined {
  const parts = [place.address, place.hours].filter((v): v is string => !!v)
  return parts.length ? parts.join(' · ') : description || undefined
}

export default function PlacesTab() {
  const { pack, lang, t, offlineFirstRun } = useContent()
  const router = useRouter()
  const [section, setSection] = useState('all')
  const [query, setQuery] = useState('')
  const [nearby, setNearby] = useState(false)
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null)
  const reduceMotion = useReduceMotion()
  const { width: screenWidth } = useWindowDimensions()
  const cardWidth = (screenWidth - space.md * 2 - space.sm) / 2

  const places = pack?.data.places ?? []
  const loading = !pack
  const secOpts = [{ key: 'all', label: t('filterAll') }, { key: 'sights', label: t('secBaikal') }, { key: 'city', label: t('secCity') }]
  const filtered = useMemo(
    () => filterPlaces(places, { section: section === 'all' ? undefined : section, query, lang }),
    [places, section, query, lang],
  )
  const rows = useMemo(() => {
    if (nearby && me) return sortPlacesByDistance(filtered, me)
    return filtered.map((place) => ({ place, km: undefined as number | undefined }))
  }, [nearby, me, filtered])

  const showHero = section === 'all' && !query.trim()
  const hero = useMemo(() => places.find((p) => p.section === 'sights' && !!p.photoUrl), [places])
  const listRows = showHero && hero ? rows.filter((r) => r.place.id !== hero.id) : rows

  const toggleNearby = useCallback(async () => {
    if (nearby) { setNearby(false); return }
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      const pos = await Location.getCurrentPositionAsync({})
      setMe({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      setNearby(true)
    } catch {}
  }, [nearby])

  if (offlineFirstRun && !pack) return <OfflineFirstRun />

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Glass edge="bottom" style={s.header}>
        <View style={s.searchRow}>
          <View style={s.searchBox}>
            <Ionicons name="search" size={16} color={colors.textDim} />
            <TextInput style={s.search} placeholder={t('searchPlaces')} placeholderTextColor={colors.textDim} value={query} onChangeText={setQuery} />
          </View>
          <Press onPress={toggleNearby} haptic="selection">
            <View style={[s.near, nearby && s.nearOn]}>
              <Ionicons name="navigate" size={14} color={nearby ? colors.bg : colors.turquoise} />
              <Text style={[s.nearTxt, nearby && s.nearTxtOn]}>{t('nearbyToggle')}</Text>
            </View>
          </Press>
        </View>
        <SegmentedChips value={section} options={secOpts} onChange={setSection} />
      </Glass>
      {loading ? (
        <View style={s.list}>
          <Skeleton style={s.skeletonHero} radius={radius.photo} />
          <Skeleton style={s.skeletonCard} radius={radius.photo} />
          <Skeleton style={s.skeletonCard} radius={radius.photo} />
        </View>
      ) : (
        <FlatList
          data={listRows}
          keyExtractor={(r) => r.place.id}
          contentContainerStyle={s.list}
          numColumns={2}
          columnWrapperStyle={s.column}
          initialNumToRender={8}
          ListHeaderComponent={showHero && hero ? (
            <PhotoCard
              size="hero"
              photoUrl={hero.photoUrl}
              title={hero.translations[lang].title}
              chip={placeChipLabel(hero, lang)}
              meta={placeMeta(hero, hero.translations[lang].description)}
              fav={{ kind: 'place', slug: hero.slug }}
              onPress={() => router.push(`/place/${hero.slug}`)}
            />
          ) : null}
          renderItem={({ item, index }) => (
            <FadeInUp delay={staggerDelay(index, { reduceMotion })}>
            <PhotoCard
              width={cardWidth}
              size="compact"
              photoUrl={item.place.photoUrl}
              title={item.place.translations[lang].title}
              chip={placeChipLabel(item.place, lang)}
              meta={item.place.address ?? undefined}
              distanceLabel={item.km != null ? formatDistance(item.km, lang) : undefined}
              fav={{ kind: 'place', slug: item.place.slug }}
              onPress={() => router.push(`/place/${item.place.slug}`)}
            />
            </FadeInUp>
          )}
          ListEmptyComponent={<Text style={s.empty}>{t('noResults')}</Text>}
        />
      )}
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderSoft },
  searchRow: { flexDirection: 'row', gap: space.sm, padding: space.md, paddingBottom: 0, alignItems: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: space.md },
  search: { flex: 1, color: colors.text, paddingVertical: space.sm, fontFamily: fontFamily.body, fontSize: font.scale.body },
  near: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: space.md, paddingVertical: space.sm },
  nearOn: { backgroundColor: colors.turquoise, borderColor: colors.turquoise },
  nearTxt: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small },
  nearTxtOn: { color: colors.bg },
  list: { padding: space.md, paddingBottom: 96, gap: space.sm },
  column: { gap: space.sm },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: space.xl, fontFamily: fontFamily.body },
  skeletonHero: { height: 300 },
  skeletonCard: { height: 220 },
})
