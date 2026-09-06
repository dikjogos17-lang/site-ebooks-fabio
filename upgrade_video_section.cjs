const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const oldVideoSectionStart = content.indexOf('{/* Featured Video */}');
const oldVideoSectionEnd = content.indexOf('{/* Categories */}');

const newVideoSection = `{/* Featured Video Section */}
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

      `;

content = content.substring(0, oldVideoSectionStart) + newVideoSection + content.substring(oldVideoSectionEnd);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Premium Video Section integrated!');
