import { useState } from 'react';
import { Network, ZoomIn, Download, BookOpen, Layers, CheckCircle2, ChevronRight, X } from 'lucide-react';
import SEO from '../components/SEO';
import { mindMaps, type MindMap } from '../data/mindmaps';

const MindMaps = () => {
  const [selectedMap, setSelectedMap] = useState<MindMap>(mindMaps[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SEO 
        title="Mapas Mentais Bíblicos | EbookStore" 
        description="Estudos esquematizados e mapas mentais teológicos criados pelo Pr. Fabio Russo." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4">
            <Network className="w-4 h-4" />
            Recurso Exclusivo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Estudos com Mapas Mentais
          </h1>
          <p className="text-lg text-slate-600">
            Diagramas bíblicos e teológicos visuais, elaborados pelo <span className="font-semibold text-slate-800">Pr. Fabio Russo</span>, para sintetizar temas complexos das Escrituras de forma clara, profunda e didática.
          </p>
        </div>

        {/* Selection Tabs / Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {mindMaps.map((map) => {
            const isSelected = selectedMap.id === map.id;
            return (
              <button
                key={map.id}
                onClick={() => {
                  setSelectedMap(map);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20 scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-primary-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isSelected ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-primary-50 text-primary-700'
                    }`}>
                      {map.category}
                    </span>
                    <Layers className={`w-4 h-4 ${isSelected ? 'text-primary-400' : 'text-slate-400'}`} />
                  </div>
                  <h3 className="font-bold text-base leading-snug mb-1">
                    {map.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {map.subtitle}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  isSelected ? 'border-slate-800 text-primary-300' : 'border-slate-100 text-primary-600'
                }`}>
                  <span>Ver Mapa e Estudo</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mind Map Showcase Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden mb-16">
          
          {/* Header of Active Map */}
          <div className="p-6 md:p-10 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold uppercase tracking-wider">
                {selectedMap.category}
              </span>
              <span className="text-sm font-medium text-slate-500">
                Por <strong className="text-slate-800">{selectedMap.author}</strong>
              </span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
              {selectedMap.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-4xl">
              {selectedMap.summary}
            </p>

            {/* Verses badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1">
                Textos Chave:
              </span>
              {selectedMap.verses.map((verse, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono font-medium border border-slate-200"
                >
                  {verse}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Mind Map Visual Display */}
          <div className="p-6 md:p-10 bg-slate-900 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-semibold text-slate-200">
                  Esquema Visual em Alta Definição
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs md:text-sm font-semibold backdrop-blur-sm border border-white/10 transition-colors shadow-sm"
                >
                  <ZoomIn className="w-4 h-4 text-primary-400" />
                  Tela Cheia / Ampliar
                </button>
                <a
                  href={selectedMap.image}
                  download={`${selectedMap.id}.jpg`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-lg shadow-primary-600/30"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem HD
                </a>
              </div>
            </div>

            {/* Image Frame with click-to-zoom */}
            <div 
              onClick={() => setIsFullscreen(true)}
              className="relative rounded-2xl overflow-hidden bg-black/60 border border-slate-800 shadow-2xl flex items-center justify-center cursor-pointer group"
            >
              <img 
                src={selectedMap.image} 
                alt={selectedMap.title} 
                className="w-full h-auto max-h-[700px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md text-white text-sm font-medium border border-white/20 flex items-center gap-2 shadow-2xl">
                  <ZoomIn className="w-4 h-4 text-primary-400" />
                  Clique para ampliar em tela cheia
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 text-center mt-3">
              Toque ou clique na imagem para inspecionar cada anotação, linha do tempo e versículo com zoom.
            </p>
          </div>

          {/* Detailed Points & Theological Breakdown */}
          <div className="p-6 md:p-10 bg-white">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-slate-900">
                Guia Exegético e Pontos do Mapa Mental
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedMap.points.map((pt, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
                          {pt.topic}
                        </h4>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary-100 text-primary-800 rounded text-[11px] font-mono font-semibold">
                          {pt.references}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      {pt.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Modal Header */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white mb-4 px-4">
            <h3 className="text-base sm:text-lg font-bold truncate max-w-xl">
              {selectedMap.title}
            </h3>
            <div className="flex items-center gap-3">
              <a 
                href={selectedMap.image} 
                download 
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" /> Baixar HD
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Fechar tela cheia"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* High-res Image container */}
          <div 
            className="relative w-full max-w-7xl h-[85vh] flex items-center justify-center overflow-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedMap.image} 
              alt={selectedMap.title} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMaps;
