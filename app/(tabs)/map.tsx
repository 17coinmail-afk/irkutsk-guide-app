import React, { useRef, useMemo, useCallback } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { buildMapHtml, type MapPoint } from '../../src/map/leafletHtml'
import { colors, radius, space, font } from '../../src/theme/tokens'

export default function MapTab() {
  const { pack, lang, t } = useContent()
  const router = useRouter()
  const ref = useRef<WebView>(null)

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
      <WebView ref={ref} originWhitelist={['*']} source={{ html }} style={s.map} onMessage={onMessage} javaScriptEnabled domStorageEnabled />
      <Pressable style={s.locBtn} onPress={locate}><Text style={s.locTxt}>◎ {t('myLocation')}</Text></Pressable>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  map: { flex: 1, backgroundColor: colors.bg },
  locBtn: { position: 'absolute', right: space.md, bottom: space.lg, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: space.sm },
  locTxt: { color: colors.turquoise, fontSize: font.sizes.sm, fontWeight: '700' },
})
