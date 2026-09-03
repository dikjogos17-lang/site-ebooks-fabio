const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);
const beforeArray = content.substring(0, arrayStart);

ebooks.forEach(ebook => {
  const textContent = ebook.content || ebook.fullDescription || ebook.description;
  // A typical book page has ~1500 characters. Let's use 1500 as a metric.
  const estimatedPages = Math.max(1, Math.ceil(textContent.length / 1200));
  
  // Update the pages property to be the calculated real number
  ebook.pages = estimatedPages;
});

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Updated all E-books with real page numbers based on their actual text length!');
