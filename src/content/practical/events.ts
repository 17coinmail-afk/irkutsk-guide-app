// «События года» — сезонный календарь. Времена ориентировочные (даты уточнять). Трёхъязычно.
import type { Tri } from '../../lib/weather'

export interface EventItem { icon: string; when: Tri; name: Tri; desc: Tri }

export const EVENTS: EventItem[] = [
  {
    icon: 'snow-outline',
    when: { ru: 'Февраль–март', en: 'February–March', zh: '2–3月' },
    name: { ru: 'Ледовые фестивали Байкала', en: 'Baikal ice festivals', zh: '贝加尔冰雪节' },
    desc: {
      ru: 'Фестивали ледовых скульптур и зимних забав на прозрачном льду: «Зимниада», ледяные городки и катки под открытым небом.',
      en: 'Festivals of ice sculpture and winter fun on the clear ice: “Zimniada,” ice towns and open-air rinks.',
      zh: '在清澈冰面上举行的冰雕与冬趣节庆：“Zimniada”冬季节、冰城与露天冰场。',
    },
  },
  {
    icon: 'walk-outline',
    when: { ru: 'Начало марта', en: 'Early March', zh: '3月初' },
    name: { ru: 'Байкальский ледовый марафон', en: 'Baikal Ice Marathon', zh: '贝加尔湖冰上马拉松' },
    desc: {
      ru: 'Уникальный забег прямо по льду Байкала с одного берега на другой — одно из самых необычных спортивных событий мира.',
      en: 'A unique run straight across Baikal’s ice from shore to shore — one of the most unusual sporting events on Earth.',
      zh: '在贝加尔湖冰面上从一岸跑向另一岸的独特赛事——世界上最不寻常的体育活动之一。',
    },
  },
  {
    icon: 'sunny-outline',
    when: { ru: 'Июнь–июль', en: 'June–July', zh: '6–7月' },
    name: { ru: 'Сурхарбан', en: 'Surkharban', zh: '苏尔哈尔班节' },
    desc: {
      ru: 'Летний бурятский праздник с национальными играми: стрельба из лука, борьба и конные скачки — «три игры мужей».',
      en: 'A summer Buryat festival of national games: archery, wrestling and horse racing — the “three games of men.”',
      zh: '布里亚特人的夏季节庆，含民族竞技：射箭、摔跤与赛马——“男儿三艺”。',
    },
  },
  {
    icon: 'boat-outline',
    when: { ru: 'Лето', en: 'Summer', zh: '夏季' },
    name: { ru: 'Ердынские игры', en: 'Yordyn Games', zh: '叶尔登竞技会' },
    desc: {
      ru: 'Древний межнациональный праздник народов Прибайкалья у священной горы Ёрд с обрядами, песнями и хороводом ёхор.',
      en: 'An ancient inter-ethnic festival of the Baikal peoples by the sacred Yord hill, with rites, songs and the yokhor round dance.',
      zh: '贝加尔各民族在圣山叶尔德举行的古老节庆，含祭仪、歌唱与“约霍尔”环舞。',
    },
  },
  {
    icon: 'musical-notes-outline',
    when: { ru: 'Сентябрь', en: 'September', zh: '9月' },
    name: { ru: '«Звёзды на Байкале»', en: 'Stars on Baikal', zh: '“贝加尔之星”音乐节' },
    desc: {
      ru: 'Международный музыкальный фестиваль классики в Иркутске, который основал пианист Денис Мацуев.',
      en: 'An international classical music festival in Irkutsk, founded by the pianist Denis Matsuev.',
      zh: '在伊尔库茨克举办的国际古典音乐节，由钢琴家杰尼斯·马祖耶夫创办。',
    },
  },
  {
    icon: 'restaurant-outline',
    when: { ru: 'Конец зимы', en: 'Late winter', zh: '冬末' },
    name: { ru: 'Масленица', en: 'Maslenitsa', zh: '谢肉节' },
    desc: {
      ru: 'Проводы зимы с блинами, гуляньями и сжиганием чучела — шумный русский праздник в 130-м квартале и Тальцах.',
      en: 'Farewell to winter with pancakes, festivities and the burning of an effigy — a lively Russian holiday in the 130th Quarter and Taltsy.',
      zh: '以薄饼、游乐与焚烧稻草人送别冬天——在130号街区和塔利茨举行的热闹俄式节日。',
    },
  },
]
