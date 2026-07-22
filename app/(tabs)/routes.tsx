import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { filterRoutes } from '../../src/lib/selectors'
import { RouteCard } from '../../src/components/RouteCard'
import { FilterChips } from '../../src/components/FilterChips'
import { colors, space } from '../../src/theme/tokens'

const THEMES = ['all', 'classic', 'gastro', 'ice', 'summer', 'family', 'spiritual', 'museum', 'walk', 'nature', 'active', 'olkhon', 'kbzh']
export default function RoutesTab() {
  const { pack, t } = useContent()
  const router = useRouter()
  const [theme, setTheme] = useState('all')
  const routes = pack?.data.routes ?? []
  const opts = THEMES.map((k) => ({ key: k, label: k === 'all' ? t('filterAll') : k }))
  const list = useMemo(() => filterRoutes(routes, { theme: theme === 'all' ? undefined : theme }), [routes, theme])
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <FilterChips value={theme} options={opts} onChange={setTheme} />
      <FlatList data={list} keyExtractor={(r) => r.id} contentContainerStyle={s.list}
        renderItem={({ item }) => <RouteCard route={item} onPress={() => router.push(`/route/${item.slug}`)} />} />
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.bg }, list: { padding: space.md } })
