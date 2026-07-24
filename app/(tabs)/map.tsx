import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Location from 'expo-location'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { buildMapHtml, type MapPoint } from '../../src/map/leafletHtml'
import { colors, radius, space, font, fontFamily, shadow } from '../../src/theme/tokens'

export default function MapTab() {
  const { pack, lang, t } = useContent()
  const router = useRouter()
  // Опциональный фокус, переданный из детали места («показать на карте»): /map?flat=..&flng=..
  const { flat, flng } = useLocalSearchParams<{ flat?: string; flng?: string }>()
  const ref = useRef<WebView>(null)
  const [mapLoading, setMapLoading] = useState(true)

  const html = useMemo(() => {
    const points: MapPoint[] = (pack?.data.places ?? []).map((p) => ({
      lng: p.lng, lat: p.lat, slug: p.slug, title: p.translations[lang].title, city: p.section === 'city',
    }))
    return buildMapHtml(points)
  }, [pack, lang])

  const onMessage = useCallback((e: { nativeEvent: { data: string } }) => {
    const slug = e.nativeEvent.data
    if (slug) router.push(`/place/${slug}`)
  }, [router])

  // Когда пришли из детали места с координатами — центрируем карту (глобальная переменная
  // `map` в leafletHtml.ts доступна из инжектируемого JS, т.к. объявлена через var в скрипте страницы).
  useEffect(() => {
    if (mapLoading || !flat || !flng) return
    ref.current?.injectJavaScript(`map.setView([${flat},${flng}],13);true;`)
  }, [flat, flng, mapLoading])

  const locate = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      const pos = await Location.getCurrentPositionAsync({})
      ref.current?.injectJavaScript(`window.__locate(${pos.coords.latitude},${pos.coords.longitude});true;`)
    } catch {}
  }, [])

  return (
    <View style={s.wrap}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html }}
        style={s.map}
        onMessage={onMessage}
        onLoadEnd={() => setMapLoading(false)}
        javaScriptEnabled
        domStorageEnabled
      />
      {mapLoading && (
        <View style={s.loader} pointerEvents="none">
          <ActivityIndicator color={colors.turquoise} size="large" />
          <Text style={s.loaderTxt}>{t('mapLoading')}</Text>
        </View>
      )}
      <Pressable style={s.locBtn} onPress={locate}>
        <Ionicons name="navigate" size={16} color={colors.turquoise} />
        <Text style={s.locTxt}>{t('myLocation')}</Text>
      </Pressable>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  map: { flex: 1, backgroundColor: colors.bg },
  loader: { ...StyleSheet.absoluteFill, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: space.sm },
  loaderTxt: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body },
  locBtn: {
    position: 'absolute', right: space.md, bottom: space.lg, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.pill,
    paddingHorizontal: space.md, paddingVertical: space.sm, ...shadow.card,
  },
  locTxt: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small },
})
