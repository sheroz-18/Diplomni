import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DictionaryResponse } from "@shared/api";
import { Loader2, Search } from "lucide-react";

const DICTIONARY_LANGUAGES = [
  { code: "tj", name: "Tajik", nativeName: "Тоҷикӣ" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
];

export default function DictionarySearch() {
  const [searchWord, setSearchWord] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("tj");
  const [result, setResult] = useState<DictionaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchWord.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/dictionary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: searchWord,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "خرابی در جستجو");
        return;
      }

      const data: DictionaryResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Dictionary search error:", err);
      setError("Хатои ҷустуҷу. Лутфан дубора кӯшиш кунед");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Луғати Тоҷикӣ
          </h1>
          <p className="text-gray-600">
            Калимаҳо дарф кунед ва маъноҳои онҳоро кашф кунед
          </p>
        </div>

        {/* Search Input */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Калимаҳо ворид кунед
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Калимаҳо ҷустуҷу кунед..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Забон
              </label>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DICTIONARY_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchWord.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ҷустуҷу дарҷариён аст...
              </>
            ) : (
              "Ҷустуҷу"
            )}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <div className="border-b-2 border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {result.word}
              </h2>
            </div>

            {/* Definitions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Таъриифот</h3>
              {result.definitions.map((def, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    {def.partOfSpeech}
                  </p>
                  <p className="text-gray-800 font-medium mb-3">
                    {def.meaning}
                  </p>
                  {def.example && (
                    <p className="text-sm text-gray-600 italic">
                      Мисол: {def.example}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Synonyms and Antonyms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {result.synonyms && result.synonyms.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Муродифот
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.synonyms.map((synonym, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.antonyms && result.antonyms.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    Муқобилот
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.antonyms.map((antonym, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !error && !isLoading && (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">
              Калимаҳо ҷустуҷу кунед, то маъноҳои онҳоро бубинед
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
