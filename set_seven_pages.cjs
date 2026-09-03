const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

// Find the specific E-book and set its pages to 7
const targetEbook = ebooks.find(e => e.slug === 'um-familiar-vai-reconhecer-o-outro-na-eternidade');
if (targetEbook) {
  targetEbook.pages = 7;
}

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Successfully updated the specific E-book to 7 pages!');
