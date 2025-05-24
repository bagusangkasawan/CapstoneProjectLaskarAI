import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">

        <Link to="/">
          <img
            src="/energymate-logo.png"
            alt="EnergyMate Logo"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-base font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600 transition-colors">Beranda</Link>
          <Link to="/feature" className="hover:text-green-600 transition-colors">Fitur</Link>
          <Link to="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
          <Link to="/about" className="hover:text-green-600 transition-colors">Tentang</Link>
          <Link to="/contact" className="hover:text-green-600 transition-colors">Kontak</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-green-600 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-100 mt-2 space-y-1 text-base font-semibold text-gray-700">
          <Link to="/" className="block w-full px-6 py-3 hover:text-green-600 hover:bg-green-50 transition-colors">Beranda</Link>
          <Link to="/feature" className="block w-full px-6 py-3 hover:text-green-600 hover:bg-green-50 transition-colors">Fitur</Link>
          <Link to="/blog" className="block w-full px-6 py-3 hover:text-green-600 hover:bg-green-50 transition-colors">Blog</Link>
          <Link to="/about" className="block w-full px-6 py-3 hover:text-green-600 hover:bg-green-50 transition-colors">Tentang</Link>
          <Link to="/contact" className="block w-full px-6 py-3 hover:text-green-600 hover:bg-green-50 transition-colors">Kontak</Link>
        </nav>
      )}
    </header>
  );
}
