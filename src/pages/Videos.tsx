import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { videoUrls } from '../data/videos';

const VIDEOS_PER_PAGE = 6;

const Videos = () => {
  const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + VIDEOS_PER_PAGE, videoUrls.length));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEO title="Galeria de Vídeos | EbookStore" description="Assista às nossas mensagens e estudos em vídeo." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4">
            <Play className="w-4 h-4" />
            Galeria de Mensagens
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Vídeos e Estudos
          </h1>
          <p className="text-lg text-slate-600">
            A maioria destes vídeos são exclusivos para membros. Clique para assistir diretamente no Facebook!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videoUrls.slice(0, visibleCount).map((url, index) => {
            // Se for um link de grupo ou se quisermos garantir que funciona, usamos um card elegante
            return (
              <div key={index} className="flex justify-center">
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border-slate-800 bg-slate-800 border-[12px] rounded-[2.5rem] shadow-xl shadow-slate-300/50 flex items-center justify-center transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl ring-1 ring-black/5 group block" 
                  style={{ width: 340, height: 600 }}
                >
                  {/* Phone Notch */}
                  <div className="absolute top-0 inset-x-0 mx-auto w-24 h-5 bg-slate-800 rounded-b-xl z-20 flex justify-center items-center">
                    <div className="w-10 h-1 bg-slate-700/80 rounded-full mt-1"></div>
                  </div>
                  
                  {/* Screen Content - Premium CTA */}
                  <div className="rounded-[1.8rem] overflow-hidden bg-slate-900 w-full h-full relative z-10 flex flex-col items-center justify-center p-8 text-center border border-slate-700">
                    
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                        <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
                      </div>
                      
                      <h3 className="text-white font-bold text-2xl mb-3">Vídeo {index + 1}</h3>
                      <p className="text-slate-300 text-base mb-8">Conteúdo exclusivo do grupo. Assista no Facebook.</p>
                      
                      <div className="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                        Abrir vídeo <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {visibleCount < videoUrls.length && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="inline-flex justify-center items-center px-8 py-3 text-base font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Carregar Mais Vídeos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
