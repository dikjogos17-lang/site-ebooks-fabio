const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const videoSection = `
      {/* Featured Video */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Palavra do Autor</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Confira uma mensagem especial sobre as Escrituras e reflexões profundas sobre a fé.</p>
          </div>
          
          <div className="flex justify-center w-full">
            <div className="rounded-[24px] overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-100 flex items-center justify-center bg-black transition-transform hover:scale-[1.02] duration-300" style={{ width: 340, height: 600 }}>
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=600&href=https%3A%2F%2Fwww.facebook.com%2Fdesmascarandoosfalsosprofetas%2Fvideos%2F1880052162183784%2F&show_text=false&width=340&t=0"
                width="340"
                height="600"
                className="border-none overflow-hidden"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Vídeo Sobre o Dízimo"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
`;

content = content.replace('      {/* Categories */}', videoSection + '\n      {/* Categories */}');

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Video section added successfully!');
