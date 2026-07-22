import type { ExpoConfig, ConfigContext } from 'expo/config'

// Динамический конфиг: берёт статику из app.json и подставляет Google Maps API-ключ
// из окружения сборки (EAS-секрет GOOGLE_MAPS_API_KEY). Локально/без ключа — пустая строка
// (карта на Android будет пустой, остальное приложение работает).
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'Irkutsk Guide',
  slug: config.slug ?? 'irkutsk-guide',
  android: {
    ...config.android,
    config: {
      ...config.android?.config,
      googleMaps: { apiKey: process.env.GOOGLE_MAPS_API_KEY ?? '' },
    },
  },
})
