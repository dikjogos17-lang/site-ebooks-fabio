import { useState } from 'react';
import { Play } from 'lucide-react';
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
            Assista e compartilhe conteúdos exclusivos sobre a fé cristã.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videoUrls.slice(0, visibleCount).map((url, index) => {
            const embedUrl = `https://www.facebook.com/plugins/video.php?height=600&href=${encodeURIComponent(url)}&show_text=false&width=340&t=0`;
            
            return (
              <div key={index} className="flex justify-center">
                <div className="relative border-slate-800 bg-slate-800 border-[12px] rounded-[2.5rem] shadow-xl shadow-slate-300/50 flex items-center justify-center transform transition-transform duration-300 hover:scale-[1.03] ring-1 ring-black/5" style={{ width: 340, height: 600 }}>
                  {/* Phone Notch */}
                  <div className="absolute top-0 inset-x-0 mx-auto w-24 h-5 bg-slate-800 rounded-b-xl z-20 flex justify-center items-center">
                    <div className="w-10 h-1 bg-slate-700/80 rounded-full mt-1"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="rounded-[1.8rem] overflow-hidden bg-black w-full h-full relative z-10 flex items-center justify-center">
                    <iframe
                      src={embedUrl}
                      width="316"
                      height="576"
                      className="border-none w-full h-full object-cover bg-black"
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={`Vídeo ${index + 1}`}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
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
