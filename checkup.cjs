const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks;
try {
  ebooks = eval(arrayString);
  console.log(`✅ Loaded ${ebooks.length} ebooks from database.`);
} catch (e) {
  console.error('❌ Failed to parse ebooks array:', e.message);
  process.exit(1);
}

let missingCovers = 0;
let missingDescriptions = 0;

const publicDir = path.join(__dirname, 'public');

ebooks.forEach(ebook => {
  // Check cover
  let capaPath = ebook.capa;
  if (capaPath.startsWith('/')) {
    capaPath = capaPath.substring(1);
  }
  const fullPath = path.join(publicDir, capaPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Missing cover for ${ebook.title}: ${ebook.capa}`);
    missingCovers++;
  }

  // Check content/description
  const textContent = ebook.content || ebook.fullDescription || ebook.description;
  if (!textContent || textContent.trim().length === 0) {
    console.warn(`⚠️  Missing description/content for ${ebook.title}`);
    missingDescriptions++;
  }
});

console.log('--- Summary ---');
console.log(`Missing Covers: ${missingCovers}`);
console.log(`Missing Content: ${missingDescriptions}`);

if (missingCovers > 0) {
  // Let's list available images in capas
  const capasDir = path.join(publicDir, 'capas');
  const available = fs.readdirSync(capasDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Available covers in public/capas/: ${available.length}`);
}
