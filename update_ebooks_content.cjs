const fs = require('fs');
const path = require('path');

const text = fs.readFileSync('raw_text.txt', 'utf-8');

// Parse text into an array of texts for each E-book
const ebookTexts = {};
const regex = /E-book\s+(\d+)\s+([\s\S]*?)(?=\nE-book\s+\d+\s+|$)/g;

let match;
while ((match = regex.exec(text)) !== null) {
  const id = parseInt(match[1], 10);
  const content = match[2].trim();
  ebookTexts[id] = content;
}

// Read current ebooks
const dataPath = path.join(__dirname, 'src', 'data', 'ebooks.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// The file exports `export const ebooks: Ebook[] = [ ... ]`
// We can parse it by replacing the content using eval or string replacement.
// Since it's a TS file with type definitions, it's safer to use eval for the array
// but we need to preserve the imports and exports.

const tsMatch = dataContent.match(/export const ebooks: Ebook\[\] = (\[[\s\S]*\]);/);
if (tsMatch) {
  let ebooksArrayStr = tsMatch[1];
  
  // Convert string to array of objects safely
  const ebooks = eval(`(${ebooksArrayStr})`);
  
  // Update ebooks
  ebooks.forEach(ebook => {
    const id = parseInt(ebook.id, 10);
    if (ebookTexts[id]) {
      ebook.fullDescription = ebookTexts[id];
      // create a short description from the first paragraph or so
      const firstLines = ebookTexts[id].split('\n').filter(l => l.trim().length > 0).slice(0, 2).join(' ');
      ebook.description = firstLines.substring(0, 150) + (firstLines.length > 150 ? '...' : '');
    }
  });

  // Re-serialize the array
  const updatedEbooksStr = JSON.stringify(ebooks, null, 2)
    // Cleanup some JSON formatting to make it look like JS again
    .replace(/"([^"]+)":/g, '$1:');

  const newContent = dataContent.replace(tsMatch[1], updatedEbooksStr);
  fs.writeFileSync(dataPath, newContent);
  console.log(`Updated ${Object.keys(ebookTexts).length} ebooks in ebooks.ts`);
} else {
  console.log('Failed to parse ebooks array');
}
