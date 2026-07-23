import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ContentProvider } from '../src/content/ContentProvider'
import { FavoritesProvider } from '../src/content/FavoritesProvider'
import { colors } from '../src/theme/tokens'
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ContentProvider>
        <FavoritesProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.bg } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="place/[slug]" options={{ title: '' }} />
            <Stack.Screen name="route/[slug]" options={{ title: '' }} />
            <Stack.Screen name="offline-first-run" options={{ headerShown: false }} />
          </Stack>
        </FavoritesProvider>
      </ContentProvider>
    </SafeAreaProvider>
  )
}
