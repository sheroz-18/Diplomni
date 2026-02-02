import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition"
          >
            <img
              src="/logo.svg"
              alt="Тарҷумаи Тоҷикӣ"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              to="/translator"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Тарҷума кун
            </Link>
            <Link
              to="/dictionary"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Луғат
            </Link>
            <Link
              to="/ai"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Ёрии ҳушманд
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Оид ба мо
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
            <Link
              to="/translator"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition"
            >
              Тарҷума кун
            </Link>
            <Link
              to="/dictionary"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition"
            >
              Луғат
            </Link>
            <Link
              to="/ai"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition"
            >
              Ёрии ҳушманд
            </Link>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition"
            >
              Оид ба мо
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
