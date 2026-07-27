// «Как добраться» — кураторские данные по ключевым направлениям из Иркутска.
// Трёхъязычно, офлайн (в бандле). Цены/время ориентировочные — помечено в UI.
import type { Tri } from '../../lib/weather'

export interface TransportOption {
  mode: Tri
  duration: Tri
  price: Tri
  note: Tri
}
export interface TransportRoute {
  id: string
  icon: string // Ionicons
  title: Tri
  summary: Tri
  options: TransportOption[]
}

export const TRANSPORT: TransportRoute[] = [
  {
    id: 'airport',
    icon: 'airplane-outline',
    title: { ru: 'Аэропорт → центр', en: 'Airport → city centre', zh: '机场 → 市中心' },
    summary: {
      ru: 'Аэропорт Иркутска (IKT) в черте города, до центра 15–20 минут.',
      en: 'Irkutsk airport (IKT) is inside the city; 15–20 min to the centre.',
      zh: '伊尔库茨克机场 (IKT) 位于市区，到市中心约 15–20 分钟。',
    },
    options: [
      {
        mode: { ru: 'Маршрутка / автобус', en: 'Minibus / bus', zh: '小巴 / 公交' },
        duration: { ru: '20–35 мин', en: '20–35 min', zh: '20–35 分钟' },
        price: { ru: '≈ 30–40 ₽', en: '≈ 30–40 ₽', zh: '≈ 30–40 卢布' },
        note: {
          ru: 'Маршруты № 80, 90 и др. идут к центру и ж/д вокзалу. Оплата у водителя.',
          en: 'Routes 80, 90 and others go to the centre and railway station. Pay the driver.',
          zh: '80、90 等线路开往市中心和火车站。上车付款给司机。',
        },
      },
      {
        mode: { ru: 'Такси', en: 'Taxi', zh: '出租车' },
        duration: { ru: '15–20 мин', en: '15–20 min', zh: '15–20 分钟' },
        price: { ru: '≈ 300–500 ₽', en: '≈ 300–500 ₽', zh: '≈ 300–500 卢布' },
        note: {
          ru: 'Яндекс Go / Максим работают в городе. Заказ через приложение дешевле, чем на стоянке.',
          en: 'Yandex Go / Maxim work in the city. Ordering in-app is cheaper than the rank.',
          zh: 'Yandex Go / Maxim 可用。用 App 叫车比在候客区便宜。',
        },
      },
    ],
  },
  {
    id: 'listvyanka',
    icon: 'boat-outline',
    title: { ru: 'Листвянка (Байкал)', en: 'Listvyanka (Baikal)', zh: '利斯特维扬卡（贝加尔湖）' },
    summary: {
      ru: 'Ближайший выход к Байкалу — 65 км. Самая простая однодневная поездка на озеро.',
      en: 'The nearest access to Baikal — 65 km. The easiest day trip to the lake.',
      zh: '最近的贝加尔湖出口——65 公里。最方便的一日游。',
    },
    options: [
      {
        mode: { ru: 'Маршрутка', en: 'Minibus', zh: '小巴' },
        duration: { ru: '1–1,5 часа', en: '1–1.5 hours', zh: '1–1.5 小时' },
        price: { ru: '≈ 150–250 ₽', en: '≈ 150–250 ₽', zh: '≈ 150–250 卢布' },
        note: {
          ru: 'От автовокзала (ул. Октябрьской Революции). Летом — часто, зимой — реже. Приезжайте заранее.',
          en: 'From the bus station (Oktyabrskoy Revolyutsii St). Frequent in summer, rarer in winter. Come early.',
          zh: '从长途汽车站（十月革命街）发车。夏季班次多，冬季较少。请提前到。',
        },
      },
      {
        mode: { ru: 'Такси', en: 'Taxi', zh: '出租车' },
        duration: { ru: '≈ 1 час', en: '≈ 1 hour', zh: '≈ 1 小时' },
        price: { ru: '≈ 1500–2000 ₽', en: '≈ 1500–2000 ₽', zh: '≈ 1500–2000 卢布' },
        note: {
          ru: 'Удобно на компанию 3–4 человека. Можно договориться на поездку туда-обратно с ожиданием.',
          en: 'Good for a group of 3–4. You can agree a round trip with waiting.',
          zh: '适合 3–4 人拼车。可谈往返并等候。',
        },
      },
    ],
  },
  {
    id: 'olkhon',
    icon: 'car-outline',
    title: { ru: 'Ольхон / Хужир', en: 'Olkhon / Khuzhir', zh: '奥尔洪岛 / 胡日尔' },
    summary: {
      ru: 'Главный остров Байкала — 250 км, включая паром. Планируйте минимум 2 дня.',
      en: 'The main island of Baikal — 250 km including a ferry. Plan at least 2 days.',
      zh: '贝加尔湖主岛——250 公里（含轮渡）。建议至少 2 天。',
    },
    options: [
      {
        mode: { ru: 'Маршрутка + паром', en: 'Minibus + ferry', zh: '小巴 + 轮渡' },
        duration: { ru: '5–6 часов', en: '5–6 hours', zh: '5–6 小时' },
        price: { ru: '≈ 1000–1300 ₽', en: '≈ 1000–1300 ₽', zh: '≈ 1000–1300 卢布' },
        note: {
          ru: 'От автовокзала, обычно утром. Паром «Ольхонские ворота» бесплатный. Зимой — ледовая переправа, в межсезонье остров труднодоступен.',
          en: 'From the bus station, usually in the morning. The "Olkhon Gate" ferry is free. In winter it is an ice road; between seasons the island is hard to reach.',
          zh: '从长途汽车站发车，通常上午。“奥尔洪门”轮渡免费。冬季走冰上通道；换季期间上岛困难。',
        },
      },
      {
        mode: { ru: 'Трансфер / тур', en: 'Transfer / tour', zh: '接送 / 旅行团' },
        duration: { ru: '≈ 5 часов', en: '≈ 5 hours', zh: '≈ 5 小时' },
        price: { ru: 'от ≈ 1500 ₽/чел', en: 'from ≈ 1500 ₽/pers', zh: '≈ 1500 卢布/人 起' },
        note: {
          ru: 'Турфирмы возят от двери до Хужира с остановками. Удобно с багажом и зимой.',
          en: 'Agencies drive door-to-Khuzhir with stops. Convenient with luggage and in winter.',
          zh: '旅行社提供从住处直达胡日尔并含停靠点。带行李或冬季出行更方便。',
        },
      },
    ],
  },
  {
    id: 'kbzhd',
    icon: 'train-outline',
    title: { ru: 'Кругобайкальская ж/д', en: 'Circum-Baikal Railway', zh: '环贝加尔湖铁路' },
    summary: {
      ru: 'Историческая дорога вдоль берега — тоннели, мосты, виды. Обычно как экскурсия на весь день.',
      en: 'A historic line along the shore — tunnels, bridges, views. Usually a full-day excursion.',
      zh: '沿湖历史铁路——隧道、桥梁、美景。通常为一日游行程。',
    },
    options: [
      {
        mode: { ru: 'Туристический поезд', en: 'Tourist train', zh: '旅游列车' },
        duration: { ru: 'весь день', en: 'full day', zh: '全天' },
        price: { ru: 'зависит от тура', en: 'depends on tour', zh: '视行程而定' },
        note: {
          ru: 'Сезонные рейсы, места ограничены — бронируйте заранее. Маршрут: Иркутск → Слюдянка → берег → Порт Байкал.',
          en: 'Seasonal, limited seats — book ahead. Route: Irkutsk → Slyudyanka → shore → Port Baikal.',
          zh: '季节性运行、席位有限，请提前预订。路线：伊尔库茨克 → 斯柳江卡 → 湖岸 → 贝加尔港。',
        },
      },
      {
        mode: { ru: 'Электричка', en: 'Local train', zh: '市郊列车' },
        duration: { ru: '≈ 4–5 часов', en: '≈ 4–5 hours', zh: '≈ 4–5 小时' },
        price: { ru: 'бюджетно', en: 'budget', zh: '经济' },
        note: {
          ru: 'Для самостоятельных: электричка ходит по расписанию, дешевле, но реже. Уточняйте на вокзале.',
          en: 'For independent travellers: the local train is cheaper but infrequent. Check the timetable at the station.',
          zh: '适合自助游：市郊列车更便宜但班次少。请在车站确认时刻表。',
        },
      },
    ],
  },
]
