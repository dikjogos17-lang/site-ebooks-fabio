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

// Verify source files exist
const validSources = sourceFiles.filter(f => fs.existsSync(f));

if (validSources.length > 0) {
  // Get 5 random unique ebook IDs between 1 and 44
  const randomIds = [];
  while (randomIds.length < validSources.length) {
    const randomId = Math.floor(Math.random() * 44) + 1;
    if (!randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }

  // Copy the images
  validSources.forEach((sourceFile, index) => {
    const destFile = path.join(destDir, `ebook-${randomIds[index]}.jpg`);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied ${path.basename(sourceFile)} to ebook-${randomIds[index]}.jpg`);
  });
} else {
  console.log('No valid source files found.');
}
