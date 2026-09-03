const fs = require('fs');

let content = fs.readFileSync('src/components/EbookReviews.tsx', 'utf8');

const startIdx = content.indexOf('// Generate some fake base reviews if none exist');
const endIdx = content.indexOf('}, [ebookId]);');

const replacement = `
    setReviews([...localReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  `;

content = content.substring(0, startIdx) + replacement + content.substring(endIdx);

fs.writeFileSync('src/components/EbookReviews.tsx', content);
console.log('Removed fake reviews logic!');
