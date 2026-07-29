import React from 'react'
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { Press } from './Press'
import { PHOTO_BASE, type PersonPhoto } from '../content/people'
import type { Lang } from '../i18n/strings'
import { colors, font, fontFamily, radius, space } from '../theme/tokens'

const W = 232
const H = 156

/**
 * Галерея личности: портреты, памятники и дома — то, что от человека осталось в городе.
 *
 * Подпись с автором и лицензией стоит под каждым снимком, а не общей строкой внизу:
 * лицензии CC BY / CC BY-SA требуют указания автора у конкретной работы, и у разных
 * фотографий в одной галерее авторы разные. Нажатие ведёт на страницу файла —
 * это и проверяемый источник, и выполнение условия «ссылка на лицензию».
 */
export function PersonGallery({ photos, lang }: { photos: PersonPhoto[]; lang: Lang }) {
  if (!photos.length) return null
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
      style={s.scroll}
    >
      {photos.map((p) => (
        <Press key={p.file} onPress={() => void Linking.openURL(p.source)} haptic="light">
          <View style={s.item}>
            <Image
              source={{ uri: PHOTO_BASE + p.file }}
              style={s.photo}
              contentFit="cover"
              transition={220}
            />
            <Text style={s.caption} numberOfLines={2}>{p.caption[lang]}</Text>
            <Text style={s.credit} numberOfLines={1}>{p.credit}</Text>
          </View>
        </Press>
      ))}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  // Отрицательные поля: галерея едет от края до края карточки, а не внутри её отступов.
  scroll: { marginHorizontal: -space.md },
  row: { paddingHorizontal: space.md, gap: space.sm },
  item: { width: W },
  photo: {
    width: W, height: H, borderRadius: radius.md, backgroundColor: colors.surfaceAlt,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  caption: {
    color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.small,
    lineHeight: 17, marginTop: 6,
  },
  credit: {
    color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.chip,
    marginTop: 2,
  },
})
