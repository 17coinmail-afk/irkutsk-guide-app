import type { Lang } from '../i18n/strings'

/**
 * История Иркутска — большой текст для отдельного экрана. Живёт в бандле, а не в ContentPack:
 * он не меняется от сезона к сезону и должен читаться офлайн с первого запуска.
 * Разбит на главы: сплошную стену текста на телефоне не читают.
 */
export interface StoryChapter {
  id: string
  year: Record<Lang, string>
  title: Record<Lang, string>
  text: Record<Lang, string>
}

export const CITY_STORY_INTRO: Record<Lang, string> = {
  ru: 'Иркутску меньше четырёх веков, но за это время он успел побывать таможней на пути в Китай, столицей золотой лихорадки, местом ссылки декабристов и «сибирским Парижем». Город стоит там, где Ангара выходит из Байкала, и почти вся его история — про дорогу: сюда шли за пушниной, золотом, чаем и свободой.',
  en: 'Irkutsk is younger than four centuries, yet in that time it has been a customs post on the road to China, a gold-rush capital, a place of exile for the Decembrists and the “Paris of Siberia”. The city stands where the Angara leaves Baikal, and almost all of its history is about the road: people came here for furs, gold, tea and freedom.',
  zh: '伊尔库茨克建城不足四百年，却先后做过通往中国的关口、淘金热的中心、十二月党人的流放地，以及“西伯利亚的巴黎”。城市坐落在安加拉河流出贝加尔湖之处，它的历史几乎都与“路”有关：人们为毛皮、黄金、茶叶和自由而来。',
}

export const CITY_STORY: StoryChapter[] = [
  {
    id: 'ostrog',
    year: { ru: '1661', en: '1661', zh: '1661' },
    title: { ru: 'Острог на Ангаре', en: 'A fort on the Angara', zh: '安加拉河畔的木堡' },
    text: {
      ru: 'Казак Яков Похабов ставит острог на правом берегу Ангары — деревянные стены, башни, церковь. Место выбрано не случайно: отсюда контролировали путь к Байкалу и дальше в Забайкалье. Через двадцать лет Иркутск получает статус города, а ещё через полвека становится центром огромной губернии, которая доходила до Тихого океана и до Аляски.',
      en: 'The Cossack Yakov Pokhabov raised a fort on the right bank of the Angara: wooden walls, towers, a church. The spot was chosen deliberately, controlling the route to Baikal and on into Transbaikalia. Twenty years later Irkutsk became a town, and half a century after that the centre of a province stretching to the Pacific and to Alaska.',
      zh: '哥萨克雅科夫·波哈博夫在安加拉河右岸建起木堡：木墙、望楼与教堂。选址别有深意，这里扼守通往贝加尔湖并深入外贝加尔的要道。二十年后伊尔库茨克设城，再过半个世纪成为一个直抵太平洋与阿拉斯加的广袤省份的中心。',
    },
  },
  {
    id: 'china-tea',
    year: { ru: 'XVIII век', en: '18th century', zh: '18 世纪' },
    title: { ru: 'Чайный путь и таможня', en: 'The tea road and the customs', zh: '茶路与海关' },
    text: {
      ru: 'Через Иркутск идёт весь торг с Китаем: в Кяхте меняют пушнину на чай, шёлк и фарфор, обозы тянутся тысячами вёрст. Город богатеет на транзите, здесь появляются каменные дома, гостиный двор и первые купеческие династии. Российско-американская компания, которая осваивала Аляску, тоже управлялась отсюда — иркутские купцы снаряжали корабли к берегам Америки.',
      en: 'All trade with China passed through Irkutsk: at Kyakhta furs were exchanged for tea, silk and porcelain, and caravans stretched for thousands of versts. The town grew rich on transit, gaining stone houses, a trading arcade and its first merchant dynasties. The Russian-American Company that colonised Alaska was run from here too: Irkutsk merchants fitted out ships for the American coast.',
      zh: '与中国的全部贸易都取道伊尔库茨克：在恰克图，毛皮换来茶叶、丝绸与瓷器，商队绵延千里。城市因转运而富庶，出现了石屋、商栈与最早的商人世家。开拓阿拉斯加的俄美公司也在此运营，伊尔库茨克商人从这里装备驶向美洲海岸的船只。',
    },
  },
  {
    id: 'decembrists',
    year: { ru: '1826', en: '1826', zh: '1826' },
    title: { ru: 'Декабристы и «сибирский Париж»', en: 'The Decembrists and the “Paris of Siberia”', zh: '十二月党人与“西伯利亚的巴黎”' },
    text: {
      ru: 'После восстания на Сенатской площади в Сибирь отправляют офицеров-дворян, а следом за ними едут жёны — Трубецкая, Волконская и другие, отказавшиеся от титулов и имущества. В иркутских домах Волконских и Трубецких появляются рояли, библиотеки и салоны; ссыльные учат детей, лечат, ставят спектакли. Именно они превращают острог на краю империи в город с театром, гимназиями и репутацией «сибирского Парижа».',
      en: 'After the uprising on Senate Square, noble officers were sent to Siberia, and their wives followed: Trubetskaya, Volkonskaya and others who gave up titles and property. Pianos, libraries and salons appeared in the Volkonsky and Trubetskoy houses; the exiles taught children, treated the sick and staged plays. It was they who turned a fort on the empire’s edge into a city with a theatre, gymnasiums and the reputation of a “Paris of Siberia”.',
      zh: '参政院广场起义后，贵族军官被流放西伯利亚，妻子们随之而来：特鲁别茨卡娅、沃尔孔斯卡娅等人放弃了头衔与财产。沃尔孔斯基与特鲁别茨科伊宅邸里出现了钢琴、藏书与沙龙；流放者教书、行医、排演戏剧。正是他们把帝国边陲的木堡，变成了拥有剧院、中学与“西伯利亚的巴黎”之名的城市。',
    },
  },
  {
    id: 'fire-gold',
    year: { ru: '1879', en: '1879', zh: '1879' },
    title: { ru: 'Пожар и золотая лихорадка', en: 'The fire and the gold rush', zh: '大火与淘金热' },
    text: {
      ru: 'Летний пожар за двое суток уничтожает три четверти города, включая архив и библиотеки. Иркутск отстраивают заново — уже в камне, шире и наряднее прежнего, на деньги ленского золота. Купцы соревнуются особняками, город получает водопровод, телефон и электрический свет раньше многих европейских губернских центров. Резные деревянные усадьбы, которые сегодня стоят в 130-м квартале, — как раз из этой эпохи.',
      en: 'A summer fire destroyed three quarters of the town in two days, archives and libraries included. Irkutsk was rebuilt in stone, wider and grander, on Lena gold money. Merchants competed in mansions; the city got running water, telephones and electric light before many European provincial capitals. The carved wooden manors that stand in the 130th Quarter today come from exactly this era.',
      zh: '一场夏季大火在两天内烧毁了全城四分之三，档案与图书馆无一幸免。伊尔库茨克以石材重建，比先前更宽阔华美，资金来自勒拿河的黄金。商人们以宅邸相竞，城市比欧洲许多省城更早通上自来水、电话与电灯。今天矗立在130号街区的雕花木宅，正出自这一时期。',
    },
  },
  {
    id: 'railway',
    year: { ru: '1898', en: '1898', zh: '1898' },
    title: { ru: 'Транссиб и Кругобайкалка', en: 'The Trans-Siberian and the Circum-Baikal', zh: '西伯利亚大铁路与环湖铁路' },
    text: {
      ru: 'Приходит железная дорога, и всё меняется: путь от Москвы сокращается с месяцев до недели. Обойти Байкал по скалам оказывается сложнее всего — Кругобайкальскую дорогу строят как отдельный подвиг: тридцать девять тоннелей, виадуки, подпорные стенки, почти по вагону взрывчатки на километр. До постройки участка поезда возили через озеро на ледоколе «Ангара», а зимой рельсы клали прямо на лёд.',
      en: 'The railway arrived and changed everything: the journey from Moscow shrank from months to a week. Getting around Baikal along the cliffs proved hardest of all, and the Circum-Baikal line was built as a feat in itself: thirty-nine tunnels, viaducts, retaining walls, nearly a wagon of explosives per kilometre. Before it was finished trains crossed the lake on the icebreaker Angara, and in winter rails were laid straight onto the ice.',
      zh: '铁路到来，一切随之改变：从莫斯科的旅程由数月缩短为一周。沿峭壁绕行贝加尔湖最为艰难，环贝加尔铁路本身就是一项壮举：三十九条隧道、高架桥与挡土墙，平均每公里近一车炸药。建成之前，列车靠“安加拉号”破冰船渡湖，冬季则把铁轨直接铺在冰面上。',
    },
  },
  {
    id: 'today',
    year: { ru: 'сегодня', en: 'today', zh: '今天' },
    title: { ru: 'Город у выхода Ангары', en: 'The city where the Angara leaves', zh: '安加拉河出口之城' },
    text: {
      ru: 'Сегодня Иркутск — это шестьсот тысяч человек, университеты, деревянные кварталы вперемешку с советскими проспектами и главные ворота Байкала: до Листвянки час, до Ольхона день. Бабр с городского герба — зверь, которого в документах превратили из якутского тигра в бобра, — стоит бронзовым у входа в 130-й квартал и остаётся лучшей метафорой города: смесь недоразумения, упрямства и обаяния.',
      en: 'Today Irkutsk is six hundred thousand people, universities, wooden quarters mixed with Soviet avenues, and the main gateway to Baikal: an hour to Listvyanka, a day to Olkhon. The Babr from the city crest, a beast turned by clerical error from a Yakut tiger into a beaver, stands in bronze at the 130th Quarter and remains the city’s best metaphor: a mix of misunderstanding, stubbornness and charm.',
      zh: '今天的伊尔库茨克有六十万居民、多所大学，木造街区与苏联时期的大道交错，并且是贝加尔湖的主要门户：到利斯特维扬卡一小时，到奥尔洪岛一天。城徽上的“巴布尔”因公文笔误由雅库特虎变成海狸，如今以青铜之身立于130号街区入口，仍是这座城市最好的隐喻：误会、倔强与魅力的混合。',
    },
  },
]

/** Примерное время чтения: 900 знаков в минуту — комфортный темп на телефоне. */
export function readingMinutes(lang: Lang): number {
  const chars = CITY_STORY_INTRO[lang].length +
    CITY_STORY.reduce((sum, c) => sum + c.text[lang].length + c.title[lang].length, 0)
  return Math.max(1, Math.round(chars / 900))
}
