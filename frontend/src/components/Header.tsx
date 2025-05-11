import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-4 shadow-md bg-white w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <img
          src="/energymate-logo.png"
          alt="EnergyMate Logo"
          className="h-20 w-[292px]"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
          <a href="#fitur" className="hover:text-green-600 transition-colors">Fitur</a>
          <Link to="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
          <Link to="/about" className="hover:text-green-600 transition-colors">Tentang</Link>
          <Link to="/contact" className="hover:text-green-600 transition-colors">Kontak</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded text-gray-600 hover:text-green-600 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden mt-2 space-y-2 px-4 pb-4 text-lg font-medium text-gray-700 bg-white border-t">
          <a href="/" className="block hover:text-green-600 transition-colors mt-4">Beranda</a>
          <a href="#fitur" className="block hover:text-green-600 transition-colors">Fitur</a>
          <Link to="/blog" className="block hover:text-green-600 transition-colors">Blog</Link>
          <Link to="/about" className="block hover:text-green-600 transition-colors">Tentang</Link>
          <Link to="/contact" className="block hover:text-green-600 transition-colors">Kontak</Link>
        </nav>
      )}
    </header>
  );
}
