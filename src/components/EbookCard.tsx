import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen } from 'lucide-react';
import type { Ebook } from '../data/ebooks';

interface EbookCardProps {
  ebook: Ebook;
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col h-full focus-within:ring-2 focus-within:ring-primary-500">
      <Link to={`/ebook/${ebook.id}`} className="relative aspect-[2/3] overflow-hidden group block focus:outline-none">
        <img 
          src={ebook.capa} 
          alt={`Capa do E-book: ${ebook.title}`} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-sm">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-yellow-500" aria-hidden="true" />
          <span aria-label={`Avaliação ${ebook.rating} de 5`}>{ebook.rating}</span>
        </div>
      </Link>
      
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 inline-block">
          {ebook.category?.name || ebook.category}
        </span>
        <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight mb-1 line-clamp-2">
          <Link to={`/ebook/${ebook.id}`} className="hover:text-primary-600 transition-colors focus:outline-none">
            {ebook.title}
          </Link>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">Autor: {ebook.author}</p>
        
        <p className="hidden sm:block text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
          {ebook.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-slate-100 gap-2 sm:gap-0">
          <div className="flex items-center text-[10px] sm:text-xs text-slate-500 gap-1" aria-label={`${ebook.pages} páginas`}>
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            <span>{ebook.pages} págs</span>
          </div>
          <Link 
            to={`/ebook/${ebook.id}`}
            className="text-xs sm:text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus:outline-none py-1 block sm:inline-block"
            aria-label={`Ver detalhes do e-book ${ebook.title}`}
          >
            Ver E-book &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EbookCard;
