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
  | 'tabPractical' | 'practicalTitle' | 'practicalSubtitle'
  | 'modGetThere' | 'modGetThereSub' | 'modPhrasebook' | 'modPhrasebookSub'
  | 'modWeather' | 'modWeatherSub' | 'modEmergency' | 'modEmergencySub'
  | 'weatherHeader' | 'forecastTitle' | 'iceHeader' | 'approxNote' | 'weatherError'
  | 'pricesApprox' | 'todayLabel'

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
    tabPractical: 'Практика', practicalTitle: 'Практика туриста',
    practicalSubtitle: 'Всё для поездки: транспорт, язык, погода и помощь.',
    modGetThere: 'Как добраться', modGetThereSub: 'Аэропорт, Листвянка, Ольхон, КБЖД',
    modPhrasebook: 'Разговорник', modPhrasebookSub: 'Русские фразы с произношением',
    modWeather: 'Погода и лёд', modWeatherSub: 'Прогноз и статус льда Байкала',
    modEmergency: 'Экстренное', modEmergencySub: 'Телефоны служб и консульства',
    weatherHeader: 'Погода в Иркутске', forecastTitle: 'Прогноз на 5 дней',
    iceHeader: 'Лёд Байкала', approxNote: 'Данные ориентировочные',
    weatherError: 'Не удалось загрузить погоду. Проверьте интернет.',
    pricesApprox: 'Цены и время ориентировочные', todayLabel: 'Сейчас',
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
    tabPractical: 'Practical', practicalTitle: 'Practical info',
    practicalSubtitle: 'Everything for your trip: transport, language, weather and help.',
    modGetThere: 'Getting there', modGetThereSub: 'Airport, Listvyanka, Olkhon, Circum-Baikal',
    modPhrasebook: 'Phrasebook', modPhrasebookSub: 'Russian phrases with pronunciation',
    modWeather: 'Weather & ice', modWeatherSub: 'Forecast and Baikal ice status',
    modEmergency: 'Emergency', modEmergencySub: 'Service numbers and consulate',
    weatherHeader: 'Weather in Irkutsk', forecastTitle: '5-day forecast',
    iceHeader: 'Baikal ice', approxNote: 'Figures are approximate',
    weatherError: 'Could not load the weather. Check your connection.',
    pricesApprox: 'Prices and times are approximate', todayLabel: 'Now',
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
    tabPractical: '实用', practicalTitle: '实用信息',
    practicalSubtitle: '旅行所需一切：交通、语言、天气与求助。',
    modGetThere: '如何前往', modGetThereSub: '机场、利斯特维扬卡、奥尔洪、环湖铁路',
    modPhrasebook: '常用语', modPhrasebookSub: '俄语短语及发音',
    modWeather: '天气与冰况', modWeatherSub: '预报与贝加尔湖冰情',
    modEmergency: '紧急', modEmergencySub: '救援电话与领事馆',
    weatherHeader: '伊尔库茨克天气', forecastTitle: '未来 5 天预报',
    iceHeader: '贝加尔湖冰情', approxNote: '数据仅供参考',
    weatherError: '无法加载天气，请检查网络。',
    pricesApprox: '价格与时间为大致参考', todayLabel: '当前',
  },
}
