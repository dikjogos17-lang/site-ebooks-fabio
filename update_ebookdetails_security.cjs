const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

// Update PDF Generator to decode if encrypted, and add watermark
const pdfLogicStart = content.indexOf('doc.setFontSize(12);');
const pdfLogicEnd = content.indexOf('const splitText = doc.splitTextToSize', pdfLogicStart);

const newPdfLogic = `      doc.setFontSize(12);
      let contentText = ebook.content || ebook.fullDescription || ebook.description;
      if (ebook.isEncrypted && ebook.content) {
        try {
          // Use Buffer if in Node, but this is browser so we use standard decode
          const binaryStr = window.atob(ebook.content);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
          }
          contentText = new TextDecoder().decode(bytes);
        } catch(e) {
          console.error('Decoding failed', e);
        }
      }
      
      // ADD WATERMARK
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(40);
      // We will add watermark in the loop below
      doc.setTextColor(0, 0, 0); // reset color for text
      doc.setFontSize(12);
      `;

content = content.substring(0, pdfLogicStart) + newPdfLogic + content.substring(pdfLogicEnd);

// Add watermark printing in the loop
content = content.replace(
  'doc.text(splitText[i], 20, y);',
  `// Watermark every page
        if (y === 20 || y === 70) {
          doc.setTextColor(230, 230, 230);
          doc.setFontSize(30);
          doc.text('CÓPIA PROTEGIDA - USO EXCLUSIVO', 30, 150, { angle: 45 });
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
        }
        doc.text(splitText[i], 20, y);`
);

fs.writeFileSync('src/pages/EbookDetails.tsx', content);
console.log('Updated EbookDetails.tsx with decryption and watermark!');
