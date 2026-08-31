const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'capas');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://loremflickr.com' + res.headers.location;
        downloadImage(redirectUrl, dest).then(resolve).catch(reject);
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error('Status: ' + res.statusCode));
      }
    }).on('error', reject);
  });
}

async function run() {
  console.log('Starting download of 44 unique images...');
  const promises = [];
  
  for (let i = 1; i <= 44; i++) {
    const dest = path.join(destDir, `ebook-${i}.jpg`);
    // 'bible' keyword pulls real bible photos
    const url = `https://loremflickr.com/600/900/bible?lock=${i}`; 
    promises.push(
      downloadImage(url, dest)
        .then(() => console.log(`Downloaded ebook-${i}.jpg`))
        .catch(e => console.error(`Failed ebook-${i}.jpg:`, e.message))
    );
    
    // Slight delay to prevent hammering the server
    await new Promise(r => setTimeout(r, 200));
  }
  
  await Promise.all(promises);
  console.log('All downloads finished.');
}

run();
