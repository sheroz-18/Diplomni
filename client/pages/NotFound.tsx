import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 min-h-[calc(100vh-80px)]">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Афсӯс! Ин саҳифа ёфт нашуд
          </p>
          <p className="text-gray-600 mb-8 text-lg">
            Саҳифаеро ки шумо ҷустуҷу мекардед, мавҷуд нист
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Ба саҳифаи асосӣ браҳед
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
