const fs = require('fs');

const rawText = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/scratch/ebookstore/scratch_raw.txt', 'utf8');

const ebookBlocks = rawText.split(/E-book \d+\s*/i).filter(b => b.trim().length > 0);

const images = [
  "/compreensao_atos.png",
  "/coracao_duro.jpg",
  "/graca_amor.png",
  "/israel_escatologia.png",
  "/rocha_eternal.png",
  "/templo.png"
];

let nextId = 11; // Since there are already 10 ebooks
const ebooks = [];

for (const block of ebookBlocks) {
  const text = block.trim();
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Try to find a good title. Usually the first non-empty line.
  // Sometimes it's wrapped in quotes.
  let title = lines[0].replace(/^"|"$/g, '').trim();
  if (title.toLowerCase().includes("fabio russo") && lines.length > 1) {
      title = lines[1].replace(/^"|"$/g, '').trim();
  }
  
  // Take first 150 chars as description
  let description = text.substring(0, 150).replace(/\n/g, ' ') + '...';
  
  // Escape backticks and ${}
  let safeFullDesc = text.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  
  const img = images[(nextId - 1) % images.length];
  
  const ebookStr = `
  {
    id: "${nextId}",
    title: "${title.replace(/"/g, '\\"')}",
    author: "Fabio Russo",
    category: "Estudos Bíblicos",
    description: "${description.replace(/"/g, '\\"')}",
    fullDescription: \`${safeFullDesc}\`,
    rating: 5.0,
    pages: Math.max(10, Math.floor(${text.split(/\s+/).length} / 250)),
    coverImage: "${img}",
    language: "Português",
    format: "PDF",
    publishDate: "2024",
    views: Math.floor(Math.random() * 500) + 100
  }`;
  
  ebooks.push(ebookStr);
  nextId++;
}

const ebooksTsPath = 'C:/Users/bossg/.gemini/antigravity/scratch/ebookstore/src/data/ebooks.ts';
let ebooksTsContent = fs.readFileSync(ebooksTsPath, 'utf8');

// Find the last ];
const lastBracketIndex = ebooksTsContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const before = ebooksTsContent.substring(0, lastBracketIndex);
  const after = ebooksTsContent.substring(lastBracketIndex);
  
  const newContent = before + ',\n' + ebooks.join(',\n') + '\n' + after;
  fs.writeFileSync(ebooksTsPath, newContent, 'utf8');
  console.log(`Appended ${ebooks.length} ebooks successfully!`);
} else {
  console.error("Could not find end of ebooks array '];'");
}
