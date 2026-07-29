import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions,
  Image as RNImage,
} from 'react-native'
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
import { nearby, routesForBudget, arrivalRoutes, formatKm, type TimeBudget } from '../../src/lib/arrival'
import { formatDuration, formatWindow, isRunningOn, MODE_ICON } from '../../src/lib/transport'
import * as Location from 'expo-location'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import { EMBLEMS } from '../../src/content/emblems'
import { baikalSeason, formatHeroDate, heroPhoto, type Season } from '../../src/lib/homeHero'
import type { UiKey as UiKeyType } from '../../src/i18n/strings'

/** Сезон → ключ подписи. Отдельной таблицей, чтобы не собирать ключ склейкой строк. */
const SEASON_KEY: Record<Season, UiKeyType> = {
  winter: 'seasonWinter',
  spring: 'seasonSpring',
  summer: 'seasonSummer',
  autumn: 'seasonAutumn',
}

/** Четыре эмблемы-превью для строки «Люди Иркутска»: корабль, фуражка, камера, рояль. */
const PEOPLE_PREVIEW = ['shelikhov', 'kolchak', 'gaidai', 'matsuev'] as const
import { placeChipLabel, themeLabel } from '../../src/i18n/labels'
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
  // Шапка стала ниже: она больше не карточка места, а строка «где вы» — держать под неё
  // больше половины экрана значит отодвигать «Начните отсюда» за пределы первого взгляда.
  const heroHeight = Math.round(screenHeight * 0.46)
  const seasonCardWidth = (screenWidth - space.md * 2 - space.sm) / 2

  const [heroLoaded, setHeroLoaded] = useState(false)
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null)
  const [budget, setBudget] = useState<TimeBudget>('1')

  // Геопозиция запрашивается один раз и только для блока «рядом»: без неё считаем от центра города.
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync()
        if (status !== 'granted') return
        const pos = await Location.getCurrentPositionAsync({})
        if (alive) setMe({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      } catch {}
    })()
    return () => { alive = false }
  }, [])
  const scrollY = useRef(new Animated.Value(0)).current

  const sections = useMemo(() => homeSections(pack), [pack])
  const heroImage = useMemo(() => heroPhoto(pack?.data.places ?? []), [pack])
  // Дата берётся один раз за монтирование: пересчитывать её на каждый кадр прокрутки незачем.
  const today = useMemo(() => new Date(), [])
  const nearbyItems = useMemo(() => nearby(pack?.data.places ?? [], me), [pack, me])
  const budgetRoutes = useMemo(() => routesForBudget(pack?.data.routes ?? [], budget), [pack, budget])
  const arrivals = useMemo(() => arrivalRoutes(pack?.data.transport ?? [], new Date()), [pack])
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
        {heroImage ? (
          <KenBurns
            source={heroImage}
            extraTransform={reduceMotion ? undefined : [{ translateY: heroTranslateY }, { scale: heroScale } as never]}
            onLoad={() => setHeroLoaded(true)}
          />
        ) : null}
        <GradientOverlay variant="hero" />
        {/*
          Шапка, а не карточка места: раньше здесь стояло первое место каталога, и
          приложение открывалось экраном «ПРИРОДА · Озеро Байкал» — будто вы уже нажали
          на достопримечательность. Открывают его при этом в Иркутске, до озера ещё ехать.
          Поэтому шапка отвечает на три вопроса: где вы, какой сегодня день, далеко ли Байкал.
          Нажатия нет намеренно — всё действие ниже, в «Начните отсюда».
        */}
        <View style={s.heroPress} pointerEvents="none">
          <Glass edge="top" density="regular" style={s.heroGlass}>
            <Text style={s.eyebrow}>
              {formatHeroDate(today, lang)} · {t(SEASON_KEY[baikalSeason(today.getMonth() + 1)])}
            </Text>
            <Text style={s.heroTitle} numberOfLines={1}>{t('homeHeroCity')}</Text>
            <Text style={s.heroMeta} numberOfLines={2}>{t('homeHeroMeta')}</Text>
          </Glass>
        </View>
      </View>

      <View style={s.todayWrap}><TodayBar /></View>

      {nearbyItems.length > 0 && (
        <FadeInUp delay={40} style={s.sectionFirst}>
          <SectionHeader title={me ? t('arrNearby') : t('arrNearbyNoGeo')} />
          <View style={s.nearList}>
            {nearbyItems.map((item) => (
              <Press
                key={item.place.id}
                onPress={() => router.push(`/place/${item.place.slug}`)}
                haptic="light"
              >
                <Glass edge="top" density="thin" style={s.nearRow}>
                  <Image source={item.place.photoUrl} style={s.nearThumb} contentFit="cover" cachePolicy="memory-disk" transition={200} />
                  <View style={s.nearCol}>
                    <Text style={s.nearTitle} numberOfLines={1}>{item.place.translations[lang].title}</Text>
                    <Text style={s.nearMeta} numberOfLines={1}>
                      {placeChipLabel(item.place, lang)} · {formatKm(item.km, lang)}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
                </Glass>
              </Press>
            ))}
          </View>
        </FadeInUp>
      )}

      {budgetRoutes.length > 0 && (
        <FadeInUp delay={70} style={s.section}>
          <SectionHeader title={t('arrTime')} seeAllLabel={t('arrAllRoutes')} onSeeAll={() => router.push('/routes')} />
          <View style={s.budgetRow}>
            {(['1', '3', '7'] as TimeBudget[]).map((b) => (
              <Press key={b} onPress={() => setBudget(b)} haptic="selection">
                <View style={[s.budgetChip, budget === b && s.budgetChipOn]}>
                  <Text style={[s.budgetTxt, budget === b && s.budgetTxtOn]}>
                    {t(b === '1' ? 'arrTime1' : b === '3' ? 'arrTime3' : 'arrTime7')}
                  </Text>
                </View>
              </Press>
            ))}
          </View>
          <Carousel
            data={budgetRoutes}
            keyExtractor={(r) => r.id}
            renderItem={({ item }) => (
              <PhotoCard
                width={176}
                size="compact"
                photoUrl={routeCoverPhoto(item, byId)}
                title={item.translations[lang].title}
                chip={themeLabel(item.theme, lang) || undefined}
                badge={{ value: item.days, label: dayWord(item.days, lang) }}
                fav={{ kind: 'route', slug: item.slug }}
                onPress={() => router.push(`/route/${item.slug}`)}
              />
            )}
          />
        </FadeInUp>
      )}

      {arrivals.length > 0 && (
        <FadeInUp delay={90} style={s.section}>
          <SectionHeader title={t('arrHowTo')} seeAllLabel={t('filterAll')} onSeeAll={() => router.push('/practical/transport')} />
          <View style={s.nearList}>
            {arrivals.map((link) => (
              <Press key={link.id} onPress={() => router.push('/practical/transport')} haptic="light">
                <Glass edge="top" density="thin" style={s.arrRow}>
                  <Ionicons
                    name={MODE_ICON[link.mode] as never}
                    size={18}
                    color={isRunningOn(link, new Date()) ? colors.turquoise : colors.textDim}
                  />
                  <View style={s.nearCol}>
                    <Text style={s.nearTitle} numberOfLines={1}>{link.translations[lang].title}</Text>
                    <Text style={s.nearMeta} numberOfLines={1}>
                      {formatDuration(link.durationMin, lang)} · {formatWindow(link, lang)}
                    </Text>
                  </View>
                </Glass>
              </Press>
            ))}
          </View>
        </FadeInUp>
      )}

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

      <FadeInUp delay={300} style={s.section}>
        <Press onPress={() => router.push('/city-story')} haptic="light">
          <View style={s.storyCard}>
            <Image
              source="https://guide.getastrodaily.com/assets/img/irk-kvartal.jpg"
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={280}
            />
            <GradientOverlay variant="photo" />
            <View style={s.storyBody}>
              <Text style={s.storyEyebrow}>{t('cityStorySub')}</Text>
              <Text style={s.storyTitle}>{t('cityStoryTitle')}</Text>
            </View>
          </View>
        </Press>
      </FadeInUp>

      <FadeInUp delay={320} style={s.section}>
        <Press onPress={() => router.push('/people')} haptic="light">
          <Glass edge="top" density="thin" style={s.peopleRow}>
            {/* Вместо родовой иконки «человечки» — четыре эмблемы из самого раздела:
                строка сразу показывает, что там внутри, и не повторяет иконки соседних блоков. */}
            <View style={s.peopleMarks}>
              {PEOPLE_PREVIEW.map((id) => (
                <RNImage
                  key={id}
                  source={EMBLEMS[id]}
                  style={s.peopleMark}
                  resizeMode="contain"
                  accessibilityIgnoresInvertColors
                />
              ))}
            </View>
            <View style={s.nearCol}>
              <Text style={s.nearTitle}>{t('peopleTitle')}</Text>
              <Text style={s.nearMeta} numberOfLines={1}>{t('peopleSub')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
          </Glass>
        </Press>
      </FadeInUp>

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
  // Первая секция идёт сразу за строкой погоды — полный межсекционный отступ
  // оставлял под ней провал в пол-экрана.
  sectionFirst: { marginTop: space.lg },
  nearList: { paddingHorizontal: space.md, gap: space.sm },
  nearRow: {
    flexDirection: 'row', alignItems: 'center', gap: space.smd, padding: space.sm,
    borderRadius: radius.card, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.10)',
  },
  arrRow: {
    flexDirection: 'row', alignItems: 'center', gap: space.smd,
    paddingHorizontal: space.md, paddingVertical: space.smd,
    borderRadius: radius.card, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.10)',
  },
  nearThumb: { width: 54, height: 54, borderRadius: radius.md, backgroundColor: colors.surfaceAlt },
  nearCol: { flex: 1, gap: 2 },
  nearTitle: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  nearMeta: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
  budgetRow: { flexDirection: 'row', gap: space.sm, paddingHorizontal: space.md, paddingBottom: space.sm },
  budgetChip: {
    paddingHorizontal: space.md, paddingVertical: 9, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
  },
  budgetChipOn: { backgroundColor: 'rgba(255,255,255,0.90)', borderColor: 'transparent' },
  budgetTxt: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  budgetTxtOn: { color: colors.bg, fontFamily: fontFamily.bodyBold },
  peopleMarks: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  peopleMark: { width: 24, height: 24, opacity: 0.6 },
  peopleRow: {
    flexDirection: 'row', alignItems: 'center', gap: space.smd,
    marginHorizontal: space.md, paddingHorizontal: space.md, paddingVertical: space.smd,
    borderRadius: radius.card, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.10)',
  },
  storyCard: {
    marginHorizontal: space.md, height: 150, borderRadius: radius.photo,
    overflow: 'hidden', backgroundColor: colors.surfaceAlt, justifyContent: 'flex-end',
  },
  storyBody: { padding: space.md, gap: 2 },
  storyEyebrow: {
    color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip,
    textTransform: 'uppercase', letterSpacing: 1.2,
  },
  storyTitle: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  lastSection: { marginBottom: space.md },
  seasonRow: { flexDirection: 'row', gap: space.sm, paddingHorizontal: space.md },
  quickRow: { gap: space.sm, paddingHorizontal: space.md, paddingTop: space.xs },
  quickPill: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md, paddingVertical: 10, borderRadius: radius.pill, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderSoft },
  quickLabel: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
})
