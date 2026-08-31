const fs = require('fs');
let content = fs.readFileSync('src/data/ebooks.ts', 'utf-8');
content = content.replace(/author:\s*".*?"/g, 'author: "Fabio"');
fs.writeFileSync('src/data/ebooks.ts', content);
