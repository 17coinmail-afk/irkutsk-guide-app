import React, { useMemo, useState, useCallback } from 'react'
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { filterPlaces } from '../../src/lib/selectors'
import { sortPlacesByDistance, formatDistance } from '../../src/lib/distance'
import { PlaceCard } from '../../src/components/PlaceCard'
import { FilterChips } from '../../src/components/FilterChips'
import OfflineFirstRun from '../offline-first-run'
import { colors, space, font, radius } from '../../src/theme/tokens'

export default function PlacesTab() {
  const { pack, lang, t, offlineFirstRun } = useContent()
  const router = useRouter()
  const [section, setSection] = useState('all')
  const [query, setQuery] = useState('')
  const [nearby, setNearby] = useState(false)
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null)

  const places = pack?.data.places ?? []
  const secOpts = [{ key: 'all', label: t('filterAll') }, { key: 'sights', label: t('secBaikal') }, { key: 'city', label: t('secCity') }]
  const filtered = useMemo(
    () => filterPlaces(places, { section: section === 'all' ? undefined : section, query, lang }),
    [places, section, query, lang],
  )
  const rows = useMemo(() => {
    if (nearby && me) return sortPlacesByDistance(filtered, me)
    return filtered.map((place) => ({ place, km: undefined as number | undefined }))
  }, [nearby, me, filtered])

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
      <View style={s.searchRow}>
        <TextInput style={s.search} placeholder={t('searchPlaces')} placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />
        <Pressable onPress={toggleNearby} style={[s.near, nearby && s.nearOn]}>
          <Text style={[s.nearTxt, nearby && s.nearTxtOn]}>◎ {t('nearbyToggle')}</Text>
        </Pressable>
      </View>
      <FilterChips value={section} options={secOpts} onChange={setSection} />
      <FlatList
        data={rows} keyExtractor={(r) => r.place.id}
        contentContainerStyle={s.list}
        renderItem={({ item }) => (
          <PlaceCard place={item.place} onPress={() => router.push(`/place/${item.place.slug}`)}
            distanceLabel={item.km != null ? formatDistance(item.km, lang) : undefined} />
        )}
        ListEmptyComponent={<Text style={s.empty}>{t('searchPlaces')}…</Text>}
      />
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  searchRow: { flexDirection: 'row', gap: space.sm, padding: space.md, paddingBottom: 0, alignItems: 'center' },
  search: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, color: colors.text, paddingHorizontal: space.md, paddingVertical: space.sm, fontSize: font.sizes.md },
  near: { borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: space.md, paddingVertical: space.sm },
  nearOn: { backgroundColor: colors.turquoise, borderColor: colors.turquoise },
  nearTxt: { color: colors.textMuted, fontSize: font.sizes.sm, fontWeight: '700' },
  nearTxtOn: { color: colors.bg },
  list: { padding: space.md },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: space.xl },
})
