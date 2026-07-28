import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display'
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond'
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope'
import { ContentProvider } from '../src/content/ContentProvider'
import { FavoritesProvider } from '../src/content/FavoritesProvider'
import { colors, fontFamily } from '../src/theme/tokens'

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    [fontFamily.headingRegular]: CormorantGaramond_400Regular,
    [fontFamily.heading]: CormorantGaramond_600SemiBold,
    [fontFamily.headingBlack]: CormorantGaramond_700Bold,
    [fontFamily.numeral]: PlayfairDisplay_700Bold,
    [fontFamily.body]: Manrope_400Regular,
    [fontFamily.bodyMedium]: Manrope_600SemiBold,
    [fontFamily.bodyBold]: Manrope_700Bold,
  })

  // Пока шрифты не готовы (и без ошибки) — держим пустой экран поверх системного сплэша,
  // чтобы не мигнуть системным шрифтом перед Cormorant/Manrope.
  if (!fontsLoaded && !fontsError) return null

  return (
    <SafeAreaProvider>
      <ContentProvider>
        <FavoritesProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="place/[slug]" />
            <Stack.Screen name="route/[slug]" />
            <Stack.Screen name="practical/index" />
            <Stack.Screen name="practical/getting-there" />

            <Stack.Screen name="practical/transport" />
            <Stack.Screen name="practical/phrasebook" />
            <Stack.Screen name="practical/weather" />
            <Stack.Screen name="practical/emergency" />
            <Stack.Screen name="practical/cuisine" />
            <Stack.Screen name="practical/souvenirs" />
            <Stack.Screen name="practical/events" />
            <Stack.Screen name="assistant" />
            <Stack.Screen name="offline-maps" />
            <Stack.Screen name="city-story" />
            <Stack.Screen name="people" />
            <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
            <Stack.Screen name="offline-first-run" />
          </Stack>
        </FavoritesProvider>
      </ContentProvider>
    </SafeAreaProvider>
  )
}
