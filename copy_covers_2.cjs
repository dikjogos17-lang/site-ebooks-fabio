const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\bossg\\.gemini\\antigravity\\brain\\15d945d2-94f5-4119-ad33-107e80d915c6';
const destDir = path.join(__dirname, 'public', 'capas');

const files = [
  { src: 'cover_ladrao_cruz_1788026592605.jpg', dest: 'ebook-11.jpg' },
  { src: 'cover_salvos_graca_1788026602669.jpg', dest: 'ebook-12.jpg' },
  { src: 'cover_predestinacao_1788026614053.jpg', dest: 'ebook-13.jpg' },
  { src: 'cover_amou_mundo_1788026624034.jpg', dest: 'ebook-14.jpg' },
  { src: 'cover_ebook_15_1788026880865.jpg', dest: 'ebook-15.jpg' },
  { src: 'cover_ebook_16_1788026891616.jpg', dest: 'ebook-16.jpg' },
  { src: 'cover_ebook_17_1788026903812.jpg', dest: 'ebook-17.jpg' },
  { src: 'cover_ebook_18_1788026913558.jpg', dest: 'ebook-18.jpg' },
];

files.forEach(f => {
  if (fs.existsSync(path.join(srcDir, f.src))) {
    fs.copyFileSync(path.join(srcDir, f.src), path.join(destDir, f.dest));
    console.log(`Copied ${f.src} to ${f.dest}`);
  }
});
