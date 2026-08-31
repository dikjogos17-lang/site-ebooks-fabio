const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\bossg\\.gemini\\antigravity\\brain\\15d945d2-94f5-4119-ad33-107e80d915c6\\.user_uploaded';
const destDir = path.join(__dirname, 'public', 'capas');

const sourceFiles = [
  'media_1788065406396.jpg',
  'media_1788065406471.jpg',
  'media_1788065406472.jpg',
  'media_1788065406990.jpg',
  'media_1788065406996.jpg'
].map(f => path.join(uploadedDir, f));

const validSources = sourceFiles.filter(f => fs.existsSync(f));

if (validSources.length > 0) {
  for (let i = 1; i <= 75; i++) {
    const sourceFile = validSources[(i - 1) % validSources.length];
    const destFile = path.join(destDir, `ebook-${i}.jpg`);
    fs.copyFileSync(sourceFile, destFile);
  }
  console.log('Successfully applied images to all 75 e-books!');
}
