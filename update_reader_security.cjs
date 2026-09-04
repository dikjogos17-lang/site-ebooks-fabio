const fs = require('fs');

let content = fs.readFileSync('src/pages/Reader.tsx', 'utf8');

// Decryption logic
const rawContentSearch = "(ebook.content || ebook.fullDescription || ebook.description)";
const newContentLogic = `(() => {
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
          })()`;

content = content.replace(rawContentSearch, newContentLogic);

// Anti-select
content = content.replace(
  '<div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>',
  '<div className={`min-h-screen transition-colors duration-300 select-none ${themeClasses[theme]}`} onContextMenu={(e) => e.preventDefault()}>'
);

// Add a visible warning about copy protection
content = content.replace(
  '<p className="text-lg opacity-80 font-medium">Por {ebook.author}</p>',
  '<p className="text-lg opacity-80 font-medium">Por {ebook.author}</p>\n          <p className="text-xs text-red-500 font-bold mt-2">🔒 Conteúdo protegido contra cópia.</p>'
);

fs.writeFileSync('src/pages/Reader.tsx', content);
console.log('Updated Reader.tsx with decryption and anti-copy!');
