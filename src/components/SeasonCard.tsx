import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { colors, font, fontFamily, radius, shadow, space } from '../theme/tokens'
import { GradientOverlay } from './GradientOverlay'
import { Skeleton } from './Skeleton'

export function SeasonCard({
  title,
  caption,
  photoUrl,
  onPress,
  width,
}: {
  title: string
  caption: string
  photoUrl: string | null
  onPress?: () => void
  width: number
}) {
  const [loaded, setLoaded] = useState(false)
  const Wrapper = onPress ? Pressable : View
  return (
    <Wrapper onPress={onPress} style={[s.card, { width }]}>
      <View style={StyleSheet.absoluteFill}>
        {!loaded && <Skeleton style={StyleSheet.absoluteFill} radius={radius.photo} />}
        {photoUrl ? (
          <Image source={photoUrl} style={StyleSheet.absoluteFill} contentFit="cover" transition={280} cachePolicy="memory-disk" onLoad={() => setLoaded(true)} />
        ) : null}
      </View>
      <GradientOverlay variant="photo" />
      <View style={s.content}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.caption}>{caption}</Text>
      </View>
    </Wrapper>
  )
}

const s = StyleSheet.create({
  card: { height: 132, borderRadius: radius.photo, overflow: 'hidden', backgroundColor: colors.surfaceAlt, ...shadow.card },
  content: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: space.md },
  title: { color: colors.text, fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
  caption: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small, marginTop: 2 },
})
