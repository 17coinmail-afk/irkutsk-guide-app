import React from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useContent } from '../../src/content/ContentProvider'
import { ScreenHeader } from '../../src/components/ScreenHeader'
import { PHRASEBOOK } from '../../src/content/practical/phrasebook'
import { pick } from '../../src/lib/weather'
import { colors, space, font, fontFamily, radius } from '../../src/theme/tokens'

export default function Phrasebook() {
  const { t, lang } = useContent()
  const sections = PHRASEBOOK.map((c) => ({ key: c.id, icon: c.icon, title: pick(c.title, lang), data: c.phrases }))
  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('modPhrasebook')} subtitle={t('modPhrasebookSub')} />
      <SectionList
        sections={sections}
        keyExtractor={(item, i) => item.ru + i}
        contentContainerStyle={s.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={s.secHead}>
            <Ionicons name={section.icon as any} size={16} color={colors.turquoise} />
            <Text style={s.secTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={s.row}>
            <Text style={s.ru}>{item.ru}</Text>
            <Text style={s.translit}>{item.translit}</Text>
            {lang !== 'ru' && <Text style={s.meaning}>{lang === 'zh' ? item.zh : item.en}</Text>}
          </View>
        )}
      />
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, paddingBottom: space.xl },
  secHead: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.lg, marginBottom: space.sm },
  secTitle: { color: colors.gold, fontFamily: fontFamily.bodyBold, fontSize: font.scale.chip, letterSpacing: 1, textTransform: 'uppercase' },
  row: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: space.md, marginBottom: space.sm, gap: 2 },
  ru: { color: colors.text, fontFamily: fontFamily.bodyBold, fontSize: font.scale.h2 },
  translit: { color: colors.turquoise, fontFamily: fontFamily.body, fontSize: font.scale.body, fontStyle: 'italic' },
  meaning: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, marginTop: 2 },
})
