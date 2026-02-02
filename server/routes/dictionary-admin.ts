import { RequestHandler } from "express";
import { dictionaryDatabase, DictionaryEntry } from "../data/dictionary-db";

// Get all dictionary entries for a language
export const handleGetDictionaryByLanguage: RequestHandler = (req, res) => {
  const { language } = req.params;

  if (!language) {
    return res.status(400).json({ error: "Language parameter is required" });
  }

  const languageData = dictionaryDatabase[language];
  if (!languageData) {
    return res.status(404).json({ error: `Language '${language}' not found` });
  }

  // Convert to array format for easier management
  const entries = Object.entries(languageData).map(([word, definitions]) => ({
    word,
    definitions,
  }));

  res.json({
    language,
    totalEntries: entries.length,
    entries,
  });
};

// Get a specific word from dictionary
export const handleGetDictionaryEntry: RequestHandler = (req, res) => {
  const { language, word } = req.params;

  if (!language || !word) {
    return res
      .status(400)
      .json({ error: "Language and word parameters are required" });
  }

  const languageData = dictionaryDatabase[language];
  if (!languageData) {
    return res.status(404).json({ error: `Language '${language}' not found` });
  }

  const wordLower = word.toLowerCase();
  const definitions = languageData[wordLower];

  if (!definitions) {
    return res
      .status(404)
      .json({ error: `Word '${word}' not found in ${language} dictionary` });
  }

  res.json({
    word,
    language,
    definitions,
  });
};

// Create a new dictionary entry
export const handleCreateDictionaryEntry: RequestHandler = (req, res) => {
  const { language, word, definitions } = req.body;

  if (!language || !word || !definitions || !Array.isArray(definitions)) {
    return res.status(400).json({
      error: "Missing required fields: language, word, definitions (array)",
    });
  }

  if (!dictionaryDatabase[language]) {
    dictionaryDatabase[language] = {};
  }

  const wordLower = word.toLowerCase();

  // Check if word already exists
  if (dictionaryDatabase[language][wordLower]) {
    return res.status(409).json({
      error: `Word '${word}' already exists in ${language} dictionary`,
    });
  }

  // Add the new entry
  dictionaryDatabase[language][wordLower] = definitions;

  res.status(201).json({
    message: "Dictionary entry created successfully",
    word,
    language,
    definitions,
  });
};

// Update a dictionary entry
export const handleUpdateDictionaryEntry: RequestHandler = (req, res) => {
  const { language, word } = req.params;
  const { definitions } = req.body;

  if (!language || !word) {
    return res
      .status(400)
      .json({ error: "Language and word parameters are required" });
  }

  if (!definitions || !Array.isArray(definitions)) {
    return res.status(400).json({
      error: "Definitions must be provided as an array",
    });
  }

  const languageData = dictionaryDatabase[language];
  if (!languageData) {
    return res.status(404).json({ error: `Language '${language}' not found` });
  }

  const wordLower = word.toLowerCase();
  if (!languageData[wordLower]) {
    return res
      .status(404)
      .json({ error: `Word '${word}' not found in ${language} dictionary` });
  }

  // Update the entry
  languageData[wordLower] = definitions;

  res.json({
    message: "Dictionary entry updated successfully",
    word,
    language,
    definitions,
  });
};

// Delete a dictionary entry
export const handleDeleteDictionaryEntry: RequestHandler = (req, res) => {
  const { language, word } = req.params;

  if (!language || !word) {
    return res
      .status(400)
      .json({ error: "Language and word parameters are required" });
  }

  const languageData = dictionaryDatabase[language];
  if (!languageData) {
    return res.status(404).json({ error: `Language '${language}' not found` });
  }

  const wordLower = word.toLowerCase();
  if (!languageData[wordLower]) {
    return res
      .status(404)
      .json({ error: `Word '${word}' not found in ${language} dictionary` });
  }

  // Delete the entry
  delete languageData[wordLower];

  res.json({
    message: "Dictionary entry deleted successfully",
    word,
    language,
  });
};

// Batch create multiple entries
export const handleBatchCreateDictionaryEntries: RequestHandler = (
  req,
  res,
) => {
  const { language, entries } = req.body;

  if (!language || !entries || !Array.isArray(entries)) {
    return res.status(400).json({
      error: "Missing required fields: language, entries (array)",
    });
  }

  if (!dictionaryDatabase[language]) {
    dictionaryDatabase[language] = {};
  }

  const results = {
    created: 0,
    skipped: 0,
    errors: [] as string[],
  };

  entries.forEach((entry: { word: string; definitions: DictionaryEntry[] }) => {
    const wordLower = entry.word.toLowerCase();

    if (dictionaryDatabase[language][wordLower]) {
      results.skipped++;
      results.errors.push(`Word '${entry.word}' already exists, skipped`);
    } else {
      dictionaryDatabase[language][wordLower] = entry.definitions;
      results.created++;
    }
  });

  res.status(201).json({
    message: "Batch create completed",
    language,
    results,
  });
};

// Search dictionary entries
export const handleSearchDictionary: RequestHandler = (req, res) => {
  const { language, query } = req.query;

  if (!language || !query) {
    return res.status(400).json({
      error: "Language and query parameters are required",
    });
  }

  const languageData = dictionaryDatabase[language as string];
  if (!languageData) {
    return res.status(404).json({ error: `Language '${language}' not found` });
  }

  const queryLower = (query as string).toLowerCase();
  const results = Object.entries(languageData)
    .filter(([word]) => word.includes(queryLower))
    .map(([word, definitions]) => ({
      word,
      definitions,
    }))
    .slice(0, 20); // Limit to 20 results

  res.json({
    language,
    query,
    totalResults: results.length,
    results,
  });
};

// Get all supported languages
export const handleGetSupportedLanguages: RequestHandler = (_req, res) => {
  const languages = Object.keys(dictionaryDatabase);
  const languageStats = languages.map((lang) => ({
    code: lang,
    name: getLanguageName(lang),
    nativeName: getLanguageNativeName(lang),
    entries: Object.keys(dictionaryDatabase[lang]).length,
  }));

  res.json({
    supportedLanguages: languageStats,
    totalLanguages: languages.length,
  });
};

// Helper functions
function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    tj: "Tajik",
    en: "English",
    ru: "Russian",
  };
  return names[code] || code;
}

function getLanguageNativeName(code: string): string {
  const names: Record<string, string> = {
    tj: "Тоҷикӣ",
    en: "English",
    ru: "Русский",
  };
  return names[code] || code;
}
