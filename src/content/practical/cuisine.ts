// «Что попробовать» — блюда и продукты байкальской/сибирской кухни. Трёхъязычно, офлайн.
import type { Tri } from '../../lib/weather'

export interface FoodItem { icon: string; name: Tri; desc: Tri }

export const CUISINE: FoodItem[] = [
  {
    icon: 'fish-outline',
    name: { ru: 'Омуль', en: 'Omul', zh: '奥木鱼' },
    desc: {
      ru: 'Главный специалитет Байкала — эндемичная рыба семейства сиговых. Пробуйте горячего и холодного копчения, солёный или на рожне у костра.',
      en: 'Baikal’s signature — an endemic whitefish. Try it hot- or cold-smoked, salted, or grilled on a spit over a fire.',
      zh: '贝加尔湖的招牌——特有的白鲑。可尝热熏、冷熏、盐渍，或在篝火上串烤。',
    },
  },
  {
    icon: 'restaurant-outline',
    name: { ru: 'Буузы (позы)', en: 'Buuzy (pozy)', zh: '布里亚特包子' },
    desc: {
      ru: 'Бурятские паровые пельмени с сочной начинкой из рубленого мяса. Едят руками: надкусывают и выпивают горячий бульон изнутри.',
      en: 'Buryat steamed dumplings with juicy minced meat. Eaten by hand: bite a hole and drink the hot broth from inside.',
      zh: '布里亚特蒸饺，内含多汁的碎肉。用手拿着吃：咬开一口，先喝里面的热汤。',
    },
  },
  {
    icon: 'snow-outline',
    name: { ru: 'Сагудай и расколотка', en: 'Sagudai & raskolotka', zh: '生鱼片与冻生鱼' },
    desc: {
      ru: 'Сагудай — свежий омуль, слегка маринованный с луком и специями. Расколотка — замороженная сырая рыба, которую «раскалывают» и едят стружкой.',
      en: 'Sagudai is fresh omul lightly marinated with onion and spices. Raskolotka is frozen raw fish, cracked apart and eaten in shavings.',
      zh: '“萨古代”是用洋葱和香料稍加腌制的新鲜奥木鱼；“拉斯科洛特卡”则是冷冻生鱼，敲碎后削成薄片食用。',
    },
  },
  {
    icon: 'leaf-outline',
    name: { ru: 'Кедровые орехи', en: 'Pine nuts', zh: '松子' },
    desc: {
      ru: 'Орешки сибирского кедра — местное лакомство и лучший съедобный сувенир. Из них также делают полезное кедровое масло и «кедровое молочко».',
      en: 'Siberian pine nuts are a local treat and the best edible souvenir. They also yield healthy cedar-nut oil and “cedar milk.”',
      zh: '西伯利亚红松的松子是当地美味，也是最佳的可食纪念品。还可榨取有益健康的松子油与“松子奶”。',
    },
  },
  {
    icon: 'nutrition-outline',
    name: { ru: 'Грузди и черемша', en: 'Milk mushrooms & wild garlic', zh: '乳菇与野蒜' },
    desc: {
      ru: 'Солёные грузди — классическая сибирская закуска. Черемша (дикий чеснок) идёт в салаты и пироги; её собирают ранней весной.',
      en: 'Salted milk mushrooms are a classic Siberian appetiser. Wild garlic (cheremsha) goes into salads and pies, gathered in early spring.',
      zh: '盐渍乳菇是经典的西伯利亚小菜。野蒜（cheremsha）用于沙拉与馅饼，于早春采摘。',
    },
  },
  {
    icon: 'flower-outline',
    name: { ru: 'Ягоды Сибири', en: 'Siberian berries', zh: '西伯利亚浆果' },
    desc: {
      ru: 'Брусника, голубика, облепиха и клюква — из них варят морсы, варенье и добавляют в десерты. Байкальск славится своей клубникой.',
      en: 'Lingonberry, blueberry, sea buckthorn and cranberry go into fruit drinks, jams and desserts. Baikalsk is famous for its strawberries.',
      zh: '越橘、蓝莓、沙棘与蔓越莓，用来做果饮、果酱和甜点。拜卡尔斯克以草莓闻名。',
    },
  },
  {
    icon: 'cafe-outline',
    name: { ru: 'Чай саган-дайля', en: 'Sagan-dayla tea', zh: '萨根达拉茶' },
    desc: {
      ru: 'Ароматный горный чай из бурятской травы, дающий бодрость. Подают с мёдом; заодно из трав делают знаменитый согревающий сбор.',
      en: 'A fragrant, invigorating mountain tea from a Buryat herb. Served with honey; local herbal blends are famous for warming you up.',
      zh: '用布里亚特草药泡制的芳香提神山茶，佐以蜂蜜。当地的草药茶也以暖身而闻名。',
    },
  },
  {
    icon: 'pizza-outline',
    name: { ru: 'Сибирские пельмени', en: 'Siberian pelmeni', zh: '西伯利亚饺子' },
    desc: {
      ru: 'Маленькие пельмени, которые лепили на всю зиму и хранили на морозе. Подают со сметаной, маслом или в бульоне.',
      en: 'Small dumplings once made for the whole winter and stored in the frost. Served with sour cream, butter or in broth.',
      zh: '小巧的饺子，昔日为整个冬天而包制并存放于严寒中。可配酸奶油、黄油或连汤食用。',
    },
  },
]
