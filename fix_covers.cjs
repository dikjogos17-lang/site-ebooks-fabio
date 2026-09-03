const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

ebooks.forEach(ebook => {
  if (ebook.capa === '/capas/escatologia_1.jpg') {
    ebook.capa = '/capas/ebook-14.jpg'; // Using an existing random cover
  }
  if (ebook.capa === '/capas/israel_escatologia.png') {
    ebook.capa = '/capas/ebook-15.jpg'; // Using an existing random cover
  }
});

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Fixed missing covers for the new ebooks!');
