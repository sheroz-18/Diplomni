import Header from "@/components/layout/Header";
import TranslatorCard from "@/components/translator/TranslatorCard";

export default function TranslatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 md:py-12">
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Тарҷумаи Фавритавӣ
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Аз ҳар забонӣ ба забони дигар бе маҳдудият тарҷума кунед
          </p>
        </div>
        <TranslatorCard />
      </main>
    </div>
  );
}
