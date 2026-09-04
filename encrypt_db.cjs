const fs = require('fs');

let dbContent = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const arrayStart = dbContent.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = dbContent.substring(0, arrayStart);
let arrayString = dbContent.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

let encryptedCount = 0;
ebooks.forEach(ebook => {
  if (ebook.isPaid && ebook.content && !ebook.isEncrypted) {
    ebook.content = Buffer.from(ebook.content).toString('base64');
    ebook.isEncrypted = true;
    encryptedCount++;
  }
});

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log(`Encrypted ${encryptedCount} paid ebooks!`);
