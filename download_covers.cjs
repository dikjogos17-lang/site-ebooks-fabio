const fs = require('fs');
const https = require('https');
const path = require('path');

const capasDir = path.join(__dirname, 'public', 'capas');

if (!fs.existsSync(capasDir)) {
  fs.mkdirSync(capasDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (res.statusCode === 301 || res.statusCode === 302) {
         downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Status Code: ${res.statusCode} for ${url}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading sem-capa.jpg...');
  await downloadImage('https://placehold.co/600x800/94a3b8/ffffff/jpeg?text=Sem+Capa', path.join(capasDir, 'sem-capa.jpg'));

  // Download for all 44 ebooks
  for (let i = 1; i <= 44; i++) {
    const url = `https://placehold.co/600x800/1e3a8a/ffffff/jpeg?text=E-book+${i}`;
    const filepath = path.join(capasDir, `ebook-${i}.jpg`);
    console.log(`Downloading ${filepath}...`);
    try {
      await downloadImage(url, filepath);
    } catch (e) {
      console.error(`Failed to download ebook-${i}.jpg:`, e.message);
    }
  }
  console.log('Done!');
}

run();
