const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

// The array starts here:
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

// 1. Remove the entirely corrupted ebook
ebooks = ebooks.filter(e => e.id !== 'c2554716-9555-463c-a741-1c5a3c1f9f1a');

// 2. Fix the other ebook with trailing tags
const ebookToFix = ebooks.find(e => e.id === '5084e018-b567-4226-b372-93703c61e903');
if (ebookToFix && ebookToFix.fullDescription) {
  const cutoffIndex = ebookToFix.fullDescription.indexOf('</USER_REQUEST>');
  if (cutoffIndex !== -1) {
    ebookToFix.fullDescription = ebookToFix.fullDescription.substring(0, cutoffIndex).trim();
  }
}

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Fixed ebooks.ts successfully!');
