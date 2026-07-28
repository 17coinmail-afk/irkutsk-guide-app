import type { Lang } from '../i18n/strings'

/**
 * Люди Иркутска: кто здесь родился, жил или оставил след. Живёт в бандле — текст не зависит
 * от сезона и должен читаться офлайн. У каждого есть привязка к месту из каталога,
 * чтобы из карточки человека можно было прийти туда, где он жил, работал или похоронен.
 */
export interface Person {
  id: string
  years: string
  /** slug места из ContentPack — куда вести читателя. */
  placeSlug?: string
  name: Record<Lang, string>
  role: Record<Lang, string>
  text: Record<Lang, string>
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
  },
]

export function personById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id)
}
