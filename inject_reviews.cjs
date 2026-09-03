const fs = require('fs');
let c = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

if (!c.includes('EbookReviews')) {
  c = c.replace(
    "import { ebooks } from '../data/ebooks';",
    "import { ebooks } from '../data/ebooks';\nimport EbookReviews from '../components/EbookReviews';"
  );
  c = c.replace(
    "</motion.article>",
    "</motion.article>\n        <EbookReviews ebookId={ebook.id} baseRating={ebook.rating} />"
  );
  fs.writeFileSync('src/pages/EbookDetails.tsx', c);
  console.log('Injected successfully');
}
