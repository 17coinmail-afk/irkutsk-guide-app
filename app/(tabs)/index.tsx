import React, { useMemo, useRef, useState } from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { useFavorites } from '../../src/content/FavoritesProvider'
import { homeSections } from '../../src/lib/homeSections'
import { placesById, resolveRouteStops, routeCoverPhoto } from '../../src/lib/selectors'
import { dayWord } from '../../src/lib/dayWord'
import { stopWord } from '../../src/lib/stopWord'
import { GradientOverlay } from '../../src/components/GradientOverlay'
import { StatBand, type StatItem } from '../../src/components/StatBand'
import { SectionHeader } from '../../src/components/SectionHeader'
import type { UiKey } from '../../src/i18n/strings'
import { Carousel } from '../../src/components/Carousel'
import { PhotoCard } from '../../src/components/PhotoCard'
import { SeasonCard } from '../../src/components/SeasonCard'
import { Skeleton } from '../../src/components/Skeleton'
import { FadeInUp } from '../../src/components/FadeInUp'
import { KenBurns } from '../../src/components/KenBurns'
import { Press } from '../../src/components/Press'
import { Glass } from '../../src/components/Glass'
import { TodayBar } from '../../src/components/TodayBar'
import { ContourBackdrop } from '../../src/components/ContourBackdrop'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import { placeChipLabel, categoryLabel, themeLabel } from '../../src/i18n/labels'
import { colors, font, fontFamily, radius, space } from '../../src/theme/tokens'
import OfflineFirstRun from '../offline-first-run'

const AnimatedImage = Animated.createAnimatedComponent(Image)

// Быстрый доступ к «Практике» и AI прямо с главной.
const QUICK: { route: string; icon: string; label: UiKey; c: string }[] = [
  { route: '/practical/getting-there', icon: 'bus-outline', label: 'modGetThere', c: colors.turquoise },
  { route: '/practical/weather', icon: 'partly-sunny-outline', label: 'modWeather', c: colors.turquoise },
  { route: '/practical/phrasebook', icon: 'language-outline', label: 'modPhrasebook', c: colors.gold },
  { route: '/practical/cuisine', icon: 'restaurant-outline', label: 'modCuisine', c: colors.gold },
  { route: '/assistant', icon: 'sparkles-outline', label: 'assistantTitle', c: colors.gold },
]

export default function HomeTab() {
  const { pack, lang, t, offlineFirstRun } = useContent()
  const { favs } = useFavorites()
  const router = useRouter()
  const reduceMotion = useReduceMotion()
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const heroHeight = Math.round(screenHeight * 0.55)
  const seasonCardWidth = (screenWidth - space.md * 2 - space.sm) / 2

  const [heroLoaded, setHeroLoaded] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  const sections = useMemo(() => homeSections(pack), [pack])
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])

  const tripPlaces = useMemo(() => (pack?.data.places ?? []).filter((p) => favs.has(`place:${p.slug}`)), [pack, favs])
  const tripRoutes = useMemo(() => (pack?.data.routes ?? []).filter((r) => favs.has(`route:${r.slug}`)), [pack, favs])
  const hasTrip = tripPlaces.length > 0 || tripRoutes.length > 0

  const stats: StatItem[] = useMemo(() => [
    { id: 'depth', target: -1642, unit: t('statUnitDepth'), label: t('statLabelDepth') },
    { id: 'age', target: 25, unit: t('statUnitAge'), label: t('statLabelAge') },
    { id: 'fresh', target: 20, unit: t('statUnitFresh'), label: t('statLabelFresh') },
    { id: 'length', target: 636, unit: t('statUnitLength'), label: t('statLabelLength') },
  ], [t])

  const heroTranslateY = scrollY.interpolate({
    inputRange: [-heroHeight, 0, heroHeight],
    outputRange: [-heroHeight / 2, 0, heroHeight * 0.35],
    extrapolate: 'clamp',
  })
  const heroScale = scrollY.interpolate({ inputRange: [-heroHeight, 0], outputRange: [1.6, 1], extrapolateRight: 'clamp' })

  if (offlineFirstRun && !pack) return <OfflineFirstRun />

  return (
    <Animated.ScrollView
      style={s.wrap}
      contentContainerStyle={s.content}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={[s.hero, { height: heroHeight }]}>
        {!heroLoaded && <Skeleton style={StyleSheet.absoluteFill} radius={0} />}
        {sections.hero?.photoUrl ? (
          <KenBurns
            source={sections.hero.photoUrl}
            extraTransform={reduceMotion ? undefined : [{ translateY: heroTranslateY }, { scale: heroScale } as never]}
            onLoad={() => setHeroLoaded(true)}
          />
        ) : null}
        <GradientOverlay variant="hero" />
        {/* Герой — конкретное место, а не слоган: издательская обложка вместо рекламной шапки. */}
        <Press
          onPress={() => sections.hero && router.push(`/place/${sections.hero.slug}`)}
          haptic="light"
          style={s.heroPress}
        >
          <Glass edge="top" density="regular" style={s.heroGlass}>
            <Text style={s.eyebrow}>{t('homeEyebrow')}</Text>
            <Text style={s.heroTitle} numberOfLines={2}>
              {sections.hero ? sections.hero.translations[lang].title : t('homeTitle')}
            </Text>
            <Text style={s.heroMeta} numberOfLines={1}>
              {sections.hero
                ? categoryLabel(sections.hero.category, lang).toUpperCase()
                : t('homeSubtitle')}
            </Text>
          </Glass>
        </Press>
      </View>

      <View style={s.todayWrap}><TodayBar /></View>

      <FadeInUp delay={60}>
        <View style={s.statWrap}>
          <ContourBackdrop height={200} opacity={0.1} />
          <Glass edge="top" density="thin" style={s.statGlass}>
            <StatBand stats={stats} />
          </Glass>
        </View>
      </FadeInUp>

      <FadeInUp delay={90} style={s.section}>
        <SectionHeader title={t('practicalTitle')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/practical')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.quickRow}>
          {QUICK.map((q) => (
            <Press key={q.route} onPress={() => router.push(q.route as never)} haptic="light">
              <Glass edge="top" density="thin" style={s.quickPill}>
                <Ionicons name={q.icon as never} size={18} color={q.c} />
                <Text style={s.quickLabel} numberOfLines={1}>{t(q.label)}</Text>
              </Glass>
            </Press>
          ))}
        </ScrollView>
      </FadeInUp>

      {sections.mustSee.length > 0 && (
        <FadeInUp delay={120} style={s.section}>
          <SectionHeader title={t('secMustSee')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/places')} />
          <Carousel
            data={sections.mustSee}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <PhotoCard
                width={176}
                size="compact"
                photoUrl={item.photoUrl}
                title={item.translations[lang].title}
                chip={placeChipLabel(item, lang)}
                fav={{ kind: 'place', slug: item.slug }}
                onPress={() => router.push(`/place/${item.slug}`)}
              />
            )}
          />
        </FadeInUp>
      )}

      {sections.topRoutes.length > 0 && (
        <FadeInUp delay={160} style={s.section}>
          <SectionHeader title={t('secTopRoutes')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/routes')} />
          <Carousel
            data={sections.topRoutes}
            keyExtractor={(r) => r.id}
            renderItem={({ item }) => {
              const stops = resolveRouteStops(item, byId)
              return (
                <PhotoCard
                  width={176}
                  size="compact"
                  photoUrl={routeCoverPhoto(item, byId)}
                  title={item.translations[lang].title}
                  chip={themeLabel(item.theme, lang) || undefined}
                  meta={`${stops.length} ${stopWord(stops.length, lang)}`}
                  badge={{ value: item.days, label: dayWord(item.days, lang) }}
                  fav={{ kind: 'route', slug: item.slug }}
                  onPress={() => router.push(`/route/${item.slug}`)}
                />
              )
            }}
          />
        </FadeInUp>
      )}

      {sections.seasons.some((sn) => sn.photoUrl) && (
        <FadeInUp delay={200} style={s.section}>
          <SectionHeader title={t('secSeasons')} />
          <View style={s.seasonRow}>
            {sections.seasons.map((sn) => (
              <SeasonCard key={sn.key} width={seasonCardWidth} title={t(sn.titleKey)} caption={t(sn.captionKey)} photoUrl={sn.photoUrl} />
            ))}
          </View>
        </FadeInUp>
      )}

      {sections.city.length > 0 && (
        <FadeInUp delay={240} style={s.section}>
          <SectionHeader title={t('secCityHome')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/places')} />
          <Carousel
            data={sections.city}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <PhotoCard
                width={176}
                size="compact"
                photoUrl={item.photoUrl}
                title={item.translations[lang].title}
                chip={placeChipLabel(item, lang)}
                fav={{ kind: 'place', slug: item.slug }}
                onPress={() => router.push(`/place/${item.slug}`)}
              />
            )}
          />
        </FadeInUp>
      )}

      {sections.food.length > 0 && (
        <FadeInUp delay={280} style={s.section}>
          <SectionHeader title={t('secFood')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/places')} />
          <Carousel
            data={sections.food}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <PhotoCard
                width={176}
                size="compact"
                photoUrl={item.photoUrl}
                title={item.translations[lang].title}
                chip={placeChipLabel(item, lang)}
                meta={item.address ?? undefined}
                fav={{ kind: 'place', slug: item.slug }}
                onPress={() => router.push(`/place/${item.slug}`)}
              />
            )}
          />
        </FadeInUp>
      )}

      {hasTrip && (
        <FadeInUp delay={320} style={[s.section, s.lastSection]}>
          <SectionHeader title={t('secTrip')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/trip')} />
          <Carousel
            data={[...tripPlaces.map((p) => ({ kind: 'place' as const, p })), ...tripRoutes.map((r) => ({ kind: 'route' as const, r }))]}
            keyExtractor={(item) => (item.kind === 'place' ? `p-${item.p.id}` : `r-${item.r.id}`)}
            renderItem={({ item }) =>
              item.kind === 'place' ? (
                <PhotoCard
                  width={176}
                  size="compact"
                  photoUrl={item.p.photoUrl}
                  title={item.p.translations[lang].title}
                  chip={placeChipLabel(item.p, lang)}
                  fav={{ kind: 'place', slug: item.p.slug }}
                  onPress={() => router.push(`/place/${item.p.slug}`)}
                />
              ) : (
                <PhotoCard
                  width={176}
                  size="compact"
                  photoUrl={routeCoverPhoto(item.r, byId)}
                  title={item.r.translations[lang].title}
                  chip={themeLabel(item.r.theme, lang) || undefined}
                  badge={{ value: item.r.days, label: dayWord(item.r.days, lang) }}
                  fav={{ kind: 'route', slug: item.r.slug }}
                  onPress={() => router.push(`/route/${item.r.slug}`)}
                />
              )
            }
          />
        </FadeInUp>
      )}
    </Animated.ScrollView>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: space.xl },
  hero: { width: '100%', overflow: 'hidden', backgroundColor: colors.surfaceAlt, justifyContent: 'flex-end' },
  heroPress: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  heroGlass: {
    margin: space.smd, marginBottom: space.md, padding: space.md,
    borderRadius: radius.sheet, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.16)',
  },
  statGlass: {
    marginHorizontal: space.md, borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.12)',
  },
  heroContent: { padding: space.lg, paddingBottom: space.lg },
  eyebrow: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: space.sm },
  heroTitle: { color: colors.text, fontFamily: fontFamily.headingBlack, fontSize: font.scale.hero, lineHeight: font.scale.hero * 1.08 },
  heroMeta: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small, marginTop: space.sm, letterSpacing: 0.8 },
  todayWrap: { marginTop: -space.lg, marginBottom: space.smd, zIndex: 2 },
  statWrap: { marginBottom: space.md, overflow: 'hidden' },
  section: { marginTop: space.xl },
  lastSection: { marginBottom: space.md },
  seasonRow: { flexDirection: 'row', gap: space.sm, paddingHorizontal: space.md },
  quickRow: { gap: space.sm, paddingHorizontal: space.md, paddingTop: space.xs },
  quickPill: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md, paddingVertical: 10, borderRadius: radius.pill, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderSoft },
  quickLabel: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
})
