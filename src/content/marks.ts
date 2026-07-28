import type { ImageSourcePropType } from 'react-native'

/**
 * Знаки разделов — гравюры в том же языке, что и эмблемы личностей.
 *
 * Заменяют родовые Ionicons там, где иконка ничего не сообщала: «автобус» одинаков
 * в любом городе мира, а паровоз в портале тоннеля — это Кругобайкалка и больше ничей.
 * Белый штрих в альфе: тон задаётся opacity, поэтому один файл работает на любом фоне.
 */
export const MARKS = {
  babr: require('../../assets/marks/babr.png'),
  nerpa: require('../../assets/marks/nerpa.png'),
  shamanka: require('../../assets/marks/shamanka.png'),
  larch: require('../../assets/marks/larch.png'),
  ice: require('../../assets/marks/ice.png'),
  train: require('../../assets/marks/train.png'),
  ferry: require('../../assets/marks/ferry.png'),
  buuzy: require('../../assets/marks/buuzy.png'),
  omul: require('../../assets/marks/omul.png'),
  nalichnik: require('../../assets/marks/nalichnik.png'),
  phrasebook: require('../../assets/marks/phrasebook.png'),
  events: require('../../assets/marks/events.png'),
  emergency: require('../../assets/marks/emergency.png'),
} satisfies Record<string, ImageSourcePropType>

export type MarkKey = keyof typeof MARKS
