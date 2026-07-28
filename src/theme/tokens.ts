// Палитра v4 «почти монохром»: цвета нет вообще, роли держатся на контрасте.
// turquoise → белый лёд: ТОЛЬКО интерактив (активная вкладка/чип, ссылка).
// gold → холодная сталь: ТОЛЬКО смысловой акцент (истории, «в поездку»).
// Имена ключей сохранены намеренно — по ним расставлены роли во всех экранах.
export const colors = {
  bg: '#06080a',          // почти чёрный с холодным уклоном
  surface: '#0c0f13',
  surfaceAlt: '#12161b',
  // Акцент интерактива — сам белый: в монохроме цвет не выделяет, выделяет контраст.
  turquoise: '#e8eef4',
  // Смысловой акцент (истории, «в поездку») — холодная сталь, тише белого.
  gold: '#a9bccd',
  text: '#f2f5f8',
  textMuted: '#b9c2cb',
  textDim: '#727b85',
  border: '#171c22',
  borderSoft: '#11151a',
  // Опасность остаётся различимой: это про лёд и безопасность, приглушать нельзя.
  danger: '#d9736a',
} as const
export const space = { xs: 4, sm: 8, smd: 12, md: 16, lg: 24, xl: 40 } as const
export const radius = { sm: 8, md: 14, card: 18, lg: 22, photo: 22, sheet: 28, pill: 999 } as const

// Шрифт-семейства: подключаются через useFonts (@expo-google-fonts) в app/_layout.tsx.
// Cormorant Garamond — заголовки/герой: тонкий контрастный serif с кириллицей.
// Playfair — только цифры: у Cormorant минускульные, в статистике они проваливаются.
// Manrope — текст/чипы/подписи.
export const fontFamily = {
  heading: 'CormorantGaramond_600SemiBold',
  headingBlack: 'CormorantGaramond_700Bold',
  headingRegular: 'CormorantGaramond_400Regular',
  numeral: 'PlayfairDisplay_700Bold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
} as const

export const font = {
  // существующая шкала (не трогаем — используется в текущих экранах/компонентах)
  sizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 28, xxl: 34 },
  weight: { regular: '400', medium: '600', bold: '700' },
  // шкала редизайна v3: контраст крупнее, eyebrow мельче (капс + трекинг компенсируют)
  scale: { chip: 11, small: 13, body: 15, bodyLg: 16, h2: 22, h1: 32, hero: 46 },
  family: fontFamily,
} as const

// Градиенты для читаемости текста поверх фото (снизу вверх, тёмный → прозрачный)
export const gradients = {
  photoOverlay: ['rgba(7,12,18,0)', 'rgba(7,12,18,0.55)', 'rgba(7,12,18,0.94)'],
  heroOverlay: ['rgba(7,12,18,0.05)', 'rgba(7,12,18,0.35)', 'rgba(7,12,18,0.98)'],
  scrim: ['rgba(7,12,18,0)', 'rgba(7,12,18,0.85)'],
  // Кромки GlowCard: светятся в начале и растворяются к концу — «свет с одной стороны».
  iceEdge: ['#f2f5f8', '#cfd8e0', 'rgba(242,245,248,0)'],
  goldEdge: ['#cfd8e0', '#8fa3b4', 'rgba(207,216,224,0)'],
} as const

// Мягкие тени под карточками; свечения цветом больше нет — только глубина
export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  glow: {
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
} as const
