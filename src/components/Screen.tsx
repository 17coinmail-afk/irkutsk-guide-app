import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/tokens'
export function Screen({ children, scroll = false }: { children: React.ReactNode; scroll?: boolean }) {
  const Body = scroll ? ScrollView : View
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Body style={s.body} contentContainerStyle={scroll ? s.content : undefined}>{children}</Body>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 40 },
})
