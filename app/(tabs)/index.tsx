import React, { useMemo, useState } from 'react'
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { filterPlaces } from '../../src/lib/selectors'
import { PlaceCard } from '../../src/components/PlaceCard'
import { FilterChips } from '../../src/components/FilterChips'
import OfflineFirstRun from '../offline-first-run'
import { colors, space, font, radius } from '../../src/theme/tokens'

export default function PlacesTab() {
  const { pack, lang, t, offlineFirstRun } = useContent()
  const router = useRouter()
  const [section, setSection] = useState('all')
  const [query, setQuery] = useState('')
  if (offlineFirstRun && !pack) return <OfflineFirstRun />
  const places = pack?.data.places ?? []
  const secOpts = [{ key: 'all', label: t('filterAll') }, { key: 'sights', label: t('secBaikal') }, { key: 'city', label: t('secCity') }]
  const list = useMemo(() => filterPlaces(places, { section: section === 'all' ? undefined : section, query, lang }), [places, section, query, lang])
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.searchWrap}>
        <TextInput style={s.search} placeholder={t('searchPlaces')} placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />
      </View>
      <FilterChips value={section} options={secOpts} onChange={setSection} />
      <FlatList
        data={list} keyExtractor={(p) => p.id}
        contentContainerStyle={s.list}
        renderItem={({ item }) => <PlaceCard place={item} onPress={() => router.push(`/place/${item.slug}`)} />}
        ListEmptyComponent={<Text style={s.empty}>{t('searchPlaces')}…</Text>}
      />
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { padding: space.md, paddingBottom: 0 },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, color: colors.text, paddingHorizontal: space.md, paddingVertical: space.sm, fontSize: font.sizes.md },
  list: { padding: space.md },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: space.xl },
})
