const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

// The array starts here:
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

// Update interface if pixPayload doesn't exist
let finalBeforeArray = beforeArray;
if (!finalBeforeArray.includes('pixPayload?: string;')) {
  finalBeforeArray = finalBeforeArray.replace(
    'pixKey?: string;',
    'pixKey?: string;\n  pixPayload?: string;'
  );
}

// Find the ebook
const newEbook = ebooks.find(e => e.slug === 'um-familiar-vai-reconhecer-o-outro-na-eternidade');

if (newEbook) {
  newEbook.price = "R$ 3,00";
  // Delete the old raw CPF key so it's not exposed
  delete newEbook.pixKey;
  
  // The functional PIX payload for R$ 3,00
  newEbook.pixPayload = "00020126330014br.gov.bcb.pix01111479229784252040000530398654043.005802BR5911Fabio Russo6009Sao Paulo62070503***63044FCF";
}

const newContent = finalBeforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Fixed ebook price and payload successfully!');
