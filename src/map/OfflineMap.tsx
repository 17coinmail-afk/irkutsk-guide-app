import React, { useCallback, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import { File } from 'expo-file-system'
import { buildOfflineMapHtml } from './offlineMapHtml'
import { toBase64 } from './base64'
import type { MapPoint } from './leafletHtml'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'

/**
 * Карта из скачанного пакета. WebView не умеет открывать локальный файл диапазонами,
 * поэтому байты читает приложение и отдаёт странице по её запросу.
 */
export function OfflineMap({
  file, points, line, badge, onPlacePress, onReady, style,
}: {
  file: File
  points: MapPoint[]
  line?: boolean
  badge?: string
  onPlacePress?: (slug: string) => void
  onReady?: () => void
  style?: object
}) {
  const ref = useRef<WebView>(null)

  const onMessage = useCallback((e: WebViewMessageEvent) => {
    let msg: { type?: string; id?: number; offset?: number; length?: number; slug?: string }
    try { msg = JSON.parse(e.nativeEvent.data) } catch { return }

    if (msg.type === 'place' && msg.slug) { onPlacePress?.(msg.slug); return }
    if (msg.type === 'ready') { onReady?.(); return }
    if (msg.type !== 'pmtiles' || msg.id == null) return

    const { id, offset = 0, length = 0 } = msg
    try {
      const handle = file.open()
      try {
        handle.offset = offset
        const bytes = handle.readBytes(length)
        ref.current?.injectJavaScript(`window.__pmtilesRespond(${id}, "${toBase64(bytes)}");true;`)
      } finally {
        handle.close()
      }
    } catch {
      ref.current?.injectJavaScript(`window.__pmtilesFail(${id});true;`)
    }
  }, [file, onPlacePress, onReady])

  return (
    <View style={[s.wrap, style]}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html: buildOfflineMapHtml(points, { line }) }}
        style={s.web}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
      />
      {badge ? (
        <View style={s.badge} pointerEvents="none">
          <Text style={s.badgeTxt}>{badge}</Text>
        </View>
      ) : null}
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  web: { flex: 1, backgroundColor: colors.bg },
  badge: {
    position: 'absolute', left: space.md, top: space.md,
    backgroundColor: 'rgba(7,12,18,0.78)', borderRadius: radius.pill,
    paddingHorizontal: space.smd, paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderSoft,
  },
  badgeTxt: {
    color: colors.turquoise, fontFamily: fontFamily.bodyMedium,
    fontSize: font.scale.chip, textTransform: 'uppercase', letterSpacing: 0.8,
  },
})
