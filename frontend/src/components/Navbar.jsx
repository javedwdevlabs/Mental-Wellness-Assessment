import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-white border-b border-gray-200 max-w-360 mx-auto">
      <div className="h-18 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold text-green-900">
          Mind
          <span className="text-gray-400 font-normal">
            Pulse
          </span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">

          <button className="px-4 py-2 rounded-lg bg-green-900 text-white text-sm">
            Home
          </button>

          <button className="px-4 py-2 rounded-lg text-gray-600 text-sm hover:bg-gray-100">
            Prediction
          </button>

          <button className="px-4 py-2 rounded-lg text-gray-600 text-sm hover:bg-gray-100">
            About
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          {isMenuOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-2">

          <button className="w-full text-left px-4 py-3 rounded-lg bg-green-900 text-white text-sm">
            Home
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 text-sm hover:bg-gray-100">
            Prediction
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 text-sm hover:bg-gray-100">
            About
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;