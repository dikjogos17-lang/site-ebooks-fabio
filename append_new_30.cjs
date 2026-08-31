const fs = require('fs');
const path = require('path');

const rawText = fs.readFileSync('raw_text.txt', 'utf8');
const ebookBlocks = rawText.split(/E-book \d+\s*/i).filter(b => b.trim().length > 0);

let nextId = 45; // Start after 44
const ebooks = [];

for (const block of ebookBlocks) {
  const text = block.trim();
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  let title = lines[0].replace(/^"|"$/g, '').trim();
  if (title.toLowerCase().includes("fabio russo") && lines.length > 1) {
      title = lines[1].replace(/^"|"$/g, '').trim();
  }
  
  let description = text.substring(0, 150).replace(/\n/g, ' ') + '...';
  
  const ebookObj = {
    id: nextId.toString(),
    title: title,
    author: "Fabio Russo",
    category: "Estudos Bíblicos",
    description: description,
    fullDescription: text,
    rating: 5.0,
    pages: Math.max(10, Math.floor(text.split(/\s+/).length / 250)),
    capa: `/capas/ebook-${nextId}.jpg`,
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-08-30",
    views: Math.floor(Math.random() * 500) + 100
  };
  
  ebooks.push(ebookObj);
  nextId++;
}

const ebooksTsPath = path.join(__dirname, 'src', 'data', 'ebooks.ts');
let ebooksTsContent = fs.readFileSync(ebooksTsPath, 'utf8');

const lastBracketIndex = ebooksTsContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const before = ebooksTsContent.substring(0, lastBracketIndex);
  const after = ebooksTsContent.substring(lastBracketIndex);
  
  const newContent = before + ',\n' + ebooks.map(e => JSON.stringify(e, null, 2)).join(',\n') + '\n' + after;
  fs.writeFileSync(ebooksTsPath, newContent, 'utf8');
  console.log(`Appended ${ebooks.length} new ebooks successfully!`);
}
