import React, { useState } from 'react'
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native'
import { Image } from 'expo-image'
import { colors, radius, space, font, fontFamily, shadow } from '../theme/tokens'
import { GradientOverlay } from './GradientOverlay'
import { Skeleton } from './Skeleton'
import { FavHeart } from './FavHeart'
import { Press } from './Press'
import type { FavKind } from '../lib/favorites'

export type PhotoCardSize = 'hero' | 'large' | 'compact'
export interface PhotoCardBadge { value: string | number; label: string }

export interface PhotoCardProps {
  photoUrl: string | null
  title: string
  chip?: string
  meta?: string
  distanceLabel?: string
  badge?: PhotoCardBadge
  size?: PhotoCardSize
  onPress: () => void
  fav?: { kind: FavKind; slug: string }
  /** Фиксированная ширина — для compact-карточек в горизонтальных каруселях. Без неё — 100% родителя. */
  width?: number
  style?: StyleProp<ViewStyle>
  testID?: string
}

// Вертикальные пропорции (≈4:5) — фото на телефоне работает лучше, чем ландшафтная плитка.
const HEIGHT: Record<PhotoCardSize, number> = { hero: 300, large: 232, compact: 220 }
const TITLE_SIZE: Record<PhotoCardSize, number> = { hero: font.scale.h1, large: font.scale.h2, compact: 17 }

function PhotoCardBase({ photoUrl, title, chip, meta, distanceLabel, badge, size = 'large', onPress, fav, width, style, testID }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false)

  const height = HEIGHT[size]
  return (
    <Press onPress={onPress} testID={testID} accessibilityLabel={title} style={[width ? { width } : s.fullWidth, style]}>
      <View style={[s.card, { height }]}>
        <View style={StyleSheet.absoluteFill}>
          {!loaded && <Skeleton style={StyleSheet.absoluteFill} radius={radius.photo} />}
          {photoUrl ? (
            <Image
              source={photoUrl}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={280}
              cachePolicy="memory-disk"
              onLoad={() => setLoaded(true)}
            />
          ) : null}
        </View>
        <GradientOverlay variant="photo" />
        {fav ? <FavHeart kind={fav.kind} slug={fav.slug} style={s.heart} /> : null}
        {badge ? (
          <View style={s.badge}>
            <Text style={s.badgeValue}>{badge.value}</Text>
            <Text style={s.badgeLabel} numberOfLines={1}>{badge.label}</Text>
          </View>
        ) : null}
        <View style={s.content}>
          {chip ? <Text style={s.chip} numberOfLines={1}>{chip}</Text> : null}
          <Text style={[s.title, { fontSize: TITLE_SIZE[size] }]} numberOfLines={2}>{title}</Text>
          {meta ? <Text style={s.meta} numberOfLines={1}>{meta}</Text> : null}
          {distanceLabel ? <Text style={s.distance}>{distanceLabel}</Text> : null}
        </View>
      </View>
    </Press>
  )
}

export const PhotoCard = React.memo(PhotoCardBase)

const s = StyleSheet.create({
  fullWidth: { width: '100%' },
  card: { borderRadius: radius.photo, overflow: 'hidden', backgroundColor: colors.surfaceAlt, ...shadow.card },
  heart: { position: 'absolute', top: space.sm, right: space.sm },
  badge: {
    position: 'absolute', top: space.sm, left: space.sm,
    backgroundColor: 'rgba(10,15,22,0.72)', borderRadius: radius.md,
    paddingHorizontal: space.sm, paddingVertical: 6, alignItems: 'center', minWidth: 52,
  },
  // Число дней — Playfair: у Cormorant минускульные цифры, и «1 день» читался как опечатка.
  badgeValue: { color: colors.gold, fontFamily: fontFamily.numeral, fontSize: 18, lineHeight: 20 },
  badgeLabel: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  content: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: space.md, gap: 2 },
  chip: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  title: { color: colors.text, fontFamily: fontFamily.heading },
  meta: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2 },
  distance: { color: colors.turquoise, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small, marginTop: 2 },
})
