import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Settings, Type, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ebooks } from '../data/ebooks';

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ebook = ebooks.find(e => e.id === id || e.slug === id);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!ebook) {
      navigate('/ebooks');
    }
  }, [ebook, navigate]);

  if (!ebook) return null;

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 32));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const themeClasses = {
    light: 'bg-white text-slate-900',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    dark: 'bg-slate-900 text-slate-300',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 select-none ${themeClasses[theme]}`} onContextMenu={(e) => e.preventDefault()}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : theme === 'sepia' ? 'bg-[#f4ecd8]/80 border-[#e4dcc8]' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to={`/ebook/${ebook.id}`}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          
          <div className="flex flex-col items-center flex-1 px-4 text-center">
            <h1 className="text-sm md:text-base font-bold truncate w-full max-w-[200px] md:max-w-md">{ebook.title}</h1>
            <span className="text-xs opacity-70">{ebook.author}</span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Configurações de leitura"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Settings Dropdown */}
            {showSettings && (
              <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border p-4 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Type className="w-4 h-4" /> Fonte e Tema
                </h3>
                
                <div className="flex items-center justify-between mb-4 bg-black/5 rounded-lg p-1">
                  <button onClick={decreaseFont} className="p-2 flex-1 flex justify-center hover:bg-black/5 rounded-md"><ZoomOut className="w-5 h-5" /></button>
                  <span className="text-sm font-medium px-4">{fontSize}px</span>
                  <button onClick={increaseFont} className="p-2 flex-1 flex justify-center hover:bg-black/5 rounded-md"><ZoomIn className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setTheme('light')} className={`py-2 rounded border text-sm font-medium ${theme === 'light' ? 'border-primary-500 text-primary-600 bg-primary-50' : 'border-slate-200 text-slate-600'}`}>Claro</button>
                  <button onClick={() => setTheme('sepia')} className={`py-2 rounded border text-sm font-medium bg-[#f4ecd8] text-[#5b4636] ${theme === 'sepia' ? 'border-[#5b4636]' : 'border-transparent'}`}>Sépia</button>
                  <button onClick={() => setTheme('dark')} className={`py-2 rounded border text-sm font-medium bg-slate-900 text-slate-300 ${theme === 'dark' ? 'border-slate-500' : 'border-transparent'}`}>Escuro</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reader Content */}
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-20" />
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{ebook.title}</h1>
          <p className="text-lg opacity-80 font-medium">Por {ebook.author}</p>
          <p className="text-xs text-red-500 font-bold mt-2">🔒 Conteúdo protegido contra cópia.</p>
        </div>

        {ebook.category === 'Estudos com Mapas Mentais' && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-white p-2">
            <img 
              src={ebook.capa} 
              alt={ebook.title} 
              className="w-full h-auto rounded-xl"
            />
            <p className="text-xs text-center text-slate-500 py-2">Esquema visual do Mapa Mental — Pr. Fabio Russo</p>
          </div>
        )}

        <article 
          className="prose prose-slate max-w-none transition-all duration-300"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          {(() => {
            let text = ebook.content || ebook.fullDescription || ebook.description;
            if (ebook.isEncrypted && ebook.content) {
              try {
                const binaryStr = window.atob(ebook.content);
                const bytes = new Uint8Array(binaryStr.length);
                for (let i = 0; i < binaryStr.length; i++) {
                    bytes[i] = binaryStr.charCodeAt(i);
                }
                text = new TextDecoder().decode(bytes);
              } catch(e) {}
            }
            return text;
          })().split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </article>
      </main>

      {/* Footer Progress */}
      <div className={`fixed bottom-0 w-full h-12 border-t flex items-center justify-center text-xs font-medium tracking-widest uppercase ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-500' : theme === 'sepia' ? 'bg-[#f4ecd8] border-[#e4dcc8] text-[#5b4636]' : 'bg-white border-slate-200 text-slate-400'}`}>
        EbookStore Reader
      </div>
    </div>
  );
};

export default Reader;
