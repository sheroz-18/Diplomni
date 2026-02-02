import { RequestHandler } from "express";
import { DictionaryResponse } from "@shared/api";

// Mock dictionary database
const dictionaryDatabase: Record<
  string,
  Record<
    string,
    {
      partOfSpeech: string;
      meaning: string;
      example?: string;
    }[]
  >
> = {
  tj: {
    салом: [
      {
        partOfSpeech: "Фиал",
        meaning: "Сўраф карди таҳиёт",
        example: "Салом! Ту чиро мекунӣ?",
      },
    ],
    об: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Маводдати зоҳирӣ, шаффоф",
        example: "Об ҳажми калон дорад.",
      },
    ],
    оташ: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳарорат ва нури зоҳирии ишъол",
        example: "Оташ гармӣ медихад.",
      },
    ],
    мӯҳаббат: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Ҳисси меҳр ва вафодорӣ",
        example: "Мӯҳаббат фарзанди хуб аст.",
      },
    ],
    дӯст: [
      {
        partOfSpeech: "Номи мусаффӣ",
        meaning: "Касе, ки дӯстӣ меҷуй",
        example: "Ӯ дӯсти бахши ман аст.",
      },
    ],
    оила: [
      {
        partOfSpeech: "Номи ғайримусаффӣ",
        meaning: "Гурўҳи аъзои якхелӣ",
        example: "Оилаи ман бузург аст.",
      },
    ],
  },
  en: {
    hello: [
      {
        partOfSpeech: "Interjection",
        meaning: "A polite greeting",
        example: "Hello! How are you?",
      },
    ],
    water: [
      {
        partOfSpeech: "Noun",
        meaning: "A colorless transparent liquid",
        example: "Water is essential for life.",
      },
    ],
    fire: [
      {
        partOfSpeech: "Noun",
        meaning: "Heat and light from burning",
        example: "Fire provides warmth.",
      },
    ],
    love: [
      {
        partOfSpeech: "Noun",
        meaning: "Intense feeling of affection",
        example: "Love is a powerful emotion.",
      },
    ],
    friend: [
      {
        partOfSpeech: "Noun",
        meaning: "A person with whom one has a bond",
        example: "He is my best friend.",
      },
    ],
    family: [
      {
        partOfSpeech: "Noun",
        meaning: "A group of related people",
        example: "My family is very large.",
      },
    ],
  },
  ru: {
    привет: [
      {
        partOfSpeech: "Междометие",
        meaning: "Вежливое приветствие",
        example: "Привет! Как дела?",
      },
    ],
    вода: [
      {
        partOfSpeech: "Существительное",
        meaning: "Бесцветная прозрачная жидкость",
        example: "Вода необходима для жизни.",
      },
    ],
    огонь: [
      {
        partOfSpeech: "Существительное",
        meaning: "Тепло и свет от горения",
        example: "Огонь дает тепло.",
      },
    ],
  },
};

export const handleDictionary: RequestHandler = (req, res) => {
  const { word, language } = req.body;

  if (!word || !language) {
    return res
      .status(400)
      .json({ error: "Missing required fields: word, language" });
  }

  const wordLower = word.toLowerCase();
  const definitions = dictionaryDatabase[language]?.[wordLower];

  if (!definitions) {
    return res.status(404).json({
      error: `Word "${word}" not found in ${language} dictionary`,
    });
  }

  const response: DictionaryResponse = {
    word,
    language,
    definitions,
    synonyms: [],
    antonyms: [],
  };

  res.json(response);
};
