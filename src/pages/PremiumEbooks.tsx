import { Link } from 'react-router-dom';
import { Crown, Sparkles, ShieldCheck, Zap, Download, BookOpen, Star, ArrowRight, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { ebooks } from '../data/ebooks';

const PremiumEbooks = () => {
  const paidEbooks = ebooks.filter(e => e.isPaid);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SEO 
        title="E-books Pagos & Exclusivos | EbookStore" 
        description="Área reservada para os E-books pagos e estudos teológicos aprofundados pelo Pr. Fabio Russo. Liberação instantânea via Pix." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Hero Banner */}
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-8 md:p-14 mb-14 shadow-2xl border border-slate-800">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-primary-600/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Crown className="w-4 h-4 text-amber-400" />
              Área Reservada • Coleção Premium
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              E-books Pagos e <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-primary-300 to-amber-200">
                Estudos Exclusivos
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8">
              Obras de maior extensão, pesquisas teológicas exaustivas e exegeses minuciosas produzidas pelo <strong className="text-white font-medium">Pr. Fabio Russo</strong>. Um valor simbólico de apenas <span className="text-amber-300 font-semibold">R$ 3,00</span> para apoiar e sustentar a obra.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Zap className="w-4 h-4 text-amber-400" /> Liberação Imediata
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-green-400" /> Pagamento Seguro por Pix
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Download className="w-4 h-4 text-blue-400" /> Download PDF Incluso
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Acesso Imediato via Pix</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nosso sistema automatizado lê o comprovante e desbloqueia a leitura do livro na mesma hora sem espera.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Download em PDF Oficial</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Além de ler online pelo celular ou computador, você baixa o PDF completo com marca d'água de proteção.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Apoio à Produção Bíblica</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Por apenas cerca de 3 reais você incentiva o autor a continuar escrevendo estudos e desmascarando enganos.
              </p>
            </div>
          </div>
        </div>

        {/* Paid E-books List Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Crown className="w-6 h-6 text-amber-500" />
                Catálogo de Obras Pagas
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Selecione o E-book desejado para ver a sinopse e efetuar o pagamento via Pix.
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase">
              {paidEbooks.length} Obras Exclusivas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paidEbooks.map((ebook) => (
              <article 
                key={ebook.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
              >
                {/* Book Cover with Price Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img 
                    src={ebook.capa} 
                    alt={`Capa do E-book: ${ebook.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Floating Price Pill */}
                  <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 font-black text-sm md:text-base px-3 py-1 rounded-xl shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    {ebook.price || "R$ 3,00"}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    5.0
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">
                    <span>{ebook.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <BookOpen className="w-3.5 h-3.5" /> {ebook.pages} páginas
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl text-slate-900 leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                    {ebook.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {ebook.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold block">Valor Único</span>
                      <span className="text-lg font-black text-slate-900">{ebook.price || "R$ 3,00"}</span>
                    </div>

                    <Link 
                      to={`/ebook/${ebook.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 group-hover:bg-primary-600 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                    >
                      Acessar e Liberar <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* How It Works & FAQ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 mb-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <HelpCircle className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-slate-900">Como Funciona a Compra?</h3>
            <p className="text-slate-600 text-sm mt-1">
              O processo é 100% automatizado, transparente e instantâneo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-black text-base flex items-center justify-center mx-auto">
                1
              </div>
              <h4 className="font-bold text-slate-900">Selecione o E-book</h4>
              <p className="text-sm text-slate-600">
                Clique no E-book desejado para acessar a tela com a descrição completa e o QR Code do Pix.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-black text-base flex items-center justify-center mx-auto">
                2
              </div>
              <h4 className="font-bold text-slate-900">Pague com Pix</h4>
              <p className="text-sm text-slate-600">
                Abra o app do seu banco, aponte a câmera para o QR Code ou use a chave Copia e Cola pelo valor indicado.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-black text-base flex items-center justify-center mx-auto">
                3
              </div>
              <h4 className="font-bold text-slate-900">Liberação Imediata</h4>
              <p className="text-sm text-slate-600">
                Envie o comprovante na mesma tela. O sistema lê o comprovante e libera o Leitor Online e o Download do PDF.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PremiumEbooks;
