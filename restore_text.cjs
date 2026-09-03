const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

// Update interface
if (!content.includes('content?: string;')) {
  content = content.replace(
    'fullDescription?: string;',
    'fullDescription?: string;\n  content?: string;'
  );
}

// Get the full text from the original script
const originalScript = fs.readFileSync('add_paid_ebook.cjs', 'utf8');
const textMatch = originalScript.match(/fullDescription: `([\s\S]*?)`,/);
const fullText = textMatch ? textMatch[1] : '';

// Insert the full text into the ebook data
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

const newEbook = ebooks.find(e => e.slug === 'um-familiar-vai-reconhecer-o-outro-na-eternidade');
if (newEbook && fullText) {
  newEbook.content = fullText;
}

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Restored the full book content into the content property!');
