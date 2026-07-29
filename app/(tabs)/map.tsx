import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Location from 'expo-location'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { buildMapHtml, type MapPoint } from '../../src/map/leafletHtml'
import { OfflineMap } from '../../src/map/OfflineMap'
import { useOfflinePackages } from '../../src/offline/useOfflinePackages'
import { packageForPoint } from '../../src/offline/packages'
import { packageFile } from '../../src/offline/useOfflinePackages'
import { colors, radius, space, font, fontFamily, shadow } from '../../src/theme/tokens'

export default function MapTab() {
  const { pack, lang, t } = useContent()
  const router = useRouter()
  // Опциональный фокус, переданный из детали места («показать на карте»): /map?flat=..&flng=..
  const { flat, flng } = useLocalSearchParams<{ flat?: string; flng?: string }>()
  const ref = useRef<WebView>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapFailed, setMapFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const { manifest, readyIds } = useOfflinePackages()

  // Крутилка снималась только по событию готовности. Если оно не приходило —
  // например, WebView не поднялся или тайлы недоступны, — экран крутился вечно,
  // без объяснения и без выхода. Пятнадцать секунд, дальше честная ошибка и «Повторить».
  useEffect(() => {
    if (!mapLoading) return
    const id = setTimeout(() => { setMapLoading(false); setMapFailed(true) }, 15000)
    return () => clearTimeout(id)
  }, [mapLoading, attempt])

  const retryMap = useCallback(() => {
    setMapFailed(false)
    setMapLoading(true)
    setAttempt((n) => n + 1)
  }, [])

  const points: MapPoint[] = useMemo(() => (pack?.data.places ?? []).map((p) => ({
    lng: p.lng, lat: p.lat, slug: p.slug, title: p.translations[lang].title, city: p.section === 'city',
  })), [pack, lang])

  const html = useMemo(() => buildMapHtml(points), [points])

  // Есть скачанный пакет, покрывающий центр региона — рисуем офлайн-карту.
  // Нет — молча остаёмся на прежней онлайн-карте, пользователь не остаётся с пустым экраном.
  const offlinePack = useMemo(() => {
    if (!manifest) return null
    const focus = flat && flng ? { lat: Number(flat), lng: Number(flng) } : { lat: 52.29, lng: 104.3 }
    return packageForPoint(manifest.packages, readyIds, focus.lat, focus.lng)
  }, [manifest, readyIds, flat, flng])

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
      {offlinePack ? (
        <OfflineMap
          file={packageFile(offlinePack.id)}
          points={points}
          badge={t('offlineBadge')}
          onPlacePress={(slug) => router.push(`/place/${slug}`)}
          onReady={() => setMapLoading(false)}
          style={s.map}
        />
      ) : (
      <WebView
        key={attempt}
        ref={ref}
        originWhitelist={['*']}
        source={{ html }}
        style={s.map}
        onMessage={onMessage}
        onLoadEnd={() => setMapLoading(false)}
        onError={() => { setMapLoading(false); setMapFailed(true) }}
        javaScriptEnabled
        domStorageEnabled
      />
      )}
      {mapLoading && (
        <View style={s.loader} pointerEvents="none">
          <ActivityIndicator color={colors.turquoise} size="large" />
          <Text style={s.loaderTxt}>{t('mapLoading')}</Text>
        </View>
      )}
      {mapFailed && (
        <View style={s.loader}>
          <Ionicons name="cloud-offline-outline" size={34} color={colors.textDim} />
          <Text style={s.failedTxt}>{t('mapFailed')}</Text>
          <Pressable style={s.retryBtn} onPress={retryMap}>
            <Ionicons name="refresh" size={16} color={colors.bg} />
            <Text style={s.retryTxt}>{t('retry')}</Text>
          </Pressable>
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
  failedTxt: {
    color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body,
    textAlign: 'center', lineHeight: 22, paddingHorizontal: space.xl, marginBottom: space.sm,
  },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: space.sm,
    backgroundColor: colors.turquoise, borderRadius: radius.pill,
    paddingHorizontal: space.lg, paddingVertical: space.smd,
  },
  retryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  locBtn: {
    position: 'absolute', right: space.md, bottom: space.lg, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.pill,
    paddingHorizontal: space.md, paddingVertical: space.sm, ...shadow.card,
  },
  locTxt: { color: colors.turquoise, fontFamily: fontFamily.bodyBold, fontSize: font.scale.small },
})
