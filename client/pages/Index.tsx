import Header from "@/components/layout/Header";
import { Link } from "react-router-dom";
import { Languages, BookOpen, Brain, ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Banner */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 md:py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Тарҷумаи Тоҷикӣ
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Тарҷумаи фавритавӣ, луғати ҷомеъ ва ёрии ҳушманд барои забони
                тоҷикӣ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/translator"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
                >
                  Оғоз кунед
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/dictionary"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition transform hover:scale-105"
                >
                  Луғат
                  <BookOpen size={20} />
                </Link>
              </div>
            </div>

            {/* Right side - Banner Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                {/* Main banner box */}
                <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl">
                  {/* Icon circles */}
                  <div className="flex justify-around mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition">
                      <Languages className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Text in banner */}
                  <div className="text-center">
                    <p className="text-sm text-blue-100 mb-2">Дастрас барои</p>
                    <p className="text-2xl font-bold text-white mb-3">
                      10+ забон
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 rounded-full mx-auto" />
                  </div>
                </div>

                {/* Floating elements */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400 rounded-lg opacity-20 animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Хусусиятҳои асосӣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Link
            to="/translator"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition border border-gray-200 hover:border-blue-400 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
              <Languages className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Тарҷумаи Фавритавӣ
            </h3>
            <p className="text-gray-600 mb-4">
              Матни худро дар ҳар забонӣ бишинед ва бе таъхир тарҷума кунед. Аз
              биштари 10 забон пуштибонӣ мешавад.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Рафтан
              <ArrowRight size={16} />
            </span>
          </Link>

          {/* Feature 2 */}
          <Link
            to="/dictionary"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition border border-gray-200 hover:border-green-400 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
              <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Луғат</h3>
            <p className="text-gray-600 mb-4">
              Калимаҳоро ҷустуҷу кунед ва таъриифот пурра, муродифот ва
              намунаҳои истифода омӯз.
            </p>
            <span className="text-green-600 font-semibold flex items-center gap-2">
              Рафтан
              <ArrowRight size={16} />
            </span>
          </Link>

          {/* Feature 3 */}
          <Link
            to="/ai"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition border border-gray-200 hover:border-purple-400 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition">
              <Brain className="w-6 h-6 text-purple-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Ёрии ҳушманд
            </h3>
            <p className="text-gray-600 mb-4">
              Саволҳои худро пурсед ва ба ҷавобҳои ҳушманди дарёфт кунед. Аз
              ҳуши сунъӣ истифода мебарад.
            </p>
            <span className="text-purple-600 font-semibold flex items-center gap-2">
              Рафтан
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Чаро мо интихоб кунед?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <p className="text-gray-700 font-medium">
                Забонҳои пуштибонишуда
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-700 font-medium">Озод ва бе иштиҳорот</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                Фавран
              </div>
              <p className="text-gray-700 font-medium">Тарҷумаи ғайрифоран</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <p className="text-gray-700 font-medium">Дастрас аз ҳама вақт</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Оғоз кардан доред?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Тарҷума кунед, фарозед ва кашф кунед. Ҳамаи чизҳо озод аст.
          </p>
          <Link
            to="/translator"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
          >
            Ба тарҷума равед
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Оид ба мо</h3>
              <p className="text-sm">
                Тарҷумаи Тоҷикӣ як платформаи тарҷума ва омӯзиши забони тез ва
                осон аст, ки барои ҳамаи дӯстдоронидагони тоҷик сохта шудааст.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Пайвандҳо</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link
                    to="/translator"
                    className="hover:text-white transition"
                  >
                    Тарҷума кун
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dictionary"
                    className="hover:text-white transition"
                  >
                    Луғат
                  </Link>
                </li>
                <li>
                  <Link to="/ai" className="hover:text-white transition">
                    Ёрии ҳушманд
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Алоқа</h3>
              <p className="text-sm">
                Саволҳо ё пешниҳодаткуҳод?
                <br />
                Бо мо алоқа барқарор кунед
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Тарҷумаи Тоҷикӣ. Ҳамаи ҳуқуқҳо маҳфуз аст.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
