import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslationResponse } from "@shared/api";
import { Loader2, Copy, Volume2 } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "tj", name: "Tajik", nativeName: "Тоҷикӣ" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
];

export default function TranslatorCard() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("tj");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      });

      const data: TranslationResponse = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("خرابی در ترجمه. لطفا دوباره تلاش کنید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang === "tj" ? "fa" : targetLang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Забони манбаъ
            </label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Забони мақсад
            </label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Source Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Матни манбаъ
            </label>
            <Textarea
              placeholder="Матни худро дар ин ҷо ворид кунед..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="w-full h-40 md:h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">{sourceText.length} / 5000</p>
          </div>

          {/* Translated Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Матни тарҷумашуда
            </label>
            <Textarea
              placeholder="Тарҷума дар ин ҷо намоён мешавад..."
              value={translatedText}
              readOnly
              className="w-full h-40 md:h-64 p-4 border border-gray-300 rounded-lg resize-none bg-gray-50"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                title="Copy"
              >
                <Copy size={16} />
                {copied ? "Нусхаи идомдор!" : "Нусхаи идомдор"}
              </button>
              {translatedText && (
                <button
                  onClick={() => handleSpeak(translatedText)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  title="Speak"
                >
                  <Volume2 size={16} />
                  Баръе
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Button
            onClick={handleSwapLanguages}
            variant="outline"
            className="w-full md:w-auto px-8"
          >
            Табдил кунед
          </Button>
          <Button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="w-full md:w-auto px-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Тарҷума мешавад...
              </>
            ) : (
              "Тарҷума кун"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
