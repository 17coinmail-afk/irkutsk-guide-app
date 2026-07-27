// Роли цвета (редизайн v3): бирюза — ТОЛЬКО интерактив (активная вкладка/чип, ссылка),
// золото — ТОЛЬКО смысловой акцент (истории, «в поездку»). Фон глубже, поверхности двух уровней.
export const colors = {
  bg: '#070c12',          // abyss
  surface: '#111a23',
  surfaceAlt: '#17232e',
  turquoise: '#3fd0c9',   // акцент-бирюза
  gold: '#e2b857',        // золото деталей
  text: '#eaf2f5',
  textMuted: '#9fb3bd',
  textDim: '#6b8290',
  border: '#22323f',
  borderSoft: '#1a2732',
  danger: '#e2685a',
} as const
export const space = { xs: 4, sm: 8, smd: 12, md: 16, lg: 24, xl: 40 } as const
export const radius = { sm: 8, md: 14, card: 18, lg: 22, photo: 22, sheet: 28, pill: 999 } as const

// Шрифт-семейства: подключаются через useFonts (@expo-google-fonts) в app/_layout.tsx.
// Playfair Display — заголовки/герой (serif, дорого). Manrope — текст/чипы/подписи.
export const fontFamily = {
  heading: 'PlayfairDisplay_700Bold',
  headingBlack: 'PlayfairDisplay_800ExtraBold',
  headingRegular: 'PlayfairDisplay_400Regular',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
} as const

export const font = {
  // существующая шкала (не трогаем — используется в текущих экранах/компонентах)
  sizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 28, xxl: 34 },
  weight: { regular: '400', medium: '600', bold: '700' },
  // шкала редизайна v3: контраст крупнее, eyebrow мельче (капс + трекинг компенсируют)
  scale: { chip: 11, small: 13, body: 15, bodyLg: 16, h2: 20, h1: 28, hero: 40 },
  family: fontFamily,
} as const

// Градиенты для читаемости текста поверх фото (снизу вверх, тёмный → прозрачный)
export const gradients = {
  photoOverlay: ['rgba(7,12,18,0)', 'rgba(7,12,18,0.55)', 'rgba(7,12,18,0.94)'],
  heroOverlay: ['rgba(7,12,18,0.05)', 'rgba(7,12,18,0.35)', 'rgba(7,12,18,0.98)'],
  scrim: ['rgba(7,12,18,0)', 'rgba(7,12,18,0.85)'],
  // Кромки GlowCard: светятся в начале и растворяются к концу — «свет с одной стороны».
  iceEdge: ['#3fd0c9', '#9fe8e4', 'rgba(63,208,201,0)'],
  goldEdge: ['#e2b857', '#f2dfae', 'rgba(226,184,87,0)'],
} as const

// Мягкие тени под карточками + лёгкое бирюзовое свечение на активных элементах
export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  glow: {
    shadowColor: colors.turquoise,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
} as const
