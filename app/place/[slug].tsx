import React, { useRef, useState } from 'react'
import { Animated, Linking, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { FavHeart } from '../../src/components/FavHeart'
import { GradientOverlay } from '../../src/components/GradientOverlay'
import { Skeleton } from '../../src/components/Skeleton'
import { FadeInUp } from '../../src/components/FadeInUp'
import { useReduceMotion } from '../../src/hooks/useReduceMotion'
import { colors, space, font, fontFamily, radius, shadow } from '../../src/theme/tokens'

const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function PlaceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { pack, lang, t } = useContent()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const reduceMotion = useReduceMotion()
  const { height: screenHeight } = useWindowDimensions()
  const heroHeight = Math.round(screenHeight * 0.42)

  const [loaded, setLoaded] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current
  const heroScale = scrollY.interpolate({ inputRange: [-heroHeight, 0], outputRange: [1.5, 1], extrapolateRight: 'clamp' })
  const heroTranslateY = scrollY.interpolate({ inputRange: [0, heroHeight], outputRange: [0, heroHeight * 0.4], extrapolate: 'clamp' })

  const place = pack?.data.places.find((p) => p.slug === slug)
  if (!place) return <View style={s.notFound}><Text style={s.notFoundTxt}>—</Text></View>
  const tr = place.translations[lang]
  const geo = `https://maps.google.com/?q=${place.lat},${place.lng}`

  return (
    <View style={s.wrap}>
      <Animated.ScrollView
        contentContainerStyle={s.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.hero, { height: heroHeight }]}>
          {!loaded && <Skeleton style={StyleSheet.absoluteFill} radius={0} />}
          {place.photoUrl ? (
            <AnimatedImage
              source={place.photoUrl}
              style={[StyleSheet.absoluteFill, reduceMotion ? undefined : { transform: [{ translateY: heroTranslateY }, { scale: heroScale }] }]}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={280}
              onLoad={() => setLoaded(true)}
            />
          ) : null}
          <GradientOverlay variant="hero" />
          <View style={s.heroContent}>
            <Text style={s.cat}>{place.cuisine ?? place.category}</Text>
            <Text style={s.title}>{tr.title}</Text>
          </View>
        </View>

        <FadeInUp delay={80} style={s.body}>
          <Text style={s.desc}>{tr.description}</Text>

          {tr.story ? (
            <View style={s.storyCard}>
              <View style={s.storyHead}>
                <Ionicons name="book-outline" size={16} color={colors.gold} />
                <Text style={s.storyEyebrow}>{t('storyTitle')}</Text>
              </View>
              <Text style={s.storyText}>{tr.story}</Text>
            </View>
          ) : null}

          {(place.address || place.hours || place.cuisine) && (
            <View style={s.infoCard}>
              {place.address ? (
                <View style={s.infoRow}>
                  <Ionicons name="location-outline" size={18} color={colors.turquoise} />
                  <Text style={s.infoTxt}>{place.address}</Text>
                </View>
              ) : null}
              {place.hours ? (
                <View style={s.infoRow}>
                  <Ionicons name="time-outline" size={18} color={colors.turquoise} />
                  <Text style={s.infoTxt}>{place.hours} · <Text style={s.infoNote}>{t('hoursNote')}</Text></Text>
                </View>
              ) : null}
            </View>
          )}

          <View style={s.actions}>
            <Pressable style={s.primaryBtn} onPress={() => Linking.openURL(geo)}>
              <Ionicons name="map" size={18} color={colors.bg} />
              <Text style={s.primaryTxt}>{t('openInMaps')}</Text>
            </Pressable>
            {place.website ? (
              <Pressable style={s.secondaryBtn} onPress={() => Linking.openURL(place.website!)}>
                <Ionicons name="globe-outline" size={18} color={colors.text} />
                <Text style={s.secondaryTxt}>{t('siteBtn')}</Text>
              </Pressable>
            ) : null}
            {place.phone ? (
              <Pressable style={s.secondaryBtn} onPress={() => Linking.openURL(`tel:${place.phone}`)}>
                <Ionicons name="call-outline" size={18} color={colors.text} />
                <Text style={s.secondaryTxt}>{t('callBtn')}</Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable style={s.mapLink} onPress={() => router.push({ pathname: '/map', params: { flat: String(place.lat), flng: String(place.lng) } })}>
            <Ionicons name="locate-outline" size={16} color={colors.turquoise} />
            <Text style={s.mapLinkTxt}>{t('showOnMap')}</Text>
          </Pressable>
        </FadeInUp>
      </Animated.ScrollView>

      <Pressable onPress={() => router.back()} style={[s.backBtn, { top: insets.top + space.sm }]} hitSlop={8}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>
      <FavHeart kind="place" slug={place.slug} size={24} style={[s.heart, { top: insets.top + space.sm }]} />
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: space.xl },
  hero: { width: '100%', overflow: 'hidden', backgroundColor: colors.surfaceAlt, justifyContent: 'flex-end' },
  heroContent: { padding: space.lg },
  cat: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: space.xs },
  title: { color: colors.text, fontFamily: fontFamily.headingBlack, fontSize: font.scale.hero, lineHeight: font.scale.hero * 1.06 },
  body: { padding: space.md, gap: space.md },
  desc: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 24 },
  storyCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3, borderLeftColor: colors.gold, padding: space.md, gap: space.sm },
  storyHead: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  storyEyebrow: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, letterSpacing: 1, textTransform: 'uppercase' },
  storyText: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 25 },
  infoCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.md, gap: space.sm },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  infoTxt: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.body, flex: 1 },
  infoNote: { color: colors.textDim },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.turquoise, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.sm, ...shadow.glow },
  primaryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.sm },
  secondaryTxt: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  mapLink: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: space.xs },
  mapLinkTxt: { color: colors.turquoise, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  backBtn: { position: 'absolute', left: space.sm, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(10,15,22,0.55)', alignItems: 'center', justifyContent: 'center' },
  heart: { position: 'absolute', right: space.sm },
  notFound: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  notFoundTxt: { color: colors.textMuted, fontFamily: fontFamily.body },
})
