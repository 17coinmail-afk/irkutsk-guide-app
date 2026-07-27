import type { Lang } from './strings'

// Категории мест, кухни заведений и темы маршрутов приходят из ContentPack ключами
// (`nature`, `coffee`, `classic`). Пользователю показываем человеческие подписи.

type Tri = Record<Lang, string>

const CATEGORY: Record<string, Tri> = {
  nature: { ru: 'Природа', en: 'Nature', zh: '自然' },
  museum: { ru: 'Музей', en: 'Museum', zh: '博物馆' },
  food: { ru: 'Еда', en: 'Food', zh: '美食' },
  walk: { ru: 'Прогулка', en: 'Walk', zh: '漫步' },
  culture: { ru: 'Культура', en: 'Culture', zh: '文化' },
  fun: { ru: 'Развлечение', en: 'Fun', zh: '娱乐' },
  wildlife: { ru: 'Природа Байкала', en: 'Wildlife', zh: '贝加尔生灵' },
  city: { ru: 'Город', en: 'City', zh: '城市' },
  lodging: { ru: 'Ночлег', en: 'Stay', zh: '住宿' },
  activity: { ru: 'Активный отдых', en: 'Active', zh: '户外活动' },
  other: { ru: 'Место', en: 'Place', zh: '地点' },
}

const CUISINE: Record<string, Tri> = {
  coffee: { ru: 'Кофейня', en: 'Coffee', zh: '咖啡馆' },
  russian: { ru: 'Русская кухня', en: 'Russian', zh: '俄式菜' },
  asian: { ru: 'Азиатская', en: 'Asian', zh: '亚洲菜' },
  buryat: { ru: 'Бурятская', en: 'Buryat', zh: '布里亚特菜' },
  euro: { ru: 'Ресторан', en: 'Restaurant', zh: '餐厅' },
  bar: { ru: 'Бар / паб', en: 'Bar / pub', zh: '酒吧' },
  fast: { ru: 'Фастфуд', en: 'Fast food', zh: '快餐' },
}

const THEME: Record<string, Tri> = {
  classic: { ru: 'Классика', en: 'Classic', zh: '经典' },
  gastro: { ru: 'Гастро', en: 'Food trip', zh: '美食' },
  ice: { ru: 'Лёд', en: 'Ice', zh: '冰上' },
  summer: { ru: 'Лето', en: 'Summer', zh: '夏季' },
  family: { ru: 'С детьми', en: 'Family', zh: '亲子' },
  spiritual: { ru: 'Духовный', en: 'Spiritual', zh: '灵性' },
  museum: { ru: 'Музеи', en: 'Museums', zh: '博物馆' },
  walk: { ru: 'Пешком', en: 'On foot', zh: '徒步' },
  nature: { ru: 'Природа', en: 'Nature', zh: '自然' },
  active: { ru: 'Активный', en: 'Active', zh: '户外' },
  olkhon: { ru: 'Ольхон', en: 'Olkhon', zh: '奥尔洪' },
  kbzh: { ru: 'КБЖД', en: 'Circum-Baikal', zh: '环贝加尔铁路' },
}

const DIFFICULTY: Record<string, Tri> = {
  easy: { ru: 'легко', en: 'easy', zh: '轻松' },
  moderate: { ru: 'средне', en: 'moderate', zh: '中等' },
  hard: { ru: 'сложно', en: 'hard', zh: '有挑战' },
}

function lookup(table: Record<string, Tri>, key: string | null | undefined, lang: Lang): string {
  if (!key) return ''
  const row = table[key]
  return row ? row[lang] : key
}

export function categoryLabel(key: string | null | undefined, lang: Lang): string {
  return lookup(CATEGORY, key, lang)
}
export function cuisineLabel(key: string | null | undefined, lang: Lang): string {
  return lookup(CUISINE, key, lang)
}
export function themeLabel(key: string | null | undefined, lang: Lang): string {
  return lookup(THEME, key, lang)
}
export function difficultyLabel(key: string | null | undefined, lang: Lang): string {
  return lookup(DIFFICULTY, key, lang)
}

/** Подпись для карточки места: у заведений точнее кухня, у остальных — категория. */
export function placeChipLabel(
  place: { category: string; cuisine?: string | null },
  lang: Lang,
): string {
  if (place.category === 'food' && place.cuisine) return cuisineLabel(place.cuisine, lang)
  return categoryLabel(place.category, lang)
}

export const LABEL_TABLES = { CATEGORY, CUISINE, THEME, DIFFICULTY }
