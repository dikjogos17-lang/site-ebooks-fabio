const fs = require('fs');

let content = fs.readFileSync('src/pages/Reader.tsx', 'utf8');

// The Reader page splits content into paragraphs. Let's fix the data it uses.
content = content.replace(
  "const content = ebook.fullDescription || ebook.description;",
  "const content = ebook.content || ebook.fullDescription || ebook.description;"
);

fs.writeFileSync('src/pages/Reader.tsx', content);
console.log('Fixed Reader.tsx');
