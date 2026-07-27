// «Сувениры» — что привезти с Байкала. Трёхъязычно, офлайн.
import type { Tri } from '../../lib/weather'

export interface SouvenirItem { icon: string; name: Tri; desc: Tri }

export const SOUVENIRS: SouvenirItem[] = [
  {
    icon: 'fish-outline',
    name: { ru: 'Копчёный омуль', en: 'Smoked omul', zh: '熏奥木鱼' },
    desc: {
      ru: 'В вакуумной упаковке довезёте домой. Берите на рынке в Листвянке или у проверенных продавцов.',
      en: 'Vacuum-packed, it travels well. Buy at the Listvyanka market or from trusted sellers.',
      zh: '真空包装便于携带回家。可在利斯特维扬卡市场或可靠的商家购买。',
    },
  },
  {
    icon: 'leaf-outline',
    name: { ru: 'Кедровые орехи и масло', en: 'Pine nuts & cedar oil', zh: '松子与松子油' },
    desc: {
      ru: 'Очищенные орешки, кедровое масло, живица и «грильяж» на кедре — вкусный и полезный подарок.',
      en: 'Shelled nuts, cedar-nut oil, resin and pine-nut brittle — a tasty and healthy gift.',
      zh: '去壳松子、松子油、松脂与松子酥——美味又健康的礼物。',
    },
  },
  {
    icon: 'cafe-outline',
    name: { ru: 'Травы и саган-дайля', en: 'Herbs & sagan-dayla', zh: '草药与萨根达拉' },
    desc: {
      ru: 'Горные травяные сборы Прибайкалья и знаменитый саган-дайля — компактно и ароматно.',
      en: 'Mountain herbal blends of the Baikal region and the famous sagan-dayla — compact and fragrant.',
      zh: '贝加尔地区的山地草药茶与著名的萨根达拉——小巧而芳香。',
    },
  },
  {
    icon: 'diamond-outline',
    name: { ru: 'Чароит и минералы', en: 'Charoite & minerals', zh: '紫硅碱钙石与矿石' },
    desc: {
      ru: 'Сиреневый чароит добывают только в Прибайкалье — из него делают украшения и обереги. Есть и другие сибирские самоцветы.',
      en: 'Lilac charoite is mined only in the Baikal region — worked into jewellery and amulets. Other Siberian gemstones are sold too.',
      zh: '淡紫色的紫硅碱钙石仅产于贝加尔地区，被制成首饰与护身符。也有其他西伯利亚宝石出售。',
    },
  },
  {
    icon: 'color-palette-outline',
    name: { ru: 'Изделия из кедра и бересты', en: 'Cedar & birch-bark crafts', zh: '雪松与桦树皮工艺品' },
    desc: {
      ru: 'Посуда, шкатулки и обереги из сибирского кедра и бересты ручной работы — тёплый природный сувенир.',
      en: 'Handmade tableware, boxes and charms from Siberian cedar and birch bark — a warm, natural souvenir.',
      zh: '用西伯利亚雪松与桦树皮手工制作的器皿、小盒与护符——温暖的自然纪念品。',
    },
  },
  {
    icon: 'happy-outline',
    name: { ru: 'Нерпа-сувениры', en: 'Nerpa souvenirs', zh: '海豹纪念品' },
    desc: {
      ru: 'Плюшевые байкальские нерпы, магниты и фигурки — самый обаятельный подарок детям.',
      en: 'Plush Baikal seals, magnets and figurines — the most charming gift for children.',
      zh: '毛绒贝加尔海豹、磁贴与摆件——送给孩子最可爱的礼物。',
    },
  },
  {
    icon: 'shirt-outline',
    name: { ru: 'Бурятские обереги и войлок', en: 'Buryat charms & felt', zh: '布里亚特护符与毛毡' },
    desc: {
      ru: 'Войлочные изделия, национальные узоры и обереги-хадаки отражают культуру коренных народов Прибайкалья.',
      en: 'Felt goods, national patterns and khadak charms reflect the culture of the region’s indigenous peoples.',
      zh: '毛毡制品、民族花纹与哈达护符，体现贝加尔地区原住民的文化。',
    },
  },
]
