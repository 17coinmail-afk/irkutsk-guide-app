import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, PlayfairDisplay_800ExtraBold } from '@expo-google-fonts/playfair-display'
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope'
import { ContentProvider } from '../src/content/ContentProvider'
import { FavoritesProvider } from '../src/content/FavoritesProvider'
import { colors, fontFamily } from '../src/theme/tokens'

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    [fontFamily.headingRegular]: PlayfairDisplay_400Regular,
    [fontFamily.heading]: PlayfairDisplay_700Bold,
    [fontFamily.headingBlack]: PlayfairDisplay_800ExtraBold,
    [fontFamily.body]: Manrope_400Regular,
    [fontFamily.bodyMedium]: Manrope_600SemiBold,
    [fontFamily.bodyBold]: Manrope_700Bold,
  })

  // Пока шрифты не готовы (и без ошибки) — держим пустой экран поверх системного сплэша,
  // чтобы не мигнуть системным шрифтом перед Playfair/Manrope.
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
            <Stack.Screen name="practical/phrasebook" />
            <Stack.Screen name="practical/weather" />
            <Stack.Screen name="practical/emergency" />
            <Stack.Screen name="assistant" />
            <Stack.Screen name="offline-first-run" />
          </Stack>
        </FavoritesProvider>
      </ContentProvider>
    </SafeAreaProvider>
  )
}
