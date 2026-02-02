import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react";

interface DictionaryEntry {
  word: string;
  definitions: Array<{
    partOfSpeech: string;
    meaning: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
  }>;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  entries: number;
}

export default function DictionaryManager() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [editingWord, setEditingWord] = useState<DictionaryEntry | null>(null);

  // Form state
  const [formWord, setFormWord] = useState("");
  const [formPartOfSpeech, setFormPartOfSpeech] = useState("");
  const [formMeaning, setFormMeaning] = useState("");
  const [formExample, setFormExample] = useState("");

  // Load languages
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetch("/api/admin/languages");
        const data = await response.json();
        setLanguages(data.supportedLanguages);
      } catch (err) {
        console.error("Error loading languages:", err);
      }
    };

    loadLanguages();
  }, []);

  // Load entries for selected language
  useEffect(() => {
    const loadEntries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/dictionary/${selectedLanguage}`
        );
        if (response.ok) {
          const data = await response.json();
          setEntries(data.entries);
        } else {
          setEntries([]);
        }
      } catch (err) {
        console.error("Error loading entries:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, [selectedLanguage]);

  const filteredEntries = entries.filter((entry) =>
    entry.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingWord(null);
    setFormWord("");
    setFormPartOfSpeech("");
    setFormMeaning("");
    setFormExample("");
    setIsOpenDialog(true);
  };

  const handleEditClick = (entry: DictionaryEntry) => {
    setEditingWord(entry);
    setFormWord(entry.word);
    if (entry.definitions.length > 0) {
      setFormPartOfSpeech(entry.definitions[0].partOfSpeech);
      setFormMeaning(entry.definitions[0].meaning);
      setFormExample(entry.definitions[0].example || "");
    }
    setIsOpenDialog(true);
  };

  const handleSave = async () => {
    if (!formWord || !formPartOfSpeech || !formMeaning) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      language: selectedLanguage,
      word: formWord,
      definitions: [
        {
          partOfSpeech: formPartOfSpeech,
          meaning: formMeaning,
          example: formExample || undefined,
        },
      ],
    };

    try {
      let response;
      let errorMessage = "";

      if (editingWord) {
        // Update
        response = await fetch(
          `/api/admin/dictionary/${selectedLanguage}/${editingWord.word}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ definitions: payload.definitions }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage = errorData.error || `Error: ${response.status}`;
          throw new Error(errorMessage);
        }
      } else {
        // Create
        response = await fetch("/api/admin/dictionary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage = errorData.error || `Error: ${response.status}`;
          throw new Error(errorMessage);
        }
      }

      // Reload entries
      const reloadResponse = await fetch(
        `/api/admin/dictionary/${selectedLanguage}`
      );

      if (!reloadResponse.ok) {
        throw new Error("Failed to reload entries");
      }

      const data = await reloadResponse.json();
      setEntries(data.entries || []);
      setIsOpenDialog(false);

      // Show success message
      alert(editingWord ? "Word updated successfully!" : "Word created successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving entry:", errorMessage);
      alert(`Error saving entry: ${errorMessage}`);
    }
  };

  const handleDelete = async (word: string) => {
    if (!confirm(`Are you sure you want to delete "${word}"?`)) return;

    try {
      const response = await fetch(
        `/api/admin/dictionary/${selectedLanguage}/${word}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Reload entries
      const reloadResponse = await fetch(
        `/api/admin/dictionary/${selectedLanguage}`
      );

      if (!reloadResponse.ok) {
        throw new Error("Failed to reload entries");
      }

      const data = await reloadResponse.json();
      setEntries(data.entries || []);
      alert("Word deleted successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error deleting entry:", errorMessage);
      alert(`Error deleting entry: ${errorMessage}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dictionary Manager</h1>
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick} className="bg-blue-600">
              <Plus size={20} className="mr-2" />
              Add Word
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingWord ? "Edit Word" : "Add New Word"}
              </DialogTitle>
              <DialogDescription>
                Add or edit a dictionary entry
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Word</label>
                <Input
                  value={formWord}
                  onChange={(e) => setFormWord(e.target.value)}
                  placeholder="Enter word"
                  disabled={!!editingWord}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Part of Speech
                </label>
                <Input
                  value={formPartOfSpeech}
                  onChange={(e) => setFormPartOfSpeech(e.target.value)}
                  placeholder="e.g., Noun, Verb, Adjective"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Meaning
                </label>
                <textarea
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  placeholder="Enter meaning"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Example (optional)
                </label>
                <textarea
                  value={formExample}
                  onChange={(e) => setFormExample(e.target.value)}
                  placeholder="Enter example usage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600">
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Language and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.entries} entries)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Words
            </label>
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin text-blue-600" />
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No entries found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Word
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Part of Speech
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Meaning
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.word} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {entry.word}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {entry.definitions[0]?.partOfSpeech}
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs truncate">
                      {entry.definitions[0]?.meaning}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(entry)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(entry.word)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {languages.length}
            </div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {entries.length}
            </div>
            <div className="text-sm text-gray-600">Entries (Current)</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {languages.reduce((sum, lang) => sum + lang.entries, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
        </div>
      </div>
    </div>
  );
}
