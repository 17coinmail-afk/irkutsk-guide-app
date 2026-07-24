export const colors = {
  bg: '#0a0f16',          // abyss
  surface: '#121a24',
  surfaceAlt: '#182430',
  turquoise: '#3fd0c9',   // акцент-бирюза
  gold: '#e2b857',        // золото деталей
  text: '#eaf2f5',
  textMuted: '#9fb3bd',
  textDim: '#6b8290',
  border: '#243441',
  danger: '#e2685a',
} as const
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const
export const radius = { sm: 8, md: 14, lg: 22, pill: 999, photo: 20 } as const

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
  // расширенная шкала под редизайн (бриф: hero 34–40, h1 26, h2 20, body 15–16, small 13, chip 12 uppercase ls1)
  scale: { chip: 12, small: 13, body: 15, bodyLg: 16, h2: 20, h1: 26, hero: 36 },
  family: fontFamily,
} as const

// Градиенты для читаемости текста поверх фото (снизу вверх, тёмный → прозрачный)
export const gradients = {
  photoOverlay: ['rgba(10,15,22,0)', 'rgba(10,15,22,0.55)', 'rgba(10,15,22,0.94)'],
  heroOverlay: ['rgba(10,15,22,0.05)', 'rgba(10,15,22,0.35)', 'rgba(10,15,22,0.98)'],
  scrim: ['rgba(10,15,22,0)', 'rgba(10,15,22,0.85)'],
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
