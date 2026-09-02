const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

// The array starts here:
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

// Find the newly added paid ebook
const newEbook = ebooks.find(e => e.slug === 'um-familiar-vai-reconhecer-o-outro-na-eternidade');

if (newEbook) {
  // Fix the cover
  newEbook.capa = '/capas/ebook-45.jpg';
  
  // Make the fullDescription shorter (synopsis)
  newEbook.fullDescription = `"Não queremos, porém, irmãos, que sejais ignorantes com respeito aos que dormem, para não vos entristecerdes como os demais, que não tem esperança. Pois, se cremos que Jesus ressuscitou, assim também Deus, mediante Jesus, trará em Sua companhia os que dormem" (1 Tessalonicenses 4.13,14)\n\nUm familiar vai reconhecer o outro na Eternidade? "Muitos virão do Oriente e Ocidente e tomarão lugares à mesa com Abraão, Isaque e Jacó" (Mateus 8.11). Temos aqui uma família reconhecida no Reino dos Céus: "Avô, Filho e Neto".\n\nNeste E-book Premium, abordaremos o tema da vida após a morte sob a perspectiva bíblica, a consciência na eternidade, o mistério dos três dias e três noites de Jesus no coração da terra e a promessa gloriosa do reencontro familiar na Eternidade.`;
}

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Fixed ebook data successfully!');
