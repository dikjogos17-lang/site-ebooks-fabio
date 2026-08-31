import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import EbookCard from '../components/EbookCard';
import SEO from '../components/SEO';

const Home = () => {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/ebooks').then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ]).then(([ebooksData, catsData]) => {
      if (!ebooksData.error) setEbooks(ebooksData);
      if (!catsData.error) setCategories(catsData.map((c: any) => c.name));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const featuredEbook = ebooks.find(e => e.featured) || ebooks[0];
  const popularEbooks = [...ebooks].sort((a, b) => b.views - a.views).slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <SEO title="Carregando..." />
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEO />
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-slate-900/90 z-0" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Estudos Bíblicos e Teologia por Fabio Russo</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Aprofunde seu conhecimento nas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Escrituras Sagradas</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Explore E-books cuidadosamente elaborados para transformar informações complexas sobre a fé cristã em materiais didáticos, claros e acessíveis.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/ebooks" 
                className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5"
              >
                Explorar Catálogo
              </Link>
              <a 
                href="#sobre" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-all hover:-translate-y-0.5"
              >
                Conheça o Autor
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured E-book */}
      {featuredEbook && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-6 h-6 text-primary-500" />
            <h2 className="text-3xl font-bold text-slate-900">E-book em destaque</h2>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 shrink-0">
              <img 
                src={featuredEbook.capa} 
                alt={`Capa do E-book em destaque: ${featuredEbook.title}`} 
                loading="lazy"
                className="w-full max-w-[280px] mx-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                {featuredEbook.category?.name || featuredEbook.category}
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                {featuredEbook.title}
              </h3>
              <p className="text-lg text-slate-600 font-medium">
                Autor: {featuredEbook.author}
              </p>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                {featuredEbook.description}
              </p>
              <div className="pt-4">
                <Link 
                  to={`/ebook/${featuredEbook.id}`}
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Ler agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/ebooks?category=${encodeURIComponent(category)}`)}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all text-center group"
              >
                <h3 className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">
                  {category}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular E-books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Mais populares</h2>
            <Link to="/ebooks?filter=populares" className="text-primary-600 hover:text-primary-700 font-medium hidden sm:block">
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {popularEbooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/ebooks?filter=populares" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver todos os populares &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre o Autor */}
      <section id="sobre" className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-primary-100 shadow-lg">
                <img 
                  src="/fabio.jpg" 
                  alt="Foto do autor Fabio Russo" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left space-y-4">
                <h2 className="text-sm font-bold text-primary-600 uppercase tracking-wider">Sobre o Criador</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Fabio</h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                  Fabio é criador de eBooks dedicados ao estudo da Bíblia, teologia e doutrinas cristãs. Seus conteúdos exploram diferentes temas da fé cristã, buscando apresentar conceitos de forma clara, organizada e acessível.
                </p>
                <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                  Entre os assuntos abordados estão Calvinismo, doutrina da predestinação, soberania de Deus, salvação, graça, fé, história do cristianismo e interpretação das Escrituras.
                </p>
                <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                  Por meio de seus eBooks, Fabio busca incentivar o leitor a conhecer mais profundamente a Bíblia, refletir sobre diferentes perspectivas teológicas e desenvolver seus próprios estudos sobre a fé cristã.
                </p>
                <p className="text-base font-medium text-slate-700 leading-relaxed max-w-2xl">
                  📖 Estude, reflita e aprofunde seu conhecimento sobre as Escrituras e a teologia cristã.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/ebooks" 
                    className="inline-flex text-primary-600 hover:text-primary-700 font-medium items-center transition-colors"
                  >
                    Ver todos os eBooks do autor <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
