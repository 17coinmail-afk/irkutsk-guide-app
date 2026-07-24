export type Lang = 'ru' | 'en' | 'zh'
export const LANGS: Lang[] = ['ru', 'en', 'zh']
export type UiKey =
  | 'tabHome' | 'tabPlaces' | 'tabRoutes' | 'tabMap' | 'tabMore'
  | 'filterAll' | 'secBaikal' | 'secCity'
  | 'searchPlaces' | 'noResults' | 'hoursNote' | 'openInMaps' | 'callBtn' | 'siteBtn' | 'showOnMap'
  | 'aboutTitle' | 'aboutBody' | 'language' | 'cacheStatus'
  | 'offlineTitle' | 'offlineBody' | 'retry'
  | 'tabTrip' | 'myLocation' | 'nearbyToggle' | 'tripPlacesTitle' | 'tripRoutesTitle' | 'tripEmpty'
  | 'homeEyebrow' | 'homeTitle' | 'homeSubtitle'
  | 'secMustSee' | 'secTopRoutes' | 'secSeasons' | 'secCityHome' | 'secFood' | 'secTrip'
  | 'seasonWinter' | 'seasonWinterCaption' | 'seasonSummer' | 'seasonSummerCaption'
  | 'statLabelDepth' | 'statUnitDepth' | 'statLabelAge' | 'statUnitAge'
  | 'statLabelFresh' | 'statUnitFresh' | 'statLabelLength' | 'statUnitLength'
  | 'mapLoading' | 'routesCountLabel'

export const UI: Record<Lang, Record<UiKey, string>> = {
  ru: {
    tabHome: 'Главное', tabPlaces: 'Места', tabRoutes: 'Маршруты', tabMap: 'Карта', tabMore: 'Ещё',
    filterAll: 'Всё', secBaikal: 'Байкал', secCity: 'Город',
    searchPlaces: 'Поиск мест', noResults: 'Ничего не найдено', hoursNote: 'часы уточняйте', openInMaps: 'Открыть в картах', callBtn: 'Позвонить', siteBtn: 'Сайт', showOnMap: 'На карте',
    aboutTitle: 'О приложении', aboutBody: 'Карманный гид по Иркутску и Байкалу: места, маршруты и карта на трёх языках. Фото: Pexels, Wikimedia. Заведения: © OpenStreetMap.',
    language: 'Язык', cacheStatus: 'Данные',
    offlineTitle: 'Нужен интернет', offlineBody: 'Для первой загрузки гида подключитесь к интернету. Дальше приложение работает офлайн.', retry: 'Повторить',
    tabTrip: 'Поездка', myLocation: 'Я', nearbyToggle: 'Рядом',
    tripPlacesTitle: 'Сохранённые места', tripRoutesTitle: 'Сохранённые маршруты',
    tripEmpty: 'Отмечайте места и маршруты сердечком — они появятся здесь.',
    homeEyebrow: 'Иркутск · Байкал', homeTitle: 'Гид по Иркутску и Байкалу',
    homeSubtitle: 'Места, маршруты и карта — с собой, даже без интернета.',
    secMustSee: 'Обязательно увидеть', secTopRoutes: 'Готовые маршруты', secSeasons: 'Когда ехать',
    secCityHome: 'Город Иркутск', secFood: 'Где поесть', secTrip: 'Моя поездка',
    seasonWinter: 'Зима', seasonWinterCaption: 'Февраль–март · лёд Байкала',
    seasonSummer: 'Лето', seasonSummerCaption: 'Июнь–август · тепло и паромы',
    statLabelDepth: 'глубина озера', statUnitDepth: 'м',
    statLabelAge: 'возраст озера', statUnitAge: 'млн лет',
    statLabelFresh: 'пресной воды планеты', statUnitFresh: '%',
    statLabelLength: 'длина озера', statUnitLength: 'км',
    mapLoading: 'Загрузка карты…', routesCountLabel: 'остановок',
  },
  en: {
    tabHome: 'Home', tabPlaces: 'Places', tabRoutes: 'Routes', tabMap: 'Map', tabMore: 'More',
    filterAll: 'All', secBaikal: 'Baikal', secCity: 'City',
    searchPlaces: 'Search places', noResults: 'Nothing found', hoursNote: 'hours may vary', openInMaps: 'Open in maps', callBtn: 'Call', siteBtn: 'Website', showOnMap: 'On map',
    aboutTitle: 'About', aboutBody: 'A pocket guide to Irkutsk and Lake Baikal: places, routes and a map in three languages. Photos: Pexels, Wikimedia. Venues: © OpenStreetMap.',
    language: 'Language', cacheStatus: 'Data',
    offlineTitle: 'Internet needed', offlineBody: 'Connect to the internet for the first load. After that the guide works offline.', retry: 'Retry',
    tabTrip: 'Trip', myLocation: 'Me', nearbyToggle: 'Nearby',
    tripPlacesTitle: 'Saved places', tripRoutesTitle: 'Saved routes',
    tripEmpty: 'Tap the heart on places and routes — they appear here.',
    homeEyebrow: 'Irkutsk · Baikal', homeTitle: 'Guide to Irkutsk and Lake Baikal',
    homeSubtitle: 'Places, routes and a map — with you, even offline.',
    secMustSee: 'Must see', secTopRoutes: 'Ready-made routes', secSeasons: 'When to go',
    secCityHome: 'Irkutsk city', secFood: 'Where to eat', secTrip: 'My trip',
    seasonWinter: 'Winter', seasonWinterCaption: 'February–March · Baikal ice',
    seasonSummer: 'Summer', seasonSummerCaption: 'June–August · warm, ferries running',
    statLabelDepth: 'lake depth', statUnitDepth: 'm',
    statLabelAge: 'lake age', statUnitAge: 'million years',
    statLabelFresh: 'of the world’s fresh water', statUnitFresh: '%',
    statLabelLength: 'lake length', statUnitLength: 'km',
    mapLoading: 'Loading the map…', routesCountLabel: 'stops',
  },
  zh: {
    tabHome: '主页', tabPlaces: '景点', tabRoutes: '路线', tabMap: '地图', tabMore: '更多',
    filterAll: '全部', secBaikal: '贝加尔湖', secCity: '城市',
    searchPlaces: '搜索景点', noResults: '未找到结果', hoursNote: '营业时间请再确认', openInMaps: '在地图中打开', callBtn: '拨打电话', siteBtn: '网站', showOnMap: '在地图上',
    aboutTitle: '关于', aboutBody: '伊尔库茨克与贝加尔湖随身向导：三语的景点、路线与地图。照片：Pexels、Wikimedia。场所：© OpenStreetMap。',
    language: '语言', cacheStatus: '数据',
    offlineTitle: '需要联网', offlineBody: '首次加载请连接网络，之后向导可离线使用。', retry: '重试',
    tabTrip: '行程', myLocation: '我', nearbyToggle: '附近',
    tripPlacesTitle: '已存景点', tripRoutesTitle: '已存路线',
    tripEmpty: '点击景点和路线上的爱心，它们会显示在这里。',
    homeEyebrow: '伊尔库茨克 · 贝加尔湖', homeTitle: '伊尔库茨克与贝加尔湖指南',
    homeSubtitle: '景点、路线和地图，离线也能使用。',
    secMustSee: '必看景点', secTopRoutes: '精选路线', secSeasons: '何时出发',
    secCityHome: '伊尔库茨克市', secFood: '美食推荐', secTrip: '我的行程',
    seasonWinter: '冬季', seasonWinterCaption: '2月–3月 · 贝加尔湖冰面',
    seasonSummer: '夏季', seasonSummerCaption: '6月–8月 · 气候温暖，渡轮通航',
    statLabelDepth: '湖泊深度', statUnitDepth: '米',
    statLabelAge: '湖泊年龄', statUnitAge: '百万年',
    statLabelFresh: '全球淡水占比', statUnitFresh: '%',
    statLabelLength: '湖泊长度', statUnitLength: '公里',
    mapLoading: '地图加载中…', routesCountLabel: '站',
  },
}
