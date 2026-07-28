import React, { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image'
import { WebView } from 'react-native-webview'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { placesById, resolveRouteStops, routeCoverPhoto } from '../../src/lib/selectors'
import { dayWord } from '../../src/lib/dayWord'
import { stopWord } from '../../src/lib/stopWord'
import { buildMapHtml, type MapPoint } from '../../src/map/leafletHtml'
import { FavHeart } from '../../src/components/FavHeart'
import { GradientOverlay } from '../../src/components/GradientOverlay'
import { Skeleton } from '../../src/components/Skeleton'
import { PhotoCard } from '../../src/components/PhotoCard'
import { FadeInUp } from '../../src/components/FadeInUp'
import { GlassHeader } from '../../src/components/GlassHeader'
import { Glass } from '../../src/components/Glass'
import { Press } from '../../src/components/Press'
import { Shimmer } from '../../src/components/Shimmer'
import { KenBurns } from '../../src/components/KenBurns'
import { StopTimeline, type TimelineStop } from '../../src/components/StopTimeline'
import { themeLabel } from '../../src/i18n/labels'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import { colors, space, font, fontFamily, radius } from '../../src/theme/tokens'

const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function RouteDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang, t } = useContent()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const reduceMotion = useReduceMotion()
  const { height: screenHeight } = useWindowDimensions()
  const heroHeight = Math.round(screenHeight * 0.36)

  const [heroLoaded, setHeroLoaded] = useState(false)
  const [mapLoading, setMapLoading] = useState(true)
  const scrollY = useRef(new Animated.Value(0)).current
  const heroScale = scrollY.interpolate({ inputRange: [-heroHeight, 0], outputRange: [1.5, 1], extrapolateRight: 'clamp' })

  const route = pack?.data.routes.find((r) => r.slug === slug)
  const byId = useMemo(() => placesById(pack?.data.places ?? []), [pack])
  const stops = useMemo(() => (route ? resolveRouteStops(route, byId) : []), [route, byId])
  const cover = useMemo(() => (route ? routeCoverPhoto(route, byId) : null), [route, byId])
  const html = useMemo(() => {
    const points: MapPoint[] = stops.map((p) => ({ lng: p.lng, lat: p.lat, slug: p.slug, title: p.translations[lang].title, city: p.section === 'city' }))
    return buildMapHtml(points, { line: true })
  }, [stops, lang])

  if (!route) return <View style={s.notFound}><Text style={s.notFoundTxt}>—</Text></View>
  const tr = route.translations[lang]

  const timelineStops: TimelineStop[] = stops.map((p) => ({
    id: p.id, slug: p.slug, photoUrl: p.photoUrl, category: p.category, cuisine: p.cuisine,
    title: p.translations[lang].title, subtitle: p.translations[lang].description,
  }))

  return (
    <View style={s.wrap}>
      <GlassHeader
        title={tr.title}
        scrollY={scrollY}
        onBack={() => router.back()}
        right={<FavHeart kind="route" slug={route.slug} size={22} />}
      />
      <Animated.ScrollView
        contentContainerStyle={s.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.hero, { height: heroHeight }]}>
          {!heroLoaded && <Skeleton style={StyleSheet.absoluteFill} radius={0} />}
          {cover ? <KenBurns source={cover} onLoad={() => setHeroLoaded(true)} /> : null}
          <GradientOverlay variant="hero" />
          <View style={s.heroContent}>
            {route.theme ? <Text style={s.cat}>{themeLabel(route.theme, lang)}</Text> : null}
            <Text style={s.title}>{tr.title}</Text>
            <Text style={s.meta}>{route.days} {dayWord(route.days, lang)} · {stops.length} {stopWord(stops.length, lang)} </Text>
          </View>
        </View>

        <FadeInUp delay={80} style={s.body}>
          <Text style={s.desc}>{tr.description}</Text>
        </FadeInUp>

        {stops.length > 0 && (
          <FadeInUp delay={120} style={s.mapWrap}>
            <WebView originWhitelist={['*']} source={{ html }} style={s.map} javaScriptEnabled domStorageEnabled scrollEnabled={false} onLoadEnd={() => setMapLoading(false)} />
            {mapLoading && (
              <View style={s.mapLoader} pointerEvents="none">
                <ActivityIndicator color={colors.turquoise} />
                <Text style={s.mapLoaderTxt}>{t('mapLoading')}</Text>
              </View>
            )}
          </FadeInUp>
        )}

        <StopTimeline
          stops={timelineStops}
          days={route.days}
          lang={lang}
          dayLabel={(d) => (lang === 'zh' ? `第${d}天` : lang === 'en' ? `Day ${d}` : `День ${d}`)}
          onPress={(slug) => router.push(`/place/${slug}`)}
          reduceMotion={reduceMotion}
        />
      </Animated.ScrollView>

      <Glass edge="top" density="dense" style={[s.dock, { paddingBottom: insets.bottom + space.sm }]}>
        <Press
          onPress={() => router.push({ pathname: '/map', params: { route: route.slug } })}
          haptic="light"
          style={s.dockPrimaryWrap}
        >
          <View style={s.primaryBtn}>
            <Shimmer radius={radius.pill} />
            <Ionicons name="map" size={18} color={colors.bg} />
            <Text style={s.primaryTxt}>{t('showOnMap')}</Text>
          </View>
        </Press>
      </Glass>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 110 },
  hero: { width: '100%', overflow: 'hidden', backgroundColor: colors.surfaceAlt, justifyContent: 'flex-end' },
  heroContent: { padding: space.lg },
  cat: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: space.xs },
  title: { color: colors.text, fontFamily: fontFamily.headingBlack, fontSize: font.scale.hero, lineHeight: font.scale.hero * 1.06 },
  meta: { color: colors.textMuted, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small, marginTop: space.sm },
  body: { paddingHorizontal: space.md, paddingTop: space.md },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 24 },
  mapWrap: { margin: space.md, borderRadius: radius.lg, overflow: 'hidden', height: 200 },
  map: { flex: 1, backgroundColor: colors.bg },
  mapLoader: { ...StyleSheet.absoluteFill, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: space.xs },
  mapLoaderTxt: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
  timeline: { paddingHorizontal: space.md, paddingTop: space.sm },
  stopRow: { flexDirection: 'row', gap: space.sm },
  stopIndexCol: { width: 28, alignItems: 'center' },
  idx: { color: colors.gold, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  stopLine: { flex: 1, width: 2, backgroundColor: colors.border, marginTop: 4, marginBottom: 4 },
  stopCard: { flex: 1, paddingBottom: space.md },
  stopPhoto: { width: '100%' },
  backBtn: { position: 'absolute', left: space.sm, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(10,15,22,0.55)', alignItems: 'center', justifyContent: 'center' },
  heart: { position: 'absolute', right: space.sm },
  dock: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md, paddingTop: space.sm },
  dockPrimaryWrap: { flex: 1 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.turquoise, borderRadius: radius.pill, paddingVertical: 13, overflow: 'hidden' },
  primaryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  notFound: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  notFoundTxt: { color: colors.textMuted, fontFamily: fontFamily.body },
})
