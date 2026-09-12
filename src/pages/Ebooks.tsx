import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, X, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EbookCard from '../components/EbookCard';
import SEO from '../components/SEO';
import { ebooks } from '../data/ebooks';
import { categories } from '../data/categories';

const ITEMS_PER_PAGE = 8; // Increased slightly for better grid

const Ebooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('filter') || 'recentes');
  const [accessType, setAccessType] = useState(searchParams.get('tipo') || 'todos');

  // Pagination state
  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(isNaN(currentPageParam) || currentPageParam < 1 ? 1 : currentPageParam);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setAccessType(searchParams.get('tipo') || 'todos');
    const filter = searchParams.get('filter');
    if (filter === 'populares') setSortBy('populares');
    
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(isNaN(page) || page < 1 ? 1 : page);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchQuery, page: '1' });
  };

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('recentes');
    setAccessType('todos');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  const filteredEbooks = useMemo(() => {
    return ebooks
      .filter(ebook => {
        const catName = ebook.category || '';
        
        const matchesSearch = searchQuery === '' || 
          ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          catName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === '' || catName === selectedCategory;

        const matchesAccess = accessType === 'todos' || 
          (accessType === 'pagos' && ebook.isPaid) || 
          (accessType === 'gratuitos' && !ebook.isPaid);
        
        return matchesSearch && matchesCategory && matchesAccess;
      })
      .sort((a, b) => {
        if (sortBy === 'populares') return (b.views || 0) - (a.views || 0);
        if (sortBy === 'avaliacao') return b.rating - a.rating;
        // Recentes
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
  }, [searchQuery, selectedCategory, sortBy, accessType]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEbooks.length / ITEMS_PER_PAGE);
  const paginatedEbooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEbooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEbooks, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <SEO 
        title="Catálogo de E-books" 
        description="Explore nossa coleção completa de e-books cristãos, teologia e estudos bíblicos."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Nossa Coleção</h1>
          
          <form onSubmit={handleSearch} className="w-full md:w-auto relative">
            <input
              type="text"
              placeholder="Buscar título, autor..."
              className="w-full md:w-80 pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Pesquisar no catálogo"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
            <button type="submit" className="hidden" aria-hidden="true" />
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => {
              const aside = document.getElementById('filters-sidebar');
              if (aside) aside.classList.toggle('hidden');
            }}
          >
            <Filter className="w-5 h-5" />
            Filtrar Resultados
          </button>

          {/* Sidebar / Filters */}
          <aside id="filters-sidebar" className="hidden lg:block lg:w-1/4 shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2 text-slate-800">
                  <Filter className="w-4 h-4" aria-hidden="true" /> Filtros
                </h2>
                {(selectedCategory || searchQuery || sortBy !== 'recentes') && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-slate-500 hover:text-primary-600 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
                    aria-label="Limpar todos os filtros"
                  >
                    <X className="w-3 h-3" aria-hidden="true" /> Limpar
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2" id="sort-label">Ordenar por</h3>
                  <select 
                    aria-labelledby="sort-label"
                    className="w-full p-3 lg:p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={sortBy}
                    onChange={(e) => {
                      updateParams({ filter: e.target.value === 'populares' ? 'populares' : '', page: '1' });
                    }}
                  >
                    <option value="recentes">Mais recentes</option>
                    <option value="populares">Mais populares</option>
                    <option value="avaliacao">Melhor avaliação</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Tipo de Acesso</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateParams({ tipo: '', page: '1' })}
                      className={`block w-full text-left text-sm px-3 lg:px-2 py-2 lg:py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        accessType === 'todos'
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Todos os E-books
                    </button>
                    <button
                      onClick={() => updateParams({ tipo: 'gratuitos', page: '1' })}
                      className={`block w-full text-left text-sm px-3 lg:px-2 py-2 lg:py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        accessType === 'gratuitos'
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Apenas Gratuitos
                    </button>
                    <button
                      onClick={() => updateParams({ tipo: 'pagos', page: '1' })}
                      className={`flex items-center justify-between w-full text-left text-sm px-3 lg:px-2 py-2 lg:py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        accessType === 'pagos'
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : 'text-amber-800 bg-amber-50/60 hover:bg-amber-100/80 font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-600" />
                        E-books Pagos
                      </span>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold">R$ 3</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Categorias</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        updateParams({ category: '', page: '1' });
                      }}
                      className={`block w-full text-left text-sm px-3 lg:px-2 py-3 lg:py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        selectedCategory === '' 
                          ? 'bg-primary-50 text-primary-700 font-medium' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      aria-pressed={selectedCategory === ''}
                    >
                      Todas as categorias
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          updateParams({ category: cat, page: '1' });
                        }}
                        className={`block w-full text-left text-sm px-3 lg:px-2 py-3 lg:py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          selectedCategory === cat 
                            ? 'bg-primary-50 text-primary-700 font-medium' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        aria-pressed={selectedCategory === cat}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid & Pagination */}
          <main className="lg:w-3/4">
            {/* Callout Banner para Área Reservada de E-books Pagos */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-100 border border-amber-300/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center shrink-0 shadow-sm">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Área Reservada aos E-books Pagos</h4>
                  <p className="text-xs text-slate-600">Estudos bíblicos exclusivos e aprofundados com liberação instantânea via Pix.</p>
                </div>
              </div>
              <Link 
                to="/premium"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
              >
                Ver Área Reservada &rarr;
              </Link>
            </div>

            <div className="mb-4 text-sm text-slate-500" aria-live="polite">
              {filteredEbooks.length > 0 ? (
                <span>Mostrando {paginatedEbooks.length} de {filteredEbooks.length} e-books</span>
              ) : null}
            </div>

            {filteredEbooks.length > 0 ? (
              <>
                <motion.div 
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedEbooks.map((ebook, index) => (
                      <motion.div
                        key={ebook.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                      >
                        <EbookCard ebook={ebook} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex flex-wrap justify-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            currentPage === i + 1 
                              ? 'bg-primary-600 text-white' 
                              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          aria-label={`Ir para página ${i + 1}`}
                          aria-current={currentPage === i + 1 ? "page" : undefined}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Próxima página"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-12 rounded-xl border border-slate-200 text-center"
              >
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum E-book encontrado</h3>
                <p className="text-slate-500">
                  Não encontramos nenhum resultado para sua busca. Tente usar outras palavras-chave ou remover alguns filtros.
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Limpar todos os filtros
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Ebooks;
