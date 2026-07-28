import React, { useRef, useState } from 'react'
import { Animated, Linking, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { useFavorites } from '../../src/content/FavoritesProvider'
import { FavHeart } from '../../src/components/FavHeart'
import { GradientOverlay } from '../../src/components/GradientOverlay'
import { Skeleton } from '../../src/components/Skeleton'
import { FadeInUp } from '../../src/components/FadeInUp'
import { GlassHeader } from '../../src/components/GlassHeader'
import { GlowCard } from '../../src/components/GlowCard'
import { FactCard, type Fact } from '../../src/components/FactCard'
import { KenBurns } from '../../src/components/KenBurns'
import { Press } from '../../src/components/Press'
import { Shimmer } from '../../src/components/Shimmer'
import { Glass } from '../../src/components/Glass'
import { placeChipLabel } from '../../src/i18n/labels'
import { routeWord } from '../../src/lib/routeWord'
import { linksToPlace, pickSeasonal, isRunningOn, formatWindow, formatDuration, MODE_ICON } from '../../src/lib/transport'
import { appUrl, webUrl, MAP_APPS } from '../../src/lib/externalMaps'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import { colors, space, font, fontFamily, radius } from '../../src/theme/tokens'

/** Первая буква рассказа — буквица: сигнал «это не подпись, а текст, который стоит прочесть». */
function withDropCap(story: string) {
  const first = story.slice(0, 1)
  const rest = story.slice(1)
  return { first, rest }
}

export default function PlaceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang, t } = useContent()
  const { isFavorite, toggleFav } = useFavorites()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const reduceMotion = useReduceMotion()
  const { height: screenHeight } = useWindowDimensions()
  const heroHeight = Math.round(screenHeight * 0.5)

  const [loaded, setLoaded] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current
  const heroTranslateY = scrollY.interpolate({ inputRange: [0, heroHeight], outputRange: [0, heroHeight * 0.4], extrapolate: 'clamp' })

  const place = pack?.data.places.find((p) => p.slug === slug)
  if (!place) return <View style={s.notFound}><Text style={s.notFoundTxt}>—</Text></View>
  const tr = place.translations[lang]
  const geo = `https://maps.google.com/?q=${place.lat},${place.lng}`
  const saved = isFavorite('place', place.slug)

  // В скольких готовых маршрутах встречается это место — сразу видно, насколько оно ключевое.
  const inRoutes = (pack?.data.routes ?? []).filter((r) => r.stops.some((st) => st.placeId === place.id)).length

  const facts: Fact[] = []
  if (place.address) facts.push({ icon: 'location-outline', text: place.address })
  if (place.hours) facts.push({ icon: 'time-outline', text: place.hours, note: t('hoursNote') })
  facts.push({
    icon: 'navigate-outline',
    text: `${Math.abs(place.lat).toFixed(4)}° N · ${Math.abs(place.lng).toFixed(4)}° E`,
  })
  if (inRoutes > 0) {
    facts.push({ icon: 'map-outline', text: `${inRoutes} ${routeWord(inRoutes, lang)}` })
  }

  // Варианты добраться именно до этого места: сначала те, что работают в текущем сезоне.
  const arrivals = pickSeasonal(linksToPlace(pack?.data.transport ?? [], place.slug), new Date())

  const story = tr.story ? withDropCap(tr.story) : null
  const tips = tr.tips ? tr.tips.split(/(?<=[.;])\s+/).filter((x) => x.trim().length > 0) : []

  return (
    <View style={s.wrap}>
      <GlassHeader
        title={tr.title}
        scrollY={scrollY}
        onBack={() => router.back()}
        right={<FavHeart kind="place" slug={place.slug} size={22} />}
      />

      <Animated.ScrollView
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 96 }]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.hero, { height: heroHeight }]}>
          {!loaded && <Skeleton style={StyleSheet.absoluteFill} radius={0} />}
          {place.photoUrl ? (
            <KenBurns
              source={place.photoUrl}
              extraTransform={reduceMotion ? undefined : [{ translateY: heroTranslateY }]}
              onLoad={() => setLoaded(true)}
            />
          ) : null}
          <GradientOverlay variant="hero" />
          <View style={s.heroContent}>
            <Text style={s.cat}>{placeChipLabel(place, lang)}</Text>
            <Text style={s.title}>{tr.title}</Text>
          </View>
        </View>

        <View style={s.factWrap}>
          <FactCard eyebrow="" facts={facts} />
        </View>

        <FadeInUp delay={80} style={s.body}>
          {place.category !== 'food' ? <Text style={s.desc}>{tr.description}</Text> : null}

          {place.gallery && place.gallery.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.gallery}>
              {place.gallery.map((url, i) => (
                <View key={i} style={[s.galleryFrame, { transform: [{ rotate: i % 2 === 0 ? '-1.5deg' : '1.5deg' }] }]}>
                  <Image source={url} style={s.galleryImg} contentFit="cover" cachePolicy="memory-disk" transition={200} />
                </View>
              ))}
            </ScrollView>
          ) : null}

          {arrivals.length > 0 ? (
            <View style={s.tipsCard}>
              <View style={s.storyHead}>
                <Ionicons name="navigate-circle-outline" size={16} color={colors.turquoise} />
                <Text style={s.tipsEyebrow}>{t('trHowToGet')}</Text>
              </View>
              {arrivals.slice(0, 3).map((link) => {
                const running = isRunningOn(link, new Date())
                return (
                  <View key={link.id} style={[s.arrivalRow, !running && s.arrivalResting]}>
                    <Ionicons name={MODE_ICON[link.mode] as never} size={16} color={running ? colors.turquoise : colors.textDim} style={s.tipIcon} />
                    <View style={s.arrivalCol}>
                      <Text style={s.arrivalTitle}>{link.translations[lang].title}</Text>
                      <Text style={s.arrivalMeta}>
                        {formatDuration(link.durationMin, lang)} · {formatWindow(link, lang)}
                      </Text>
                    </View>
                  </View>
                )
              })}
              <Press onPress={() => router.push('/practical/transport')} haptic="light">
                <Text style={s.arrivalMore}>{t('modTransport')} →</Text>
              </Press>
            </View>
          ) : null}

          {story ? (
            <GlowCard tone="gold" contentStyle={s.storyInner}>
              <View style={s.storyHead}>
                <Ionicons name="book-outline" size={16} color={colors.gold} />
                <Text style={s.storyEyebrow}>{t('storyTitle')}</Text>
              </View>
              <Text style={s.storyText}>
                <Text style={s.dropCap}>{story.first}</Text>
                {story.rest}
              </Text>
            </GlowCard>
          ) : null}

          {tips.length > 0 ? (
            <View style={s.tipsCard}>
              <View style={s.storyHead}>
                <Ionicons name="navigate-circle-outline" size={16} color={colors.turquoise} />
                <Text style={s.tipsEyebrow}>{t('tipsTitle')}</Text>
              </View>
              {tips.map((line, i) => (
                <View key={i} style={s.tipRow}>
                  <Ionicons name="chevron-forward" size={14} color={colors.turquoise} style={s.tipIcon} />
                  <Text style={s.tipTxt}>{line}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={s.actions}>
            {place.website ? (
              <Press onPress={() => Linking.openURL(place.website!)} haptic="light">
                <View style={s.secondaryBtn}>
                  <Ionicons name="globe-outline" size={18} color={colors.text} />
                  <Text style={s.secondaryTxt}>{t('siteBtn')}</Text>
                </View>
              </Press>
            ) : null}
            {place.phone ? (
              <Press onPress={() => Linking.openURL(`tel:${place.phone}`)} haptic="light">
                <View style={s.secondaryBtn}>
                  <Ionicons name="call-outline" size={18} color={colors.text} />
                  <Text style={s.secondaryTxt}>{t('callBtn')}</Text>
                </View>
              </Press>
            ) : null}
            {MAP_APPS.map((app) => (
              <Press
                key={app.id}
                haptic="light"
                onPress={async () => {
                  const target = { lat: place.lat, lng: place.lng, title: tr.title }
                  const deep = appUrl(app.id, target)
                  const canOpen = await Linking.canOpenURL(deep).catch(() => false)
                  Linking.openURL(canOpen ? deep : webUrl(app.id, target))
                }}
              >
                <View style={s.secondaryBtn}>
                  <Ionicons name="navigate-outline" size={18} color={colors.text} />
                  <Text style={s.secondaryTxt}>{app.label}</Text>
                </View>
              </Press>
            ))}
          </View>
        </FadeInUp>
      </Animated.ScrollView>

      {/* Липкая полоса действий: главное — показать на карте, рядом — сохранить в поездку. */}
      <Glass edge="top" density="dense" style={[s.dock, { paddingBottom: insets.bottom + space.sm }]}>
        <Press
          onPress={() => router.push({ pathname: '/map', params: { flat: String(place.lat), flng: String(place.lng) } })}
          haptic="light"
          style={s.dockPrimaryWrap}
        >
          <View style={s.primaryBtn}>
            <Shimmer radius={radius.pill} />
            <Ionicons name="locate-outline" size={18} color={colors.bg} />
            <Text style={s.primaryTxt}>{t('showOnMap')}</Text>
          </View>
        </Press>
        <Press onPress={() => toggleFav('place', place.slug)} haptic="selection">
          <View style={[s.saveBtn, saved && s.saveBtnOn]}>
            <Ionicons name={saved ? 'heart' : 'heart-outline'} size={20} color={saved ? colors.bg : colors.gold} />
          </View>
        </Press>
      </Glass>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: space.xl },
  hero: { width: '100%', overflow: 'hidden', backgroundColor: colors.surfaceAlt, justifyContent: 'flex-end' },
  heroContent: { padding: space.lg, paddingBottom: space.xl },
  cat: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: space.xs },
  title: { color: colors.text, fontFamily: fontFamily.headingBlack, fontSize: font.scale.hero, lineHeight: font.scale.hero * 1.06 },
  factWrap: { marginTop: -space.lg, zIndex: 2 },
  body: { padding: space.md, paddingTop: space.lg, gap: space.md },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 24 },
  gallery: { gap: space.smd, paddingVertical: space.sm, paddingHorizontal: space.xs },
  galleryFrame: { borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surfaceAlt },
  galleryImg: { width: 240, height: 170 },
  storyInner: { gap: space.sm },
  storyHead: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  storyEyebrow: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, letterSpacing: 1, textTransform: 'uppercase' },
  storyText: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 27 },
  dropCap: { color: colors.gold, fontFamily: fontFamily.heading, fontSize: 34, lineHeight: 34 },
  tipsCard: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3, borderLeftColor: colors.turquoise, padding: space.md, gap: space.sm },
  tipsEyebrow: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, letterSpacing: 1, textTransform: 'uppercase' },
  tipRow: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' },
  tipIcon: { marginTop: 3 },
  tipTxt: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 22, flex: 1 },
  arrivalRow: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' },
  arrivalResting: { opacity: 0.55 },
  arrivalCol: { flex: 1, gap: 1 },
  arrivalTitle: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  arrivalMeta: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small },
  arrivalMore: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small, paddingTop: space.xs },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.sm },
  secondaryTxt: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  dock: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md, paddingTop: space.sm },
  dockPrimaryWrap: { flex: 1 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.turquoise, borderRadius: radius.pill, paddingVertical: 13, overflow: 'hidden' },
  primaryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  saveBtn: { width: 48, height: 48, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.gold, backgroundColor: 'transparent' },
  saveBtnOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  notFound: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  notFoundTxt: { color: colors.textMuted, fontFamily: fontFamily.body },
})
