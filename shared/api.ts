/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Translation request type
 */
export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

/**
 * Translation response type
 */
export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
}

/**
 * Dictionary request type
 */
export interface DictionaryRequest {
  word: string;
  language: string;
}

/**
 * Dictionary response type
 */
export interface DictionaryResponse {
  word: string;
  language: string;
  definitions: Array<{
    partOfSpeech: string;
    meaning: string;
    example?: string;
  }>;
  synonyms?: string[];
  antonyms?: string[];
}

/**
 * Supported languages
 */
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}
