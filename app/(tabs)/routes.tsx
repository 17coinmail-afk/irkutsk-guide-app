import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { filterRoutes, placesById, resolveRouteStops, routeCoverPhoto } from '../../src/lib/selectors'
import { dayWord } from '../../src/lib/dayWord'
import { stopWord } from '../../src/lib/stopWord'
import { PhotoCard } from '../../src/components/PhotoCard'
import { SegmentedChips } from '../../src/components/SegmentedChips'
import { Skeleton } from '../../src/components/Skeleton'
import { themeLabel, difficultyLabel } from '../../src/i18n/labels'
import { colors, space, font, fontFamily } from '../../src/theme/tokens'

const THEMES = ['all', 'classic', 'gastro', 'ice', 'summer', 'family', 'spiritual', 'museum', 'walk', 'nature', 'active', 'olkhon', 'kbzh']

export default function RoutesTab() {
  const { pack, lang, t } = useContent()
  const router = useRouter()
  const [theme, setTheme] = useState('all')
  const routes = pack?.data.routes ?? []
  const loading = !pack
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])
  const opts = THEMES.map((k) => ({ key: k, label: k === 'all' ? t('filterAll') : themeLabel(k, lang) }))
  const list = useMemo(() => filterRoutes(routes, { theme: theme === 'all' ? undefined : theme }), [routes, theme])

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <SegmentedChips value={theme} options={opts} onChange={setTheme} />
      {loading ? (
        <View style={s.list}>
          <Skeleton style={s.skeletonCard} radius={20} />
          <Skeleton style={s.skeletonCard} radius={20} />
          <Skeleton style={s.skeletonCard} radius={20} />
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(r) => r.id}
          contentContainerStyle={s.list}
          initialNumToRender={6}
          renderItem={({ item }) => {
            const stops = resolveRouteStops(item, byId)
            const tr = item.translations[lang]
            return (
              <PhotoCard
                size="large"
                photoUrl={routeCoverPhoto(item, byId)}
                title={tr.title}
                chip={themeLabel(item.theme, lang) || undefined}
                meta={`${stops.length} ${stopWord(stops.length, lang)} · ${difficultyLabel(item.difficulty, lang)}`}
                badge={{ value: item.days, label: dayWord(item.days, lang) }}
                fav={{ kind: 'route', slug: item.slug }}
                onPress={() => router.push(`/route/${item.slug}`)}
              />
            )
          }}
          ListEmptyComponent={<Text style={s.empty}>{t('noResults')}</Text>}
        />
      )}
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, paddingBottom: 96, gap: space.md },
  skeletonCard: { height: 208 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: space.xl, fontFamily: fontFamily.body, fontSize: font.scale.body },
})
