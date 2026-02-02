import Header from "@/components/layout/Header";
import DictionarySearch from "@/components/dictionary/DictionarySearch";

export default function DictionaryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 md:py-12">
        <DictionarySearch />
      </main>
    </div>
  );
}
