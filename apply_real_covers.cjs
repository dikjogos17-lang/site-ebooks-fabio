const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\bossg\\.gemini\\antigravity\\brain\\15d945d2-94f5-4119-ad33-107e80d915c6\\.user_uploaded';
const destDir = path.join(__dirname, 'public', 'capas');

const sourceFiles = [
  'media_1788062953953.jpg',
  'media_1788062980787.jpg',
  'media_1788062980790.jpg',
  'media_1788062980792.jpg',
  'media_1788062980944.jpg'
].map(f => path.join(uploadedDir, f));

// Verify source files exist
const validSources = sourceFiles.filter(f => fs.existsSync(f));

if (validSources.length > 0) {
  // Replace all 44 ebook covers by cycling through the valid sources
  for (let i = 1; i <= 44; i++) {
    const sourceFile = validSources[(i - 1) % validSources.length];
    const destFile = path.join(destDir, `ebook-${i}.jpg`);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied ${path.basename(sourceFile)} to ebook-${i}.jpg`);
  }
} else {
  console.log('No valid source files found.');
}
