import { RequestHandler } from "express";
import { DictionaryResponse } from "@shared/api";
import { dictionaryDatabase } from "../data/dictionary-db";

// Dictionary database is imported from data/dictionary-db.ts

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
