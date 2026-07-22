export type Lang = 'ru' | 'en' | 'zh'
export const LANGS: Lang[] = ['ru', 'en', 'zh']
export type UiKey =
  | 'tabPlaces' | 'tabRoutes' | 'tabMap' | 'tabMore'
  | 'filterAll' | 'secBaikal' | 'secCity'
  | 'searchPlaces' | 'hoursNote' | 'openInMaps' | 'callBtn' | 'siteBtn' | 'showOnMap'
  | 'aboutTitle' | 'aboutBody' | 'language' | 'cacheStatus'
  | 'offlineTitle' | 'offlineBody' | 'retry'

export const UI: Record<Lang, Record<UiKey, string>> = {
  ru: {
    tabPlaces: 'Места', tabRoutes: 'Маршруты', tabMap: 'Карта', tabMore: 'Ещё',
    filterAll: 'Всё', secBaikal: 'Байкал', secCity: 'Город',
    searchPlaces: 'Поиск мест', hoursNote: 'часы уточняйте', openInMaps: 'Открыть в картах', callBtn: 'Позвонить', siteBtn: 'Сайт', showOnMap: 'На карте',
    aboutTitle: 'О приложении', aboutBody: 'Карманный гид по Иркутску и Байкалу: места, маршруты и карта на трёх языках. Фото: Pexels, Wikimedia. Заведения: © OpenStreetMap.',
    language: 'Язык', cacheStatus: 'Данные',
    offlineTitle: 'Нужен интернет', offlineBody: 'Для первой загрузки гида подключитесь к интернету. Дальше приложение работает офлайн.', retry: 'Повторить',
  },
  en: {
    tabPlaces: 'Places', tabRoutes: 'Routes', tabMap: 'Map', tabMore: 'More',
    filterAll: 'All', secBaikal: 'Baikal', secCity: 'City',
    searchPlaces: 'Search places', hoursNote: 'hours may vary', openInMaps: 'Open in maps', callBtn: 'Call', siteBtn: 'Website', showOnMap: 'On map',
    aboutTitle: 'About', aboutBody: 'A pocket guide to Irkutsk and Lake Baikal: places, routes and a map in three languages. Photos: Pexels, Wikimedia. Venues: © OpenStreetMap.',
    language: 'Language', cacheStatus: 'Data',
    offlineTitle: 'Internet needed', offlineBody: 'Connect to the internet for the first load. After that the guide works offline.', retry: 'Retry',
  },
  zh: {
    tabPlaces: '景点', tabRoutes: '路线', tabMap: '地图', tabMore: '更多',
    filterAll: '全部', secBaikal: '贝加尔湖', secCity: '城市',
    searchPlaces: '搜索景点', hoursNote: '营业时间请再确认', openInMaps: '在地图中打开', callBtn: '拨打电话', siteBtn: '网站', showOnMap: '在地图上',
    aboutTitle: '关于', aboutBody: '伊尔库茨克与贝加尔湖随身向导：三语的景点、路线与地图。照片：Pexels、Wikimedia。场所：© OpenStreetMap。',
    language: '语言', cacheStatus: '数据',
    offlineTitle: '需要联网', offlineBody: '首次加载请连接网络，之后向导可离线使用。', retry: '重试',
  },
}
