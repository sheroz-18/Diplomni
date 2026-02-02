// Dictionary Database with comprehensive mock data for Tajik, English, and Russian

export interface DictionaryEntry {
  partOfSpeech: string;
  meaning: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryData {
  [language: string]: {
    [word: string]: DictionaryEntry[];
  };
}

export const dictionaryDatabase: DictionaryData = {
  tj: {
    // Basic greetings and common phrases
    салом: [
      {
        partOfSpeech: "Фиал",
        meaning: "Сўраф карди таҳиёт ва хўш омадан",
        example: "Салом! Ту чиро мекунӣ?",
        synonyms: ["қабули миҳман", "табрик"],
        antonyms: ["хадо", "пока"],
      },
    ],
    хода: [
      {
        partOfSpeech: "Фиал",
        meaning: "Сўраф карди ҷудошавӣ",
        example: "Хода! То паён ҳафта мебарад.",
        synonyms: ["пока", "салом"],
        antonyms: ["салом", "мон-о"],
      },
    ],
    шукрон: [
      {
        partOfSpeech: "Фиал",
        meaning: "Ифодаи миҳрубонӣ барои ёрӣ расонидан",
        example: "Шукрон! Ду монанда кӯмак кард.",
        synonyms: ["тшакруйи"],
        antonyms: [],
      },
    ],
    // Nature and elements
    об: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Маводдати зоҳирӣ, шаффоф, ба мошравӣ истифода мешави",
        example: "Об ҳажми калон дорад.",
        synonyms: ["овқоъ"],
        antonyms: ["хушк"],
      },
    ],
    оташ: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳарорат ва нури зоҳирии ишъол",
        example: "Оташ гармӣ медихад.",
        synonyms: ["атиш"],
        antonyms: ["салтанат"],
      },
    ],
    фарғона: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Объёни кӯҳсториёнҳои Марказӣ Осиё",
        example: "Фарғона дарахтҳои сабз дорад.",
        synonyms: [],
        antonyms: [],
      },
    ],
    // Emotions and feelings
    мӯҳаббат: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳисси меҳр, вафодорӣ ва ғамхориӣ",
        example: "Мӯҳаббат фарзанди хуб аст.",
        synonyms: ["меҳр", "вафодорӣ"],
        antonyms: ["нафрат", "душманӣ"],
      },
    ],
    хўшҳолӣ: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳисси рўҳии сайҳар ва қаноатмандӣ",
        example: "Хўшҳолӣ дилро рўшан мекунад.",
        synonyms: ["шодӣ", "хўҳал"],
        antonyms: ["ғамгинӣ", "ғам"],
      },
    ],
    гам: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳисси рўҳии номуса ва дилтанҷӣ",
        example: "Гам дилро қалқ медихад.",
        synonyms: ["ғамгинӣ", "таъсaф"],
        antonyms: ["шодӣ", "хўшҳолӣ"],
      },
    ],
    // Family and relationships
    дӯст: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Касе, ки дӯстӣ меҷуй ва бо вай таваккол доред",
        example: "Ӯ дӯсти бахши ман аст.",
        synonyms: ["ҳамрохӣ", "ҳамрозӣ"],
        antonyms: ["душман", "адў"],
      },
    ],
    оила: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Гурўҳи аъзои ба якдигар вобастаи хўнӣ",
        example: "Оилаи ман бузург аст.",
        synonyms: ["хона", "қабила"],
        antonyms: [],
      },
    ],
    модар: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Зани сершин, аҳли масъула аз парвариши фарзанд",
        example: "Модари ман духтур аст.",
        synonyms: ["модор"],
        antonyms: [],
      },
    ],
    падар: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Мард асоси оила, падари фарзанд",
        example: "Падари ман муҳанддис аст.",
        synonyms: ["аб"],
        antonyms: [],
      },
    ],
    брадар: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Писари мода ва падар ё писаре ба иршоди хун",
        example: "Брадари ман донишҷӯ аст.",
        synonyms: ["браҳ"],
        antonyms: [],
      },
    ],
    хоҳар: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Духтари мода ва падар ё духтаре ба иршоди хун",
        example: "Хоҳари ман муаллим аст.",
        synonyms: ["хўҳар"],
        antonyms: [],
      },
    ],
    // Work and daily activities
    кор: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Фаолияти рўҳи ва бадан бо мақсади ба даст овардани натиҷа",
        example: "Кор ҳари ман сахт аст.",
        synonyms: ["вазифа", "мҷарӣ"],
        antonyms: ["отдыхок", "кушиш"],
      },
    ],
    // Food items
    наан: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Таъом асосии адам аз ғалла тайор",
        example: "Наан гарм истод.",
        synonyms: ["лавош", "чапоти"],
        antonyms: [],
      },
    ],
    дӯд: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Шир буҳ гов",
        example: "Дӯд фойданоқ аст.",
        synonyms: ["кумис"],
        antonyms: [],
      },
    ],
    // Colors
    сафед: [
      {
        partOfSpeech: "Сифат",
        meaning: "Ранги ҷӯлӯҳӣ, ҳаштҷи қарор",
        example: "Дарҳо сафед аст.",
        synonyms: ["вайти"],
        antonyms: ["сиёҳ"],
      },
    ],
    сиёҳ: [
      {
        partOfSpeech: "Сифат",
        meaning: "Ранги тарик, беҳамон",
        example: "Абии сиёҳ аст.",
        synonyms: [],
        antonyms: ["сафед", "сябз"],
      },
    ],
    сабз: [
      {
        partOfSpeech: "Сифат",
        meaning: "Ранги анҷир ва таҳқайқ",
        example: "Деҳат сабз ва қушноқ аст.",
        synonyms: ["сӯҳат"],
        antonyms: ["сухк"],
      },
    ],
    суркҳ: [
      {
        partOfSpeech: "Сифат",
        meaning: "Ранги оташ ва томат",
        example: "Онҷ суркҳ аст.",
        synonyms: ["қермез"],
        antonyms: ["сомюқ"],
      },
    ],
  },
  en: {
    // Basic greetings
    hello: [
      {
        partOfSpeech: "Interjection",
        meaning: "A polite greeting or expression of goodwill",
        example: "Hello! How are you doing today?",
        synonyms: ["hi", "hey", "greetings"],
        antonyms: ["goodbye", "farewell"],
      },
    ],
    goodbye: [
      {
        partOfSpeech: "Interjection",
        meaning: "An expression used when parting",
        example: "Goodbye! See you next time.",
        synonyms: ["bye", "farewell", "see you"],
        antonyms: ["hello", "welcome"],
      },
    ],
    please: [
      {
        partOfSpeech: "Adverb",
        meaning: "A polite word used to make a request more courteous",
        example: "Please pass me the salt.",
        synonyms: ["kindly"],
        antonyms: [],
      },
    ],
    thank: [
      {
        partOfSpeech: "Verb",
        meaning: "To express gratitude or appreciation",
        example: "I thank you for your help.",
        synonyms: ["appreciate", "acknowledge"],
        antonyms: [],
      },
    ],
    // Nature
    water: [
      {
        partOfSpeech: "Noun",
        meaning: "A colorless, transparent, odorless liquid essential for life",
        example: "Water is essential for all living organisms.",
        synonyms: ["aqua", "H2O"],
        antonyms: [],
      },
    ],
    fire: [
      {
        partOfSpeech: "Noun",
        meaning: "The light and heat produced by burning",
        example: "Fire provides warmth and light.",
        synonyms: ["flames", "blaze"],
        antonyms: ["ice", "water"],
      },
    ],
    tree: [
      {
        partOfSpeech: "Noun",
        meaning: "A woody plant with a stem and leaves",
        example: "The tree provides shade and oxygen.",
        synonyms: ["oak", "pine", "maple"],
        antonyms: [],
      },
    ],
    flower: [
      {
        partOfSpeech: "Noun",
        meaning: "The reproductive part of a plant, typically colorful",
        example: "The flower blooms in spring.",
        synonyms: ["blossom", "bloom"],
        antonyms: [],
      },
    ],
    // Emotions
    love: [
      {
        partOfSpeech: "Noun",
        meaning: "An intense feeling of deep affection and care",
        example: "Love is a powerful emotion.",
        synonyms: ["affection", "devotion", "care"],
        antonyms: ["hate", "hatred"],
      },
    ],
    happy: [
      {
        partOfSpeech: "Adjective",
        meaning: "Feeling or showing pleasure and contentment",
        example: "She is happy with her achievement.",
        synonyms: ["joyful", "cheerful", "glad"],
        antonyms: ["sad", "unhappy"],
      },
    ],
    sad: [
      {
        partOfSpeech: "Adjective",
        meaning: "Feeling sorrow or unhappiness",
        example: "He felt sad about leaving his friends.",
        synonyms: ["sorrowful", "unhappy", "depressed"],
        antonyms: ["happy", "joyful"],
      },
    ],
    // Family
    friend: [
      {
        partOfSpeech: "Noun",
        meaning: "A person with whom one has a bond of mutual affection",
        example: "He is my best friend.",
        synonyms: ["companion", "mate", "buddy"],
        antonyms: ["enemy", "foe"],
      },
    ],
    family: [
      {
        partOfSpeech: "Noun",
        meaning: "A group of people related by blood or marriage",
        example: "My family is very large and close-knit.",
        synonyms: ["relatives", "kin"],
        antonyms: [],
      },
    ],
    mother: [
      {
        partOfSpeech: "Noun",
        meaning: "A female parent",
        example: "My mother is a doctor.",
        synonyms: ["mom", "mum", "parent"],
        antonyms: [],
      },
    ],
    father: [
      {
        partOfSpeech: "Noun",
        meaning: "A male parent",
        example: "My father is an engineer.",
        synonyms: ["dad", "pop", "parent"],
        antonyms: [],
      },
    ],
    brother: [
      {
        partOfSpeech: "Noun",
        meaning: "A male sibling",
        example: "My brother is studying medicine.",
        synonyms: ["sibling"],
        antonyms: [],
      },
    ],
    sister: [
      {
        partOfSpeech: "Noun",
        meaning: "A female sibling",
        example: "My sister works in technology.",
        synonyms: ["sibling"],
        antonyms: [],
      },
    ],
    // Work
    work: [
      {
        partOfSpeech: "Noun",
        meaning:
          "Activity involving mental or physical effort done in order to achieve a purpose",
        example: "Hard work leads to success.",
        synonyms: ["job", "labor", "task"],
        antonyms: ["rest", "leisure"],
      },
    ],
    // Food
    bread: [
      {
        partOfSpeech: "Noun",
        meaning: "A staple food made from flour and water",
        example: "Fresh bread smells wonderful.",
        synonyms: ["loaf"],
        antonyms: [],
      },
    ],
    milk: [
      {
        partOfSpeech: "Noun",
        meaning: "A white liquid produced by mammals",
        example: "Milk is rich in calcium.",
        synonyms: ["dairy"],
        antonyms: [],
      },
    ],
    // Colors
    white: [
      {
        partOfSpeech: "Adjective",
        meaning: "The color of milk or snow",
        example: "The walls are white.",
        synonyms: ["pale", "ivory"],
        antonyms: ["black"],
      },
    ],
    black: [
      {
        partOfSpeech: "Adjective",
        meaning: "The darkest color, absence of light",
        example: "He wore a black suit.",
        synonyms: ["dark"],
        antonyms: ["white"],
      },
    ],
    green: [
      {
        partOfSpeech: "Adjective",
        meaning: "The color of grass and leaves",
        example: "The garden is full of green plants.",
        synonyms: ["emerald", "verdant"],
        antonyms: [],
      },
    ],
    red: [
      {
        partOfSpeech: "Adjective",
        meaning: "The color of blood or fire",
        example: "She wore a red dress.",
        synonyms: ["crimson", "scarlet"],
        antonyms: [],
      },
    ],
  },
  ru: {
    // Basic greetings
    привет: [
      {
        partOfSpeech: "Междометие",
        meaning: "Вежливое приветствие при встрече",
        example: "Привет! Как дела?",
        synonyms: ["здравствуй", "привет"],
        antonyms: ["прощай", "до свидания"],
      },
    ],
    пока: [
      {
        partOfSpeech: "Междометие",
        meaning: "Выражение при расставании",
        example: "Пока! До встречи!",
        synonyms: ["до свидания", "до встречи"],
        antonyms: ["привет", "здравствуй"],
      },
    ],
    спасибо: [
      {
        partOfSpeech: "Междометие",
        meaning: "Выражение благодарности",
        example: "Спасибо за помощь!",
        synonyms: ["благодарю"],
        antonyms: [],
      },
    ],
    пожалуйста: [
      {
        partOfSpeech: "Наречие",
        meaning: "Вежливое слово для выполнения просьбы",
        example: "Пожалуйста, помогите мне.",
        synonyms: [],
        antonyms: [],
      },
    ],
    // Nature
    вода: [
      {
        partOfSpeech: "Существительное",
        meaning: "Бесцветная прозрачная жидкость, необходимая для жизни",
        example: "Вода необходима для всех живых организмов.",
        synonyms: ["влага"],
        antonyms: [],
      },
    ],
    огонь: [
      {
        partOfSpeech: "Существительное",
        meaning: "Свет и тепло при горении",
        example: "Огонь дает тепло и свет.",
        synonyms: ["пламя", "костер"],
        antonyms: ["вода", "лед"],
      },
    ],
    дерево: [
      {
        partOfSpeech: "Существительное",
        meaning: "Растение с деревянным стволом и листьями",
        example: "Дерево дает кислород и тень.",
        synonyms: ["древо"],
        antonyms: [],
      },
    ],
    цветок: [
      {
        partOfSpeech: "Существительное",
        meaning: "Репродуктивная часть растения, обычно красивая",
        example: "Цветок расцветает весной.",
        synonyms: ["соцветие"],
        antonyms: [],
      },
    ],
    // Emotions
    любовь: [
      {
        partOfSpeech: "Существительное",
        meaning: "Интенсивное чувство глубокой привязанности и заботы",
        example: "Любовь - это мощное чувство.",
        synonyms: ["привязанность", "обожание"],
        antonyms: ["ненависть", "вражда"],
      },
    ],
    счастье: [
      {
        partOfSpeech: "Существительное",
        meaning: "Состояние радости и удовлетворения",
        example: "Счастье приходит от гармонии.",
        synonyms: ["радость", "блаженство"],
        antonyms: ["грусть", "печаль"],
      },
    ],
    грусть: [
      {
        partOfSpeech: "Существительное",
        meaning: "Состояние печали и уныния",
        example: "Грусть овладела его сердцем.",
        synonyms: ["печаль", "уныние"],
        antonyms: ["радость", "счастье"],
      },
    ],
    // Family
    друг: [
      {
        partOfSpeech: "Существительное",
        meaning: "Человек, с которым связывает узы взаимной привязанности",
        example: "Он мой лучший друг.",
        synonyms: ["товарищ", "приятель"],
        antonyms: ["враг", "недруг"],
      },
    ],
    семья: [
      {
        partOfSpeech: "Существительное",
        meaning: "Группа людей, связанных кровным родством",
        example: "Моя семья очень большая.",
        synonyms: ["род", "родня"],
        antonyms: [],
      },
    ],
    мать: [
      {
        partOfSpeech: "Существительное",
        meaning: "Женщина-родитель",
        example: "Моя мать врач.",
        synonyms: ["мама"],
        antonyms: [],
      },
    ],
    отец: [
      {
        partOfSpeech: "Существительное",
        meaning: "Мужчина-родитель",
        example: "Мой отец инженер.",
        synonyms: ["папа", "батюшка"],
        antonyms: [],
      },
    ],
    брат: [
      {
        partOfSpeech: "Существительное",
        meaning: "Мужчина-брат",
        example: "Мой брат изучает медицину.",
        synonyms: [],
        antonyms: [],
      },
    ],
    сестра: [
      {
        partOfSpeech: "Существительное",
        meaning: "Женщина-сестра",
        example: "Моя сестра работает в технологии.",
        synonyms: [],
        antonyms: [],
      },
    ],
    // Work
    работа: [
      {
        partOfSpeech: "Существительное",
        meaning: "Деятельность, требующая умственных или физических усилий",
        example: "Упорная работа приводит к успеху.",
        synonyms: ["труд", "дело"],
        antonyms: ["отдых", "досуг"],
      },
    ],
    // Food
    хлеб: [
      {
        partOfSpeech: "Существительное",
        meaning: "Основной продукт, сделанный из муки и воды",
        example: "Свежий хлеб пахнет чудесно.",
        synonyms: ["булка"],
        antonyms: [],
      },
    ],
    молоко: [
      {
        partOfSpeech: "Существительное",
        meaning: "Белая жидкость, производимая млекопитающими",
        example: "Молоко богато кальцием.",
        synonyms: ["сыворотка"],
        antonyms: [],
      },
    ],
    // Colors
    белый: [
      {
        partOfSpeech: "Прилагательное",
        meaning: "Цвет молока или снега",
        example: "Стены белые.",
        synonyms: ["снежный"],
        antonyms: ["черный"],
      },
    ],
    черный: [
      {
        partOfSpeech: "Прилагательное",
        meaning: "Самый темный цвет, отсутствие света",
        example: "Он надел черный костюм.",
        synonyms: ["темный"],
        antonyms: ["белый"],
      },
    ],
    зеленый: [
      {
        partOfSpeech: "Прилагательное",
        meaning: "Цвет травы и листьев",
        example: "Сад полон зеленых растений.",
        synonyms: ["изумрудный"],
        antonyms: [],
      },
    ],
    красный: [
      {
        partOfSpeech: "Прилагательное",
        meaning: "Цвет крови или огня",
        example: "Она надела красное платье.",
        synonyms: ["алый", "багровый"],
        antonyms: [],
      },
    ],
  },
};
