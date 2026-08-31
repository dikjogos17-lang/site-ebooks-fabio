import { BookOpen, BookMarked, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-4 bg-primary-50 rounded-full mb-6"
          >
            <BookMarked className="w-12 h-12 text-primary-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Sobre o Autor e a Plataforma
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Um ministério dedicado ao ensino claro e estruturado das Escrituras e da Teologia Cristã.
          </motion.p>
        </div>

        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 relative">
              <div className="absolute inset-0 bg-primary-100 rounded-full scale-[1.05]" />
              <img 
                src="/fabio.jpg" 
                alt="Fabio Russo" 
                className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-md"
              />
            </div>
            
            <div className="prose prose-slate max-w-none prose-lg">
              <h2 className="text-3xl font-bold text-slate-900 mt-0 mb-4">Fabio Russo</h2>
              <p className="text-slate-600 font-medium text-xl">
                Criador e Idealizador
              </p>
              <div className="w-16 h-1 bg-primary-500 rounded-full mb-6" />
              
              <p>
                Fabio é um estudioso e criador de conteúdos focado em transformar temas complexos da fé cristã em materiais claros, organizados e acessíveis a todos os públicos.
              </p>
              <p>
                Entre os assuntos abordados em seus estudos estão o <strong>Calvinismo, a doutrina da predestinação, a soberania de Deus, salvação, graça, fé, história do cristianismo e interpretação das Escrituras</strong>. 
              </p>
              <p>
                Por meio desta biblioteca digital gratuita, Fabio busca incentivar cada leitor a conhecer mais profundamente a Bíblia, refletir criticamente sobre diferentes perspectivas teológicas e desenvolver a própria caminhada cristã com solidez.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
              <Target className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Missão</h3>
            <p className="text-slate-600 leading-relaxed">
              Fornecer literatura teológica acessível e bem embasada para edificar a fé e o intelecto de estudantes da Bíblia.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
              <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Acervo</h3>
            <p className="text-slate-600 leading-relaxed">
              Materiais focados em escatologia, doutrinas, história cristã e estudos bíblicos estruturados passo a passo.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 transition-colors">
              <Users className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Comunidade</h3>
            <p className="text-slate-600 leading-relaxed">
              Um ambiente sem fins lucrativos, feito por cristãos e para cristãos que desejam aprofundar suas raízes na Palavra de Deus.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
