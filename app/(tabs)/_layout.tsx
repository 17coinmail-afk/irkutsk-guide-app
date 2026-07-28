import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { GlassTabBar } from '../../src/components/GlassTabBar'
import { colors, font, fontFamily } from '../../src/theme/tokens'

export default function TabsLayout() {
  const { t } = useContent()
  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { fontFamily: fontFamily.heading, fontSize: font.scale.h2 },
        headerTintColor: colors.text,
        // Дефолтная разделительная линия рисуется светлой и в почти чёрной палитре
        // читается как случайная белая черта под заголовком.
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('tabHome'), headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="places" options={{ title: t('tabPlaces'), headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="routes" options={{ title: t('tabRoutes'), tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="map" options={{ title: t('tabMap'), headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="navigate-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="trip" options={{ title: t('tabTrip'), tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: t('tabMore'), tabBarIcon: ({ color, size }) => <Ionicons name="ellipsis-horizontal" color={color} size={size} /> }} />
    </Tabs>
  )
}
