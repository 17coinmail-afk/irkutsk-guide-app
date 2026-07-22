import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// Временный стартовый экран скаффолда Task 1.
// Реальные вкладки и провайдер контента появятся в Task 7-8.
export default function Placeholder() {
  return (
    <View style={s.wrap}>
      <Text style={s.text}>Irkutsk Guide</Text>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: '700' },
})
