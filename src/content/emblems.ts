import type { ImageSourcePropType } from 'react-native'

/**
 * Эмблемы раздела «Личности» — гравюра-предмет вместо портрета.
 *
 * Портретов здесь намеренно нет: сгенерировать лицо реального человека — значит
 * выдать выдуманное подобие за настоящее. Предмет судьбы («Шелихов — корабль»,
 * «Гайдай — камера») честен и работает лучше: он держит монохром и не спорит с фото мест.
 *
 * Картинки — белый штрих в альфе, поэтому цвет задаётся через tintColor,
 * а прозрачность — через opacity: одна и та же эмблема ложится на любой фон.
 */
export const EMBLEMS: Record<string, ImageSourcePropType> = {
  shelikhov: require('../../assets/emblems/shelikhov.png'),
  trubetskaya: require('../../assets/emblems/trubetskaya.png'),
  volkonsky: require('../../assets/emblems/volkonsky.png'),
  kolchak: require('../../assets/emblems/kolchak.png'),
  sukachev: require('../../assets/emblems/sukachev.png'),
  vampilov: require('../../assets/emblems/vampilov.png'),
  rasputin: require('../../assets/emblems/rasputin.png'),
  gaidai: require('../../assets/emblems/gaidai.png'),
  matsuev: require('../../assets/emblems/matsuev.png'),
}

export function emblemFor(id: string): ImageSourcePropType | undefined {
  return EMBLEMS[id]
}
