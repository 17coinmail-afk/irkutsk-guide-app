import React from 'react'
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme/tokens'
import { useFavorites } from '../content/FavoritesProvider'
import type { FavKind } from '../lib/favorites'
export function FavHeart({ kind, slug, size = 22, style }: { kind: FavKind; slug: string; size?: number; style?: StyleProp<ViewStyle> }) {
  const { isFavorite, toggleFav } = useFavorites()
  const on = isFavorite(kind, slug)
  return (
    <Pressable hitSlop={10} onPress={(e) => { e.stopPropagation?.(); toggleFav(kind, slug) }} style={[s.btn, style]}>
      <Ionicons name={on ? 'heart' : 'heart-outline'} size={size} color={on ? colors.gold : colors.text} />
    </Pressable>
  )
}
const s = StyleSheet.create({ btn: { padding: 6, backgroundColor: 'rgba(10,15,22,0.5)', borderRadius: 999 } })
