import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import clsx from 'clsx';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ebooks?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'E-books', path: '/ebooks' },
    { name: 'Vídeos', path: '/videos' },
    { name: 'Categorias', path: '/ebooks' },
    { name: 'Mais populares', path: '/ebooks?filter=populares' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-slate-900">
            <img src="/favicon.png" alt="Logo EbookStore" className="w-8 h-8 object-contain" />
            <span className="font-bold text-xl tracking-tight">EbookStore</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search bar Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Pesquisar e-books"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
          </form>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Menu principal"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={clsx(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden shadow-inner",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-4 pb-6 space-y-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>
          <div className="flex flex-col space-y-3 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-600 hover:text-primary-600 font-medium px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
