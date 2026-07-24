export type Lang = 'ru' | 'en' | 'zh'
export const LANGS: Lang[] = ['ru', 'en', 'zh']
export type UiKey =
  | 'tabPlaces' | 'tabRoutes' | 'tabMap' | 'tabMore'
  | 'filterAll' | 'secBaikal' | 'secCity'
  | 'searchPlaces' | 'hoursNote' | 'openInMaps' | 'callBtn' | 'siteBtn' | 'showOnMap'
  | 'aboutTitle' | 'aboutBody' | 'language' | 'cacheStatus'
  | 'offlineTitle' | 'offlineBody' | 'retry'
  | 'tabTrip' | 'myLocation' | 'nearbyToggle' | 'tripPlacesTitle' | 'tripRoutesTitle' | 'tripEmpty'

export const UI: Record<Lang, Record<UiKey, string>> = {
  ru: {
    tabPlaces: 'Места', tabRoutes: 'Маршруты', tabMap: 'Карта', tabMore: 'Ещё',
    filterAll: 'Всё', secBaikal: 'Байкал', secCity: 'Город',
    searchPlaces: 'Поиск мест', hoursNote: 'часы уточняйте', openInMaps: 'Открыть в картах', callBtn: 'Позвонить', siteBtn: 'Сайт', showOnMap: 'На карте',
    aboutTitle: 'О приложении', aboutBody: 'Карманный гид по Иркутску и Байкалу: места, маршруты и карта на трёх языках. Фото: Pexels, Wikimedia. Заведения: © OpenStreetMap.',
    language: 'Язык', cacheStatus: 'Данные',
    offlineTitle: 'Нужен интернет', offlineBody: 'Для первой загрузки гида подключитесь к интернету. Дальше приложение работает офлайн.', retry: 'Повторить',
    tabTrip: 'Поездка', myLocation: 'Я', nearbyToggle: 'Рядом',
    tripPlacesTitle: 'Сохранённые места', tripRoutesTitle: 'Сохранённые маршруты',
    tripEmpty: 'Отмечайте места и маршруты сердечком — они появятся здесь.',
  },
  en: {
    tabPlaces: 'Places', tabRoutes: 'Routes', tabMap: 'Map', tabMore: 'More',
    filterAll: 'All', secBaikal: 'Baikal', secCity: 'City',
    searchPlaces: 'Search places', hoursNote: 'hours may vary', openInMaps: 'Open in maps', callBtn: 'Call', siteBtn: 'Website', showOnMap: 'On map',
    aboutTitle: 'About', aboutBody: 'A pocket guide to Irkutsk and Lake Baikal: places, routes and a map in three languages. Photos: Pexels, Wikimedia. Venues: © OpenStreetMap.',
    language: 'Language', cacheStatus: 'Data',
    offlineTitle: 'Internet needed', offlineBody: 'Connect to the internet for the first load. After that the guide works offline.', retry: 'Retry',
    tabTrip: 'Trip', myLocation: 'Me', nearbyToggle: 'Nearby',
    tripPlacesTitle: 'Saved places', tripRoutesTitle: 'Saved routes',
    tripEmpty: 'Tap the heart on places and routes — they appear here.',
  },
  zh: {
    tabPlaces: '景点', tabRoutes: '路线', tabMap: '地图', tabMore: '更多',
    filterAll: '全部', secBaikal: '贝加尔湖', secCity: '城市',
    searchPlaces: '搜索景点', hoursNote: '营业时间请再确认', openInMaps: '在地图中打开', callBtn: '拨打电话', siteBtn: '网站', showOnMap: '在地图上',
    aboutTitle: '关于', aboutBody: '伊尔库茨克与贝加尔湖随身向导：三语的景点、路线与地图。照片：Pexels、Wikimedia。场所：© OpenStreetMap。',
    language: '语言', cacheStatus: '数据',
    offlineTitle: '需要联网', offlineBody: '首次加载请连接网络，之后向导可离线使用。', retry: '重试',
    tabTrip: '行程', myLocation: '我', nearbyToggle: '附近',
    tripPlacesTitle: '已存景点', tripRoutesTitle: '已存路线',
    tripEmpty: '点击景点和路线上的爱心，它们会显示在这里。',
  },
}
