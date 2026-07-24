import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { colors } from '../../src/theme/tokens'
export default function TabsLayout() {
  const { t } = useContent()
  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border }, tabBarActiveTintColor: colors.turquoise, tabBarInactiveTintColor: colors.textMuted }}>
      <Tabs.Screen name="index" options={{ title: t('tabPlaces'), tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="routes" options={{ title: t('tabRoutes'), tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="map" options={{ title: t('tabMap'), tabBarIcon: ({ color, size }) => <Ionicons name="navigate-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="trip" options={{ title: t('tabTrip'), tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: t('tabMore'), tabBarIcon: ({ color, size }) => <Ionicons name="ellipsis-horizontal" color={color} size={size} /> }} />
    </Tabs>
  )
}
