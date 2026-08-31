const fs = require('fs');

const content = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/brain/15d945d2-94f5-4119-ad33-107e80d915c6/.system_generated/steps/201/content.md', 'utf-8');

const titleMatch = content.match(/<meta property="og:title" content="(.*?)"/);
const descMatch = content.match(/<meta property="og:description" content="(.*?)"/);
const imageMatch = content.match(/<meta property="og:image" content="(.*?)"/);

console.log('Title:', titleMatch ? titleMatch[1] : null);
console.log('Desc:', descMatch ? descMatch[1] : null);
console.log('Image:', imageMatch ? imageMatch[1] : null);
