import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <SEO title="Página não encontrada" />
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-primary-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          O e-book ou a página que você está procurando pode ter sido removido, 
          mudou de nome ou está temporariamente indisponível.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
          <Link 
            to="/ebooks" 
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Search className="w-5 h-5 mr-2 text-slate-400" />
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
