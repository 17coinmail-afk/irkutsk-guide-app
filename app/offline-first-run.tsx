import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useContent } from '../src/content/ContentProvider'
import { colors, space, font, radius } from '../src/theme/tokens'
export default function OfflineFirstRun() {
  const { t } = useContent()
  return (
    <View style={s.wrap}>
      <Text style={s.title}>{t('offlineTitle')}</Text>
      <Text style={s.body}>{t('offlineBody')}</Text>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: space.lg, gap: space.md },
  title: { color: colors.text, fontSize: font.sizes.xl, fontWeight: '700', textAlign: 'center' },
  body: { color: colors.textMuted, fontSize: font.sizes.md, textAlign: 'center' },
})
