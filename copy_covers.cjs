const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\bossg\\.gemini\\antigravity\\brain\\15d945d2-94f5-4119-ad33-107e80d915c6';
const destDir = path.join(__dirname, 'public', 'capas');

const files = [
  { src: 'cover_1_1788061526152.jpg', dest: 'ebook-1.jpg' },
  { src: 'cover_2_1788061536628.jpg', dest: 'ebook-2.jpg' },
  { src: 'cover_3_1788061547177.jpg', dest: 'ebook-3.jpg' },
  { src: 'cover_4_1788061557286.jpg', dest: 'ebook-4.jpg' },
  { src: 'cover_5_1788061566113.jpg', dest: 'ebook-5.jpg' },
  { src: 'cover_6_1788061576909.jpg', dest: 'ebook-6.jpg' },
  { src: 'cover_7_1788061586349.jpg', dest: 'ebook-7.jpg' },
  { src: 'cover_8_1788061595443.jpg', dest: 'ebook-8.jpg' },
  { src: 'cover_9_1788061605785.jpg', dest: 'ebook-9.jpg' },
  { src: 'cover_10_1788061615395.jpg', dest: 'ebook-10.jpg' },
];

files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f.src), path.join(destDir, f.dest));
  console.log(`Copied ${f.src} to ${f.dest}`);
});
