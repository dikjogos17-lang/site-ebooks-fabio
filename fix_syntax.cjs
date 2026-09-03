const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

// Find the start of the duplication
const marker = '                  </>\n                }\n                  <>\n                    <Link ';
if (content.includes(marker)) {
  const duplicateStart = content.indexOf('                  </>\n                }\n                  <>\n                    <Link ');
  const duplicateEnd = content.indexOf('                  </>\n                )}', duplicateStart);
  
  if (duplicateStart !== -1 && duplicateEnd !== -1) {
    const toRemove = content.substring(duplicateStart, duplicateEnd + 21);
    content = content.replace(toRemove, '                  </>\n                )}');
    fs.writeFileSync('src/pages/EbookDetails.tsx', content);
    console.log('Fixed syntax error!');
  }
} else {
  console.log('Marker not found. Content near end:');
  console.log(content.substring(content.length - 1000));
}
