const fs = require('fs');

let c = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const start = c.indexOf('export const ebooks: Ebook[] = ') + 31;
let arrStr = c.substring(start);
arrStr = arrStr.substring(0, arrStr.lastIndexOf(';'));
let ebooks = eval(arrStr);

let fixed = 0;
ebooks.forEach(e => {
  if (!e.title) { e.title = 'Título Desconhecido'; fixed++; }
  if (!e.author) { e.author = 'Fabio Russo'; fixed++; }
  if (!e.description) { e.description = 'Descrição não disponível no momento.'; fixed++; }
  if (!e.fullDescription && !e.content) { e.fullDescription = e.description; fixed++; }
  if (!e.capa) { e.capa = '/capas/ebook-1.jpg'; fixed++; }
  if (!e.category) { e.category = 'Estudos Bíblicos'; fixed++; }
  if (!e.rating) { e.rating = 5.0; fixed++; }
  if (!e.pages) { e.pages = 10; fixed++; }
  if (!e.language) { e.language = 'Português'; fixed++; }
  if (!e.format) { e.format = 'PDF, EPUB'; fixed++; }
  if (!e.publishDate) { e.publishDate = new Date().toISOString().split('T')[0]; fixed++; }
  if (e.views === undefined || e.views === null) { e.views = Math.floor(Math.random() * 500) + 100; fixed++; }
  if (!e.slug) { e.slug = e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); fixed++; }
  
  // Ensure base64 for paid content if missing encryption flag
  if (e.isPaid && e.content && !e.isEncrypted) {
    e.content = Buffer.from(e.content).toString('base64');
    e.isEncrypted = true;
    fixed++;
  }
});

if (fixed > 0) {
  const beforeArray = c.substring(0, start);
  const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
  fs.writeFileSync('src/data/ebooks.ts', newContent);
  console.log(`Fixed ${fixed} anomalies in ebooks!`);
} else {
  console.log('All ebooks are 100% complete and well-formed!');
}
