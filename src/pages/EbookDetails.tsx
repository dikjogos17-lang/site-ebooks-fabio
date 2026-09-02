import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, BookOpen, Download, FileText, Globe, Calendar, Heart, Eye, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { ebooks } from '../data/ebooks';

const EbookDetails = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundEbook = ebooks.find(e => e.id === id || e.slug === id);
    if (foundEbook) {
      setEbook(foundEbook);
      const favorites = JSON.parse(localStorage.getItem('ebooks_favorites') || '[]');
      setIsFavorite(favorites.includes(foundEbook.id));
      setViews(foundEbook.views || Math.floor(Math.random() * 10) + 1);
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!ebook) return;
    
    let favorites = JSON.parse(localStorage.getItem('ebooks_favorites') || '[]');
    
    if (isFavorite) {
      favorites = favorites.filter((favId: string) => favId !== ebook.id);
      toast.success('Removido dos favoritos!');
    } else {
      favorites.push(ebook.id);
      toast.success('Adicionado aos favoritos!');
    }
    
    localStorage.setItem('ebooks_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handleDownload = () => {
    if (!ebook) return;
    toast.success('Gerando PDF... Aguarde.');
    
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.text(ebook.title, 20, 30, { maxWidth: 170 });
      
      doc.setFontSize(14);
      doc.text(`Autor: ${ebook.author}`, 20, 50);
      
      doc.setFontSize(12);
      const content = ebook.fullDescription || ebook.description;
      const splitText = doc.splitTextToSize(content, 170);
      
      let y = 70;
      for (let i = 0; i < splitText.length; i++) {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(splitText[i], 20, y);
        y += 7;
      }
      
      doc.save(`${ebook.title.replace(/\s+/g, '_')}.pdf`);
      toast.success('Download concluído!');
    }).catch(err => {
      console.error(err);
      toast.error('Erro ao gerar PDF.');
    });
  };

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <SEO title="E-book não encontrado" />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">E-book não encontrado</h2>
          <p className="text-slate-500">O e-book que você está procurando não existe ou foi removido.</p>
          <Link to="/ebooks" className="inline-flex items-center text-primary-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen py-8 md:py-12">
      <SEO 
        title={ebook.title} 
        description={ebook.description} 
        image={ebook.capa} 
      />
      <Toaster position="bottom-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/ebooks" className="text-sm font-medium text-slate-500 hover:text-primary-600 mb-6 inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" /> Voltar para E-books
        </Link>
        
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Cover Column */}
            <div className="md:w-1/3 lg:w-1/4 p-6 md:p-8 bg-slate-100 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-200">
              <div className="relative w-full max-w-[280px] mx-auto mb-6">
                <img 
                  src={ebook.capa} 
                  alt={`Capa do livro ${ebook.title}`} 
                  className="w-full rounded-lg shadow-xl"
                />
                <button 
                  onClick={toggleFavorite}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  aria-pressed={isFavorite}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} aria-hidden="true" />
                </button>
              </div>
              
              <div className="w-full space-y-3">
                {ebook.isPaid ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center shadow-sm">
                    <p className="text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">E-book Premium</p>
                    <p className="text-xl font-bold text-green-900 mb-4">{ebook.price || "Pago"}</p>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-100 mb-4 mx-auto w-48 h-48 flex items-center justify-center">
                      <img 
                        src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${ebook.pixKey}&choe=UTF-8`} 
                        alt="QR Code do PIX" 
                        className="w-full h-full"
                      />
                    </div>
                    
                    <p className="text-xs text-green-700 mb-2 font-medium">Ou pague usando a chave PIX:</p>
                    <div className="bg-white p-3 rounded-lg border border-green-100 flex items-center justify-between mb-5 shadow-sm">
                      <span className="font-mono font-bold text-green-900 tracking-wider text-base">{ebook.pixKey}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(ebook.pixKey);
                          toast.success('Chave PIX copiada!');
                        }}
                        className="text-xs bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-md hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Copiar chave PIX"
                      >
                        Copiar
                      </button>
                    </div>
                    
                    <a 
                      href={`https://wa.me/5511919125076?text=Ol%C3%A1%2C%20fiz%20o%20pagamento%20do%20E-book%20%22${encodeURIComponent(ebook.title)}%22%20e%20gostaria%20de%20receber%20o%20acesso%21`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Enviar Comprovante
                    </a>
                  </div>
                ) : (
                  <>
                    <Link 
                      to={`/read/${ebook.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      aria-label={`Ler o e-book ${ebook.title} agora`}
                    >
                      <BookOpen className="w-5 h-5" aria-hidden="true" />
                      Ler E-book
                    </Link>
                    <button 
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                      aria-label={`Baixar e-book ${ebook.title} em PDF`}
                    >
                      <Download className="w-5 h-5" aria-hidden="true" />
                      Baixar PDF
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Details Column */}
            <div className="md:w-2/3 lg:w-3/4 p-6 md:p-10 flex flex-col">
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {ebook.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-slate-600" aria-label={`Avaliação: ${ebook.rating} de 5`}>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                    {ebook.rating}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-500 ml-auto" aria-label={`${views} visualizações`}>
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    {views} visualizações
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                  {ebook.title}
                </h1>
                <p className="text-xl text-slate-600">Criado por <span className="font-semibold">{ebook.author}</span></p>
              </header>
              
              <div className="mb-10 flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Descrição</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {(ebook.fullDescription || ebook.description).split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
              
              <footer className="border-t border-slate-200 pt-8 mt-auto">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Detalhes do E-book</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Páginas</p>
                      <p className="font-medium text-slate-900">{ebook.pages}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Idioma</p>
                      <p className="font-medium text-slate-900">{ebook.language}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Formato</p>
                      <p className="font-medium text-slate-900">{ebook.format}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Publicação</p>
                      <p className="font-medium text-slate-900">
                        {new Date(ebook.publishDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  );
};

export default EbookDetails;
