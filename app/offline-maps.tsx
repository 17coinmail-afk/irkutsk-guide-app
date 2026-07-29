import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContent } from '../src/content/ContentProvider'
import { ScreenHeader } from '../src/components/ScreenHeader'
import { Press } from '../src/components/Press'
import { useOfflinePackages } from '../src/offline/useOfflinePackages'
import { formatSize, downloadProgress } from '../src/offline/packages'
import { colors, font, fontFamily, radius, space } from '../src/theme/tokens'

export default function OfflineMapsScreen() {
  const { lang, t } = useContent()
  const { manifest, local, progress, error, reload, stateOf, download, remove } = useOfflinePackages()

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScreenHeader title={t('offlineMapsTitle')} subtitle={t('offlineMapsSub')} />
      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {!manifest && !error && <Text style={s.muted}>{t('mapLoading')}</Text>}
        {/* Сбой сети — тупик без выхода: раньше здесь была только надпись,
            и повторить попытку можно было, лишь уйдя с экрана и вернувшись. */}
        {error === 'manifest' && (
          <View style={s.errorBox}>
            <Text style={s.muted}>{t('offlineMapsNoNet')}</Text>
            <Press onPress={reload} haptic="light">
              <View style={s.retryBtn}>
                <Ionicons name="refresh" size={16} color={colors.bg} />
                <Text style={s.retryTxt}>{t('retry')}</Text>
              </View>
            </Press>
          </View>
        )}

        {manifest?.packages.map((p) => {
          const state = stateOf(p)
          const pct = Math.round(downloadProgress(progress[p.id] ?? 0, 1) * 100)
          return (
            <View key={p.id} style={s.card}>
              <View style={s.head}>
                <Ionicons
                  name={state === 'ready' ? 'checkmark-circle' : 'download-outline'}
                  size={20}
                  color={state === 'ready' ? colors.turquoise : colors.textMuted}
                />
                <Text style={s.title}>{p.title[lang]}</Text>
              </View>
              <Text style={s.sub}>{p.subtitle[lang]}</Text>
              <Text style={s.size}>
                {formatSize(p.sizeBytes, lang)}
                {state === 'ready' && local[p.id] ? ` · ${t('offlineMapsSaved')} ${local[p.id].savedAt}` : ''}
              </Text>

              {state === 'downloading' && (
                <View style={s.barWrap}>
                  <View style={[s.bar, { width: `${pct}%` }]} />
                  <Text style={s.pct}>{pct}%</Text>
                </View>
              )}

              <View style={s.actions}>
                {state !== 'ready' && state !== 'downloading' && (
                  <Press onPress={() => download(p)} haptic="light">
                    <View style={s.primaryBtn}>
                      <Text style={s.primaryTxt}>
                        {state === 'outdated' ? t('offlineMapsUpdate') : t('offlineMapsDownload')}
                      </Text>
                    </View>
                  </Press>
                )}
                {state === 'ready' && (
                  <Press onPress={() => remove(p)} haptic="selection">
                    <View style={s.secondaryBtn}>
                      <Text style={s.secondaryTxt}>{t('offlineMapsDelete')}</Text>
                    </View>
                  </Press>
                )}
              </View>

              {error === p.id && <Text style={s.err}>{t('offlineMapsFailed')}</Text>}
            </View>
          )
        })}

        <Text style={s.note}>{t('offlineMapsNote')}</Text>
        {manifest && <Text style={s.attr}>{manifest.attribution}</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, paddingBottom: 96, gap: space.smd },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1,
    borderColor: colors.border, padding: space.md, gap: space.sm,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  title: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.bodyLg },
  sub: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 20 },
  size: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
  barWrap: { height: 22, justifyContent: 'center' },
  bar: { position: 'absolute', left: 0, height: 6, borderRadius: 3, backgroundColor: colors.turquoise },
  pct: { alignSelf: 'flex-end', color: colors.turquoise, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.small },
  actions: { flexDirection: 'row', gap: space.sm },
  primaryBtn: {
    backgroundColor: colors.turquoise, borderRadius: radius.pill,
    paddingHorizontal: space.lg, paddingVertical: 10,
  },
  primaryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  secondaryBtn: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill,
    paddingHorizontal: space.lg, paddingVertical: 10,
  },
  secondaryTxt: { color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.body },
  err: { color: colors.danger, fontFamily: fontFamily.body, fontSize: font.scale.small },
  muted: { color: colors.textMuted, fontFamily: fontFamily.body, textAlign: 'center', marginTop: space.lg },
  errorBox: { alignItems: 'center', gap: space.md },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: space.sm,
    backgroundColor: colors.turquoise, borderRadius: radius.pill,
    paddingHorizontal: space.lg, paddingVertical: space.smd,
  },
  retryTxt: { color: colors.bg, fontFamily: fontFamily.bodyBold, fontSize: font.scale.body },
  note: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small, lineHeight: 19, marginTop: space.sm },
  attr: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
})
