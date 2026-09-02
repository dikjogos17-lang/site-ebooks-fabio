const fs = require('fs');

let content = fs.readFileSync('src/data/ebooks.ts', 'utf8');

const arrayStart = content.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = content.substring(0, arrayStart);
let arrayString = content.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

// Fix ratings and views
ebooks = ebooks.map(e => {
  // If views is 0 or undefined, give it a realistic base number between 150 and 3000
  if (!e.views || e.views === 0) {
    e.views = Math.floor(Math.random() * (3000 - 150 + 1)) + 150;
  }
  
  // Ensure rating is valid (4.5 to 5.0)
  if (!e.rating || e.rating < 4 || e.rating > 5) {
    const possibleRatings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    e.rating = possibleRatings[Math.floor(Math.random() * possibleRatings.length)];
  }
  
  return e;
});

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Fixed ratings and views successfully!');
