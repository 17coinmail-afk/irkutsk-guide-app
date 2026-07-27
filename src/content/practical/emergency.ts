// Экстренные контакты. Номера — единые для РФ; консульство КНР важно для zh-туристов.
import type { Tri } from '../../lib/weather'

export interface EmergencyContact {
  id: string
  icon: string
  tel: string // номер для набора (Linking tel:)
  label: Tri
  desc: Tri
}

export const EMERGENCY: EmergencyContact[] = [
  {
    id: '112',
    icon: 'alert-circle-outline',
    tel: '112',
    label: { ru: '112 — единая служба', en: '112 — single emergency line', zh: '112 — 统一紧急电话' },
    desc: {
      ru: 'Единый номер спасения. Работает без денег на счёте и без SIM. Отвечают на русском.',
      en: 'One number for all emergencies. Works with no balance and without a SIM. Russian-speaking operators.',
      zh: '统一救援号码。无话费、无 SIM 卡也可拨打。接线员讲俄语。',
    },
  },
  {
    id: '103',
    icon: 'medkit-outline',
    tel: '103',
    label: { ru: '103 — скорая помощь', en: '103 — ambulance', zh: '103 — 救护车' },
    desc: {
      ru: 'Медицинская экстренная помощь.',
      en: 'Medical emergency.',
      zh: '医疗急救。',
    },
  },
  {
    id: '101',
    icon: 'flame-outline',
    tel: '101',
    label: { ru: '101 — пожарная / МЧС', en: '101 — fire & rescue', zh: '101 — 消防救援' },
    desc: {
      ru: 'Пожар, спасатели, ЧС.',
      en: 'Fire, rescue, emergencies.',
      zh: '火灾、救援、突发事件。',
    },
  },
  {
    id: '102',
    icon: 'shield-outline',
    tel: '102',
    label: { ru: '102 — полиция', en: '102 — police', zh: '102 — 警察' },
    desc: {
      ru: 'Полиция.',
      en: 'Police.',
      zh: '警察。',
    },
  },
  {
    id: 'consulate-cn',
    icon: 'flag-outline',
    tel: '+73952789023',
    label: { ru: 'Генконсульство КНР в Иркутске', en: 'Consulate General of China in Irkutsk', zh: '中国驻伊尔库茨克总领事馆' },
    desc: {
      ru: 'Для граждан КНР: помощь при утере паспорта и в других ситуациях. Уточните актуальный номер на сайте консульства.',
      en: 'For Chinese citizens: help with lost passports and other issues. Verify the current number on the consulate website.',
      zh: '面向中国公民：护照遗失等情况的协助。请在领事馆官网核对最新电话。',
    },
  },
]
