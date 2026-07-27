import React from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../theme/tokens'

// Горизонтали рельефа — тихий фирменный фон под заголовками секций и цифрами.
// Кривые подобраны вручную: сгущаются книзу, как изолинии на карте берега.
const CURVES = [
  'M0 26 C 60 8, 120 44, 190 22 S 320 6, 400 30',
  'M0 48 C 70 30, 130 64, 210 44 S 330 30, 400 52',
  'M0 72 C 50 58, 140 88, 220 68 S 340 56, 400 76',
  'M0 96 C 80 84, 150 110, 240 92 S 350 82, 400 100',
  'M0 118 C 60 108, 160 130, 250 114 S 360 106, 400 120',
]

/** Декоративная подложка. Не перехватывает нажатия и не участвует в раскладке. */
export function ContourBackdrop({
  height = 140, opacity = 0.06, style,
}: {
  height?: number
  opacity?: number
  style?: StyleProp<ViewStyle>
}) {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, s.wrap, style]}>
      <Svg width="100%" height={height} viewBox="0 0 400 140" preserveAspectRatio="none" opacity={opacity}>
        {CURVES.map((d, i) => (
          <Path key={i} d={d} stroke={colors.turquoise} strokeWidth={1} fill="none" />
        ))}
      </Svg>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { overflow: 'hidden' },
})
