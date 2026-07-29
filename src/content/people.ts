import type { Lang } from '../i18n/strings'

/**
 * Люди Иркутска: кто здесь родился, жил или оставил след. Живёт в бандле — текст не зависит
 * от сезона и должен читаться офлайн. У каждого есть привязка к месту из каталога,
 * чтобы из карточки человека можно было прийти туда, где он жил, работал или похоронен.
 */
/**
 * Снимок в галерее личности. Все фото — с Викисклада под свободной лицензией:
 * сгенерировать «фотографию» реального человека нельзя, это было бы выдуманное
 * подобие под настоящим именем. Лицензии CC BY / CC BY-SA требуют указания автора,
 * поэтому credit и source хранятся рядом со снимком и показываются под ним.
 */
export interface PersonPhoto {
  /** Имя файла в /assets/people на нашем сервере. */
  file: string
  caption: Record<Lang, string>
  /** Автор и лицензия одной строкой — то, что показываем под фото. */
  credit: string
  /** Страница файла на Викискладе. */
  source: string
}

export const PHOTO_BASE = 'https://guide.getastrodaily.com/assets/people/'

export interface Person {
  id: string
  years: string
  /** slug места из ContentPack — куда вести читателя. */
  placeSlug?: string
  name: Record<Lang, string>
  role: Record<Lang, string>
  text: Record<Lang, string>
  /** Галерея: портреты, памятники, дома — то, что от человека осталось в городе. */
  photos?: PersonPhoto[]
}

export const PEOPLE: Person[] = [
  {
    id: 'shelikhov',
    years: '1747–1795',
    placeSlug: 'znamensky',
    name: { ru: 'Григорий Шелихов', en: 'Grigory Shelikhov', zh: '格里戈里·谢利霍夫' },
    role: { ru: 'мореплаватель, «русский Колумб»', en: 'navigator, the “Russian Columbus”', zh: '航海家，“俄国的哥伦布”' },
    text: {
      ru: 'Купец, который снарядил экспедиции к берегам Америки и основал первые русские поселения на Аляске. Его компания позже стала Российско-американской, а управлялась она из Иркутска. Похоронен в Знаменском монастыре: беломраморный памятник с эпитафией стоит там до сих пор, и на нём Шелихова называют человеком, «морей Колумбом».',
      en: 'A merchant who outfitted expeditions to the American coast and founded the first Russian settlements in Alaska. His company later became the Russian-American Company, run from Irkutsk. He is buried at the Znamensky Monastery, where a white marble monument still calls him a “Columbus of the seas”.',
      zh: '这位商人筹备了前往美洲海岸的远征，并在阿拉斯加建立了最早的俄国定居点。他的公司后来成为俄美公司，总部设在伊尔库茨克。他安葬于兹纳缅斯基修道院，白色大理石墓碑至今称他为“海上的哥伦布”。',
    },
    photos: [
      {
        file: 'shelikhov-1.jpg',
        caption: { ru: 'Портрет купца, XVIII век', en: 'Portrait of the merchant, 18th century', zh: '商人肖像，18世纪' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Grigory_Shelikov.jpg',
      },
      {
        file: 'shelikhov-2.jpg',
        caption: { ru: 'Русское поселение на Кадьяке', en: 'The Russian settlement on Kodiak, the point of the expeditions', zh: '科迪亚克岛上的俄国定居点' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Shelikhov_settlement.jpg',
      },
      {
        file: 'shelikhov-3.jpg',
        caption: { ru: 'Русская Америка на советской марке', en: 'Russian America on a Soviet stamp', zh: '苏联邮票上的俄属美洲' },
        credit: 'Почта СССР · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:1991_CPA_6302.jpg',
      },
      {
        file: 'shelikhov-4.jpg',
        caption: { ru: 'Надгробие в Знаменском монастыре, Иркутск', en: 'The tomb at Znamensky Monastery, Irkutsk', zh: '伊尔库茨克兆征修道院内的墓碑' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA._%D0%97%D0%BD%D0%B0%D0%BC%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%BC%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8C._%D0%9F%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA_%D0%93.%D0%98.%D0%A8%D0%B5%D0%BB%D0%B5%D1%85%D0%BE%D0%B2%D1%83_jpg.jpg',
      },
      {
        file: 'shelikhov-5.jpg',
        caption: { ru: 'Эпитафия: здесь Шелихова называют «морей Колумбом»', en: 'The epitaph calls him “Columbus of the seas”', zh: '墓志铭称他为“海上的哥伦布”' },
        credit: 'Монах - Сибиряк · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F_109.JPG',
      },
    ],
  },
  {
    id: 'trubetskaya',
    years: '1800–1854',
    placeSlug: 'znamensky',
    name: { ru: 'Екатерина Трубецкая', en: 'Ekaterina Trubetskaya', zh: '叶卡捷琳娜·特鲁别茨卡娅' },
    role: { ru: 'первая из жён декабристов, уехавших в Сибирь', en: 'first of the Decembrist wives to follow into exile', zh: '首位随夫流放西伯利亚的十二月党人妻子' },
    text: {
      ru: 'Княгиня, которая первой поехала за мужем на каторгу, отказавшись от титула, состояния и права вернуться. Губернатор в Иркутске месяцами уговаривал её повернуть назад и требовал подписать отказ от дворянства — она подписала. Прожила в Сибири двадцать восемь лет, воспитала детей, умерла в Иркутске и похоронена в Знаменском монастыре.',
      en: 'The princess who was first to follow her husband to hard labour, giving up her title, fortune and the right to return. The governor in Irkutsk spent months persuading her to turn back and demanded she renounce her nobility; she signed. She lived twenty-eight years in Siberia, raised her children, died in Irkutsk and is buried at the Znamensky Monastery.',
      zh: '这位公爵夫人第一个追随丈夫前往苦役地，放弃了头衔、财产与返回的权利。伊尔库茨克总督数月劝她折返，并要求她签署放弃贵族身份的文书，她签了。她在西伯利亚生活二十八年，养育子女，最终在伊尔库茨克去世，安葬于兹纳缅斯基修道院。',
    },
    photos: [
      {
        file: 'trubetskaya-1.jpg',
        caption: { ru: 'Первой из жён поехала за мужем', en: 'Ekaterina Trubetskaya, the first wife to follow her husband to Siberia', zh: '第一位追随丈夫前往西伯利亚的妻子' },
        credit: 'Николай Бестужев · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Ekaterina_Troubetskoy.jpg',
      },
      {
        file: 'trubetskaya-2.jpg',
        caption: { ru: 'Её муж в ссылке. Портрет Бестужева', en: 'Prince Sergei Trubetskoy in exile, painted by fellow Decembrist Bestuzhev', zh: '流放中的谢尔盖·特鲁别茨科伊公爵' },
        credit: 'Николай Бестужев · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Sergei_Petrovich_Trubetskoy_by_N._Bestuzhev.jpg',
      },
      {
        file: 'trubetskaya-3.jpg',
        caption: { ru: 'Дом Трубецких в Иркутске — сегодня музей', en: 'The Trubetskoy house in Irkutsk, now a museum', zh: '伊尔库茨克的特鲁别茨科伊之家，如今是博物馆' },
        credit: 'RyzhOl · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D0%BC_%D0%A2%D1%80%D1%83%D0%B1%D0%B5%D1%86%D0%BA%D0%B8%D1%85.jpg',
      },
      {
        file: 'trubetskaya-4.jpg',
        caption: { ru: 'Усадьба со стороны сада', en: 'The estate seen from the garden', zh: '从花园看庄园' },
        credit: 'TRustRust · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%A3%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D0%B0_%D0%A2%D1%80%D1%83%D0%B1%D0%B5%D1%86%D0%BA%D0%B8%D1%85.jpg',
      },
      {
        file: 'trubetskaya-5.jpg',
        caption: { ru: 'Дом в Петровском Заводе, где она жила при каторге мужа', en: 'The house at Petrovsky Zavod, where she lived during his hard labour', zh: '丈夫服苦役期间她居住的房子' },
        credit: 'SAKRI · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D0%BC_%D0%A2%D1%80%D1%83%D0%B1%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%95._%D0%98.,_%D0%B6%D0%B5%D0%BD%D1%8B_%D0%B4%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D0%B8%D1%81%D1%82%D0%B0_%D0%A2%D1%80%D1%83%D0%B1%D0%B5%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_%D0%A1._%D0%9F.,_%D1%83%D0%BB%D0%B8%D1%86%D0%B0_%D0%94%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D0%B8%D1%81%D1%82%D0%BE%D0%B2,_19,_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA-%D0%97%D0%B0%D0%B1%D0%B0%D0%B9%D0%BA%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9,_%D0%97%D0%B0%D0%B1%D0%B0%D0%B9%D0%BA%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D1%80%D0%B0%D0%B9.jpg',
      },
    ],
  },
  {
    id: 'volkonsky',
    years: '1788–1865',
    placeSlug: 'decembrists',
    name: { ru: 'Сергей Волконский', en: 'Sergey Volkonsky', zh: '谢尔盖·沃尔孔斯基' },
    role: { ru: 'генерал, декабрист', en: 'general and Decembrist', zh: '将军，十二月党人' },
    text: {
      ru: 'Герой войны 1812 года, генерал-майор в двадцать четыре года — и каторжник после выступления на Сенатской площади. В Иркутске Волконские устроили дом, который стал культурным центром города: рояль, библиотека, спектакли и гости со всей Сибири. Сегодня в этой усадьбе музей декабристов, и там сохранился тот самый инструмент.',
      en: 'A hero of the 1812 war and a major general at twenty-four, then a convict after the uprising on Senate Square. In Irkutsk the Volkonskys made their house the cultural centre of the city: a grand piano, a library, plays and guests from across Siberia. The manor is now the Decembrists’ Museum, and the instrument is still there.',
      zh: '他是1812年战争的英雄，二十四岁即为少将，参政院广场起义后沦为苦役犯。在伊尔库茨克，沃尔孔斯基一家把宅邸经营成城市的文化中心：钢琴、藏书、戏剧演出与来自西伯利亚各地的客人。这座宅邸如今是十二月党人博物馆，那架钢琴仍在。',
    },
    photos: [
      {
        file: 'volkonsky-1.jpg',
        caption: { ru: 'Генерал-майор в 1812 году — до восстания и каторги', en: 'A major general in 1812, before the revolt and the mines', zh: '1812年的少将，在起义与苦役之前' },
        credit: 'Пётр Соколов · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:P.F._Sokolov_031.jpg',
      },
      {
        file: 'volkonsky-2.jpg',
        caption: { ru: 'Он же в Иркутске спустя тридцать лет ссылки', en: 'The same man in Irkutsk after thirty years of exile', zh: '流放三十年后在伊尔库茨克' },
        credit: 'Альфред Давиньон · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Davignon,_Alfred_-_Der_Gro%C3%9Ff%C3%BCrst_Sergej_Grigor%27evi%C4%8D_Volkonskij,_der_als_Dekabrist_nach_Irkutsk_in_Sibirien_verbannt_worden_war._Irkutsk_(Zeno_Fotografie).jpg',
      },
      {
        file: 'volkonsky-3.jpg',
        caption: { ru: 'Дом Волконских в Иркутске', en: 'The Volkonsky house in Irkutsk', zh: '伊尔库茨克的沃尔孔斯基之家' },
        credit: 'Rost.galis · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D0%BC_%D0%B4%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D0%B8%D1%81%D1%82%D0%B0.JPG',
      },
      {
        file: 'volkonsky-4.jpg',
        caption: { ru: 'Вход в дом-музей', en: 'The entrance to the house museum', zh: '故居博物馆入口' },
        credit: 'Rost.galis · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%92%D1%85%D0%BE%D0%B4_%D0%B2_%D0%B4%D0%BE%D0%BC-%D0%BC%D1%83%D0%B7%D0%B5%D0%B9.JPG',
      },
      {
        file: 'volkonsky-5.jpg',
        caption: { ru: 'Двор усадьбы: здесь Волконские держали оранжерею', en: 'The courtyard, where the Volkonskys kept a greenhouse', zh: '庄园庭院，沃尔孔斯基一家曾在此建温室' },
        credit: 'Rost.galis · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%B2%D0%BE%D1%80_%D1%83%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D1%8B.JPG',
      },
    ],
  },
  {
    id: 'kolchak',
    years: '1874–1920',
    placeSlug: 'znamensky',
    name: { ru: 'Александр Колчак', en: 'Alexander Kolchak', zh: '亚历山大·高尔察克' },
    role: { ru: 'адмирал, полярный исследователь', en: 'admiral and polar explorer', zh: '海军上将，极地探险家' },
    text: {
      ru: 'До того как стать фигурой Гражданской войны, Колчак был океанографом и участником полярных экспедиций, искал землю Санникова и составлял карты арктических берегов. В Иркутске он был расстрелян в феврале 1920 года, тело спустили под лёд Ушаковки. Памятник ему стоит у Знаменского монастыря и до сих пор вызывает споры в городе.',
      en: 'Before becoming a figure of the Civil War, Kolchak was an oceanographer and polar explorer who searched for Sannikov Land and charted Arctic coasts. He was shot in Irkutsk in February 1920 and his body was put under the ice of the Ushakovka. His monument stands by the Znamensky Monastery and still divides the city.',
      zh: '在成为内战人物之前，高尔察克是海洋学家与极地探险家，曾寻找桑尼科夫地并绘制北极海岸图。1920年2月他在伊尔库茨克被枪决，遗体被投入乌沙科夫卡河冰下。他的纪念碑立于兹纳缅斯基修道院旁，至今仍在城中引发争论。',
    },
    photos: [
      {
        file: 'kolchak-1.jpg',
        caption: { ru: 'Морской офицер и полярный исследователь', en: 'Naval officer and polar explorer', zh: '海军军官与极地探险家' },
        credit: 'А. Ренце и Ф. Шредер · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Admiral_Kolchak.jpg',
      },
      {
        file: 'kolchak-2.jpg',
        caption: { ru: 'Верховный правитель России, 1919 год', en: 'Supreme Ruler of Russia, 1919', zh: '1919年的俄国最高执政' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:AdmiralKolchak.jpg',
      },
      {
        file: 'kolchak-3.jpg',
        caption: { ru: 'Харлампиевская церковь в Иркутске: здесь он венчался', en: 'Kharlampievskaya church in Irkutsk, where he was married', zh: '他在伊尔库茨克的哈拉姆皮教堂成婚' },
        credit: 'Kolchak1923 · CC0',
        source: 'https://commons.wikimedia.org/wiki/File:HarlampievskayaChurch.JPG',
      },
      {
        file: 'kolchak-4.jpg',
        caption: { ru: 'Иркутский тюремный замок — последние недели', en: 'The Irkutsk prison castle, his last weeks', zh: '伊尔库茨克监狱，他生命的最后几周' },
        credit: 'Kolchak1923 · CC0',
        source: 'https://commons.wikimedia.org/wiki/File:IrkutskayaTurma.JPG',
      },
      {
        file: 'kolchak-5.jpg',
        caption: { ru: 'Камера, откуда его увели на расстрел в январе 1920-го', en: 'The cell he was taken from to be shot in January 1920', zh: '1920年1月他从这间牢房被带走处决' },
        credit: 'Kolchak1923 · CC0',
        source: 'https://commons.wikimedia.org/wiki/File:Kamera_Kolchaka.JPG',
      },
    ],
  },
  {
    id: 'sukachev',
    years: '1849–1920',
    placeSlug: 'sukachev-estate',
    name: { ru: 'Владимир Сукачёв', en: 'Vladimir Sukachyov', zh: '弗拉基米尔·苏卡乔夫' },
    role: { ru: 'городской голова, меценат', en: 'city mayor and patron of the arts', zh: '市长，艺术赞助人' },
    text: {
      ru: 'Двенадцать лет управлял Иркутском и собрал художественную коллекцию, которой позавидовали бы столицы: Репин, Айвазовский, Левитан — всё это он покупал и привозил в Сибирь. Свою галерею Сукачёв открыл для горожан бесплатно, а позже подарил городу. Из этого собрания вырос художественный музей, который носит его имя.',
      en: 'He governed Irkutsk for twelve years and assembled an art collection the capitals might envy: Repin, Aivazovsky, Levitan, all bought and brought to Siberia. Sukachyov opened his gallery to townspeople free of charge and later gave it to the city. That collection became the art museum that bears his name.',
      zh: '他主政伊尔库茨克十二年，并收藏了连首都也艳羡的艺术品：列宾、艾瓦佐夫斯基、列维坦，皆由他购入并运到西伯利亚。苏卡乔夫免费向市民开放自家画廊，后来更捐赠给城市。这批收藏发展为今日以他命名的美术馆。',
    },
    photos: [
      {
        file: 'sukachev-1.jpg',
        caption: { ru: 'Городской голова Иркутска и коллекционер', en: 'Mayor of Irkutsk and art collector', zh: '伊尔库茨克市长与收藏家' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D0%BB%D0%B0%D1%82%D0%BE%D0%BD%D0%BE%D0%B2%D0%B8%D1%87_%D0%A1%D1%83%D0%BA%D0%B0%D1%87%D0%B5%D0%B2.jpg',
      },
      {
        file: 'sukachev-2.jpg',
        caption: { ru: 'Главный дом усадьбы', en: 'The main house of the estate', zh: '庄园主楼' },
        credit: 'Rost.galis · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%B4%D0%BE%D0%BC_%D1%83%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D1%8B_%D0%A1%D1%83%D0%BA%D0%B0%D1%87%D0%B5%D0%B2%D1%8B%D1%85.JPG',
      },
      {
        file: 'sukachev-3.jpg',
        caption: { ru: 'Пропильная резьба: иркутское кружево по дереву', en: 'Fretwork carving: Irkutsk lace in wood', zh: '透雕装饰：伊尔库茨克的木质花边' },
        credit: 'Rost.galis · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%91%D0%B0%D0%BB%D0%BA%D0%BE%D0%BD_%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE_%D0%B4%D0%BE%D0%BC%D0%B0_%D1%83%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D1%8B_%D0%A1%D1%83%D0%BA%D0%B0%D1%87%D0%B5%D0%B2%D1%8B%D1%85.JPG',
      },
      {
        file: 'sukachev-4.jpg',
        caption: { ru: 'Его собрание стало городским музеем', en: 'The picture gallery: his collection became the city museum', zh: '画廊：他的收藏成为市立博物馆的基础' },
        credit: 'Ася Волкова · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%22%D0%A3%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D0%B0_%D0%92.%D0%9F._%D0%A1%D1%83%D0%BA%D0%B0%D1%87%D0%B5%D0%B2%D0%B0%22,_%D1%84%D0%B0%D1%81%D0%B0%D0%B4_%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F_%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BD%D0%BE%D0%B9_%D0%B3%D0%B0%D0%BB%D0%B5%D1%80%D0%B5%D0%B8.jpg',
      },
      {
        file: 'sukachev-5.jpg',
        caption: { ru: 'Зимний сад в пристройке', en: 'The winter garden in the annexe', zh: '附属建筑中的冬季花园' },
        credit: 'Екатерина Петухова · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%92_%D0%BF%D1%80%D0%B8%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B5_%D1%81%D0%B5%D0%B9%D1%87%D0%B0%D1%81_%D1%80%D0%B0%D1%81%D0%BF%D0%BE%D0%BB%D0%B0%D0%B3%D0%B0%D0%B5%D1%82%D1%81%D1%8F_%D0%B7%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4.jpg',
      },
    ],
  },
  {
    id: 'vampilov',
    years: '1937–1972',
    placeSlug: 'drama-theatre',
    name: { ru: 'Александр Вампилов', en: 'Alexander Vampilov', zh: '亚历山大·万皮洛夫' },
    role: { ru: 'драматург', en: 'playwright', zh: '剧作家' },
    text: {
      ru: 'Автор «Утиной охоты» и «Старшего сына», человек, который вернул на советскую сцену живой разговорный язык. Родился в Черемхове под Иркутском, учился в местном университете, работал в газете. Погиб на Байкале за два дня до тридцатипятилетия: лодка перевернулась у Листвянки, он доплыл до берега и умер от остановки сердца в ледяной воде.',
      en: 'The author of “Duck Hunting” and “The Elder Son”, the man who brought living spoken language back to the Soviet stage. Born in Cheremkhovo near Irkutsk, he studied at the local university and worked for a newspaper. He died on Baikal two days before turning thirty-five: his boat capsized near Listvyanka, he reached the shore and his heart stopped in the icy water.',
      zh: '《打野鸭》与《长子》的作者，他让鲜活的口语重回苏联舞台。生于伊尔库茨克附近的切列姆霍沃，就读于当地大学并在报社工作。他在三十五岁生日前两天殒命于贝加尔湖：小船在利斯特维扬卡附近倾覆，他游到岸边，却因冰水而心脏骤停。',
    },
    photos: [
      {
        file: 'vampilov-1.jpg',
        caption: { ru: 'Памятник у Драматического театра в Иркутске', en: 'The monument by the Drama Theatre in Irkutsk', zh: '伊尔库茨克戏剧院旁的纪念碑' },
        credit: 'Михаил Бабтракинов · CC0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%9F%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA_%D0%92%D0%B0%D0%BC%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D1%83_%D0%B2_%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA%D0%B5.jpg',
      },
      {
        file: 'vampilov-2.jpg',
        caption: { ru: 'Его пьеса на сцене, 1972 год', en: 'One of his plays staged in 1972', zh: '1972年上演的他的剧作' },
        credit: 'Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Vampilov%27s_piece_in_1972_01.jpg',
      },
      {
        file: 'vampilov-3.jpg',
        caption: { ru: 'Тот же сезон: Вампилова начали ставить при жизни', en: 'The same season: he began to be staged in his lifetime', zh: '同一演出季：他生前作品开始上演' },
        credit: 'Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Vampilov%27s_piece_in_1972_03.jpg',
      },
      {
        file: 'vampilov-4.jpg',
        caption: { ru: 'Мемориал на берегу Байкала у Листвянки, где он утонул', en: 'The memorial on the Baikal shore near Listvyanka, where he drowned', zh: '利斯特维扬卡附近贝加尔湖岸的纪念地，他在此溺亡' },
        credit: 'Bogdanov-62 · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:Monument-Vampilov.jpg',
      },
      {
        file: 'vampilov-5.jpg',
        caption: { ru: 'Камень с его именем у воды', en: 'The stone with his name by the water', zh: '水边刻有他名字的石头' },
        credit: 'Masha.Kondrasheva · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%92%D0%B0%D0%BC%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D1%8C.jpg',
      },
    ],
  },
  {
    id: 'rasputin',
    years: '1937–2015',
    placeSlug: 'old-irkutsk',
    name: { ru: 'Валентин Распутин', en: 'Valentin Rasputin', zh: '瓦连京·拉斯普京' },
    role: { ru: 'писатель', en: 'writer', zh: '作家' },
    text: {
      ru: 'Главный голос «деревенской прозы» и человек, который первым громко сказал, что Байкал губят. «Прощание с Матёрой» — про деревню, уходящую под воду при строительстве ГЭС, — вышла из его собственной биографии: родная Аталанка попала в зону затопления. Распутин годами защищал озеро от целлюлозного комбината и стал в Иркутске фигурой почти совестной.',
      en: 'The leading voice of Russian “village prose” and the first to say loudly that Baikal was being destroyed. “Farewell to Matyora”, about a village drowned by a hydroelectric dam, came out of his own life: his native Atalanka fell into the flood zone. Rasputin spent years defending the lake from the pulp mill and became something like the conscience of Irkutsk.',
      zh: '他是俄罗斯“乡村散文”的主要声音，也是最早大声疾呼贝加尔湖正被毁坏的人。《告别马焦拉》讲述因水电站而没入水下的村庄，正源于他自身的经历：故乡阿塔兰卡被划入淹没区。拉斯普京多年为保护贝加尔湖对抗纸浆厂，在伊尔库茨克近乎成为良知的象征。',
    },
    photos: [
      {
        file: 'rasputin-1.jpg',
        caption: { ru: 'Валентин Распутин', en: 'Valentin Rasputin', zh: '瓦连京·拉斯普京' },
        credit: 'Александр Стручков · CC BY-SA 3.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%92%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD_%D0%A0%D0%B0%D1%81%D0%BF%D1%83%D1%82%D0%B8%D0%BD_(cropped).jpg',
      },
      {
        file: 'rasputin-2.jpg',
        caption: { ru: 'Дома, у книжных полок', en: 'At home by his bookshelves', zh: '在家中的书架旁' },
        credit: 'Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Valentin_Rasputin_(mos.ru)_10.jpg',
      },
      {
        file: 'rasputin-3.jpg',
        caption: { ru: 'Сценарий «Прощания с Матёрой»', en: 'The screenplay of “Farewell to Matyora”', zh: '《告别马焦拉》剧本' },
        credit: 'Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Valentin_Rasputin_(mos.ru)_03.jpg',
      },
      {
        file: 'rasputin-4.jpg',
        caption: { ru: 'Книга с дарственной надписью автора', en: 'A book inscribed by the author', zh: '作者亲笔题赠的书' },
        credit: 'Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Valentin_Rasputin_(mos.ru)_02.jpg',
      },
      {
        file: 'rasputin-5.jpg',
        caption: { ru: 'Могила в Знаменском монастыре — рядом с Шелиховым', en: 'His grave at Znamensky Monastery, near Shelikhov’s', zh: '兆征修道院内的墓地，与谢利霍夫相邻' },
        credit: 'Vyacheslav Bukharov · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Monastery_of_the_Theotokos_of_the_Sign_in_Irkutsk_(September_2025)_-_0_22.jpg',
      },
    ],
  },
  {
    id: 'gaidai',
    years: '1923–1993',
    placeSlug: 'kvartal-130',
    name: { ru: 'Леонид Гайдай', en: 'Leonid Gaidai', zh: '列昂尼德·盖达伊' },
    role: { ru: 'кинорежиссёр', en: 'film director', zh: '电影导演' },
    text: {
      ru: 'Человек, чьи комедии знает наизусть вся страна: «Операция „Ы“», «Кавказская пленница», «Бриллиантовая рука». Вырос в Иркутске, учился здесь в школе, играл в областном театре, отсюда ушёл на фронт. Памятник Гайдаю и его троице — Трусу, Балбесу и Бывалому — стоит рядом со 130-м кварталом и стал местом обязательной фотографии.',
      en: 'The man whose comedies the whole country knows by heart: “Operation Y”, “Kidnapping, Caucasian Style”, “The Diamond Arm”. He grew up in Irkutsk, went to school here, acted at the regional theatre and left for the front from this city. A monument to Gaidai and his trio of rogues stands next to the 130th Quarter and has become an obligatory photo stop.',
      zh: '他的喜剧全国人人耳熟能详：《Y行动》《高加索女俘虏》《钻石胳膊》。他在伊尔库茨克长大、上学，并在州剧院登台，也从这里奔赴前线。盖达伊与他笔下三人组的雕像立在130号街区旁，已成为必拍之地。',
    },
    photos: [
      {
        file: 'gaidai-1.jpg',
        caption: { ru: 'Леонид Гайдай, 1974 год', en: 'Leonid Gaidai in 1974', zh: '1974年的列昂尼德·盖达伊' },
        credit: 'Н. В. Гнисюк / Главархив Москвы · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%9B%D0%B5%D0%BE%D0%BD%D0%B8%D0%B4_%D0%93%D0%B0%D0%B9%D0%B4%D0%B0%D0%B9_(1974)_(cropped).jpg',
      },
      {
        file: 'gaidai-2.jpg',
        caption: { ru: 'Иркутское детство: Леонид справа, 1920-е', en: 'An Irkutsk childhood: Leonid on the right, 1920s', zh: '伊尔库茨克的童年：右为列昂尼德，1920年代' },
        credit: 'автор неизвестен · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80,_%D0%90%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B8%D0%BD%D0%B0_%D0%B8_%D0%9B%D0%B5%D0%BE%D0%BD%D0%B8%D0%B4_%D0%93%D0%B0%D0%B9%D0%B4%D0%B0%D0%B9,_1920-%D0%B5_%D0%B3%D0%BE%D0%B4%D1%8B.jpg',
      },
      {
        file: 'gaidai-3.jpg',
        caption: { ru: 'Автограф', en: 'His autograph', zh: '亲笔签名' },
        credit: 'Леонид Гайдай · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:%D0%90%D0%B2%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84_%D0%93%D0%B0%D0%B9%D0%B4%D0%B0%D0%B9_%D0%9B%D0%B5%D0%BE%D0%BD%D0%B8%D0%B4.JPG',
      },
      {
        file: 'gaidai-4.jpg',
        caption: { ru: 'Кадр из «Деловых людей» на почтовом конверте', en: 'A still from “Strictly Business” on a postal cover', zh: '邮资封上的《生意人》剧照' },
        credit: 'Издатцентр «Марка» · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Rostislav_Plyatt_PSE_Russia_2008.jpg',
      },
      {
        file: 'gaidai-5.jpg',
        caption: { ru: 'Могила на Кунцевском кладбище в Москве', en: 'His grave at Kuntsevo Cemetery in Moscow', zh: '莫斯科昆采沃公墓的墓地' },
        credit: 'Bogdanov-62 · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Tomb_of_Ghayday_20201025_162553.jpg',
      },
    ],
  },
  {
    id: 'matsuev',
    years: '1975',
    placeSlug: 'drama-theatre',
    name: { ru: 'Денис Мацуев', en: 'Denis Matsuev', zh: '杰尼斯·马祖耶夫' },
    role: { ru: 'пианист', en: 'pianist', zh: '钢琴家' },
    text: {
      ru: 'Родился и вырос в Иркутске, победил на конкурсе Чайковского в двадцать три года и стал одним из самых узнаваемых российских пианистов. Каждую осень привозит в родной город фестиваль «Звёзды на Байкале»: за две недели здесь играют оркестры и солисты, ради которых обычно едут в Москву или Вену.',
      en: 'Born and raised in Irkutsk, he won the Tchaikovsky Competition at twenty-three and became one of Russia’s most recognisable pianists. Every autumn he brings the “Stars on Baikal” festival to his home city: for two weeks orchestras and soloists play here for whom people usually travel to Moscow or Vienna.',
      zh: '他在伊尔库茨克出生长大，二十三岁夺得柴可夫斯基国际比赛冠军，成为俄罗斯最具知名度的钢琴家之一。每年秋天他把“贝加尔之星”音乐节带回故乡：两周之内，平常要去莫斯科或维也纳才能听到的乐团与独奏家在此演出。',
    },
    photos: [
      {
        file: 'matsuev-1.jpg',
        caption: { ru: 'Денис Мацуев — пианист, родился в Иркутске', en: 'Denis Matsuev, pianist, born in Irkutsk', zh: '钢琴家杰尼斯·马祖耶夫，生于伊尔库茨克' },
        credit: 'kremlin.ru · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Denis_Matsuev.jpg',
      },
      {
        file: 'matsuev-2.jpg',
        caption: { ru: 'За роялем', en: 'At the piano', zh: '演奏中' },
        credit: 'FotomanBasel · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Denis_Leonidowitsch_Mazujew_Basel_Fotoman.jpg',
      },
      {
        file: 'matsuev-3.jpg',
        caption: { ru: 'На своём фестивале, 2023', en: 'At his own festival, 2023', zh: '在他自己的音乐节上，2023年' },
        credit: 'Министерство культуры Республики Татарстан · CC BY 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Denis_Matsuev%27s_festival_in_Kazan_2023_02.jpg',
      },
      {
        file: 'matsuev-4.jpg',
        caption: { ru: 'Вечер джаза на фестивале Crescendo', en: 'A jazz night at the Crescendo festival', zh: 'Crescendo音乐节的爵士之夜' },
        credit: 'Frolzart · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Crescendo_2018_%D0%92%D0%B5%D1%87%D0%B5%D1%80_%D0%B4%D0%B6%D0%B0%D0%B7%D0%B0_07.jpg',
      },
      {
        file: 'matsuev-5.jpg',
        caption: { ru: 'Он основал в Иркутске фестиваль «Звёзды на Байкале»', en: 'He founded the Stars on Baikal festival in Irkutsk', zh: '他在伊尔库茨克创办了“贝加尔之星”音乐节' },
        credit: 'Frolzart · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Crescendo_2018_%D0%92%D0%B5%D1%87%D0%B5%D1%80_%D0%B4%D0%B6%D0%B0%D0%B7%D0%B0_24.jpg',
      },
    ],
  },
]

export function personById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id)
}
