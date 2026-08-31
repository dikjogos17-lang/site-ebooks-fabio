const fs = require('fs');

const ebooksPath = 'C:/Users/bossg/.gemini/antigravity/scratch/ebookstore/src/data/ebooks.ts';
let content = fs.readFileSync(ebooksPath, 'utf8');

// 1. Rename coverImage to capa in the interface
content = content.replace(/coverImage:\s*string;/, 'capa: string;');

// 2. Replace all coverImage: "..." with capa: "/capas/ebook-X.jpg"
// We need to parse or regex carefully because of dynamic IDs.
// Actually, since the objects have `id: "X",`, we can do a replace with a replacer function.

content = content.replace(/id:\s*"(\d+)",([\s\S]*?)coverImage:\s*"[^"]*",/g, (match, id, between) => {
  return `id: "${id}",${between}capa: "/capas/ebook-${id}.jpg",`;
});

fs.writeFileSync(ebooksPath, content, 'utf8');
console.log('Updated ebooks.ts successfully!');
