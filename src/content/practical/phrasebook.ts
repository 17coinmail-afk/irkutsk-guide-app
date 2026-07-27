// Разговорник: русские фразы для гостей + перевод (en/zh) + латинская транскрипция.
// В UI: крупная русская фраза (её говорят вслух), транскрипция, значение на языке интерфейса.
import type { Tri } from '../../lib/weather'

export interface Phrase {
  ru: string // фраза, которую произносят вслух
  translit: string // как звучит (латиница)
  en: string
  zh: string
}
export interface PhraseCategory {
  id: string
  icon: string
  title: Tri
  phrases: Phrase[]
}

export const PHRASEBOOK: PhraseCategory[] = [
  {
    id: 'basics',
    icon: 'chatbubbles-outline',
    title: { ru: 'Основное', en: 'Basics', zh: '基础' },
    phrases: [
      { ru: 'Здравствуйте', translit: 'Zdravstvuyte', en: 'Hello', zh: '你好' },
      { ru: 'Спасибо', translit: 'Spasibo', en: 'Thank you', zh: '谢谢' },
      { ru: 'Пожалуйста', translit: 'Pozhaluysta', en: 'Please / You’re welcome', zh: '请 / 不客气' },
      { ru: 'Да / Нет', translit: 'Da / Net', en: 'Yes / No', zh: '是 / 不是' },
      { ru: 'Извините', translit: 'Izvinite', en: 'Excuse me / Sorry', zh: '对不起' },
      { ru: 'Вы говорите по-английски?', translit: 'Vy govorite po-angliyski?', en: 'Do you speak English?', zh: '您会说英语吗？' },
      { ru: 'Я не понимаю', translit: 'Ya ne ponimayu', en: 'I don’t understand', zh: '我不明白' },
    ],
  },
  {
    id: 'directions',
    icon: 'navigate-outline',
    title: { ru: 'В дороге', en: 'Getting around', zh: '出行' },
    phrases: [
      { ru: 'Где находится…?', translit: 'Gde nakhoditsya…?', en: 'Where is…?', zh: '……在哪里？' },
      { ru: 'Сколько стоит проезд?', translit: 'Skolko stoit proyezd?', en: 'How much is the fare?', zh: '车费多少钱？' },
      { ru: 'Остановите здесь, пожалуйста', translit: 'Ostanovite zdes, pozhaluysta', en: 'Stop here, please', zh: '请在这里停车' },
      { ru: 'Как доехать до Байкала?', translit: 'Kak doyekhat do Baykala?', en: 'How do I get to Baikal?', zh: '怎么去贝加尔湖？' },
      { ru: 'Вызовите такси, пожалуйста', translit: 'Vyzovite taksi, pozhaluysta', en: 'Call a taxi, please', zh: '请帮我叫出租车' },
    ],
  },
  {
    id: 'food',
    icon: 'restaurant-outline',
    title: { ru: 'Еда и кафе', en: 'Food & cafés', zh: '餐饮' },
    phrases: [
      { ru: 'Меню, пожалуйста', translit: 'Menyu, pozhaluysta', en: 'The menu, please', zh: '请给我菜单' },
      { ru: 'Счёт, пожалуйста', translit: 'Schyot, pozhaluysta', en: 'The bill, please', zh: '请结账' },
      { ru: 'Это вкусно!', translit: 'Eto vkusno!', en: 'This is delicious!', zh: '很好吃！' },
      { ru: 'Без мяса, пожалуйста', translit: 'Bez myasa, pozhaluysta', en: 'No meat, please', zh: '请不要肉' },
      { ru: 'Воду, пожалуйста', translit: 'Vodu, pozhaluysta', en: 'Water, please', zh: '请给我水' },
    ],
  },
  {
    id: 'money',
    icon: 'card-outline',
    title: { ru: 'Деньги и покупки', en: 'Money & shopping', zh: '购物付款' },
    phrases: [
      { ru: 'Сколько это стоит?', translit: 'Skolko eto stoit?', en: 'How much is this?', zh: '这个多少钱？' },
      { ru: 'Можно картой?', translit: 'Mozhno kartoy?', en: 'Can I pay by card?', zh: '可以刷卡吗？' },
      { ru: 'Только наличные', translit: 'Tolko nalichnye', en: 'Cash only', zh: '只收现金' },
      { ru: 'Где банкомат?', translit: 'Gde bankomat?', en: 'Where is an ATM?', zh: '取款机在哪里？' },
    ],
  },
  {
    id: 'emergency',
    icon: 'medkit-outline',
    title: { ru: 'Помощь', en: 'Help', zh: '求助' },
    phrases: [
      { ru: 'Помогите!', translit: 'Pomogite!', en: 'Help!', zh: '救命！' },
      { ru: 'Вызовите скорую', translit: 'Vyzovite skoruyu', en: 'Call an ambulance', zh: '请叫救护车' },
      { ru: 'Мне нужен врач', translit: 'Mne nuzhen vrach', en: 'I need a doctor', zh: '我需要看医生' },
      { ru: 'Я потерялся / потерялась', translit: 'Ya poteryalsya / poteryalas', en: 'I am lost', zh: '我迷路了' },
      { ru: 'Позвоните в полицию', translit: 'Pozvonite v politsiyu', en: 'Call the police', zh: '请报警' },
    ],
  },
  {
    id: 'numbers',
    icon: 'calculator-outline',
    title: { ru: 'Числа', en: 'Numbers', zh: '数字' },
    phrases: [
      { ru: 'Один', translit: 'Odin', en: 'One', zh: '一' },
      { ru: 'Два', translit: 'Dva', en: 'Two', zh: '二' },
      { ru: 'Три', translit: 'Tri', en: 'Three', zh: '三' },
      { ru: 'Пять', translit: 'Pyat', en: 'Five', zh: '五' },
      { ru: 'Десять', translit: 'Desyat', en: 'Ten', zh: '十' },
      { ru: 'Сто', translit: 'Sto', en: 'One hundred', zh: '一百' },
      { ru: 'Тысяча', translit: 'Tysyacha', en: 'One thousand', zh: '一千' },
    ],
  },
]
