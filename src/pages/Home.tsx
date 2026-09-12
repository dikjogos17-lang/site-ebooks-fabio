import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import EbookCard from '../components/EbookCard';
import SEO from '../components/SEO';
import { ebooks } from '../data/ebooks';

const Home = () => {
  const navigate = useNavigate();
  const featuredEbook = ebooks.find(e => e.featured) || ebooks[0];
  const popularEbooks = [...ebooks].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6);
  const categories = Array.from(new Set(ebooks.flatMap(e => e.category)));

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
                {featuredEbook.category}
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


      {/* Featured Video Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-900 text-white">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-slate-900/95 z-0" />
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Text Side */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm mx-auto lg:mx-0 shadow-lg">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    Assista Agora
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    A Verdade Sobre o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Dízimo</span>
                </h2>
                
                <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                    Neste vídeo exclusivo, desmascaramos os falsos profetas e trazemos um estudo bíblico profundo e revelador sobre o que as Escrituras realmente dizem a respeito da contribuição. Dê o play e descubra a verdade que liberta!
                </p>
            </div>
            
            {/* Video Side - Phone Mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative mx-auto lg:mx-0 border-slate-800 bg-slate-800 border-[12px] rounded-[2.5rem] shadow-2xl shadow-primary-500/20 flex items-center justify-center transform transition-transform duration-500 hover:scale-[1.02] ring-1 ring-white/10" style={{ width: 364, height: 624 }}>
                    {/* Phone Notch */}
                    <div className="absolute top-0 inset-x-0 mx-auto w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center shadow-sm">
                        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mt-1"></div>
                    </div>
                    
                    {/* Screen Content */}
                    <div className="rounded-[1.8rem] overflow-hidden bg-black w-full h-full relative z-10 flex items-center justify-center">
                        <iframe
                            src="https://www.facebook.com/plugins/video.php?height=600&href=https%3A%2F%2Fwww.facebook.com%2Fdesmascarandoosfalsosprofetas%2Fvideos%2F1880052162183784%2F&show_text=false&width=340&t=0"
                            width="340"
                            height="600"
                            className="border-none w-full h-full object-cover bg-black"
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            title="Vídeo Sobre o Dízimo"
                        ></iframe>
                    </div>
                </div>
            </div>
            
        </div>
      </section>

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

      {/* Mind Maps Showcase Banner */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white relative overflow-hidden border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-wider border border-primary-500/30 inline-block mb-3">
              Novo Recurso Visual
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              Estudos com Mapas Mentais
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Esquemas gráficos e diagramas teológicos esquematizados pelo Pr. Fabio Russo sobre escatologia, as 70 semanas, a graça e a caminhada cristã.
            </p>
          </div>
          <div className="shrink-0">
            <Link 
              to="/mapas-mentais"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 transition-all hover:scale-105 text-sm sm:text-base whitespace-nowrap"
            >
              Explorar Mapas Mentais &rarr;
            </Link>
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
