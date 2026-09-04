const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

const startIdx = content.indexOf('const hasFabio = normalizedText.includes(\'fabio\');');
const endIdx = content.indexOf('toast.success(\'Pagamento validado! E-book liberado com sucesso.\');') - 39;

const newLogic = `const hasName = normalizedText.includes('fabio') && normalizedText.includes('russo') && normalizedText.includes('azevedo');
        const hasType = normalizedText.includes('pix') || normalizedText.includes('comprovante') || normalizedText.includes('pagamento');
        
        const numericPrice = (ebook.price || "3,00").replace(/[^0-9]/g, '');
        const hasPrice = normalizedText.includes(numericPrice);
        
        const currentYear = new Date().getFullYear().toString();
        const hasYear = normalizedText.includes(currentYear);
        
        // Critério antifraude rigoroso
        if (hasName && hasType && hasPrice && hasYear) {`;

content = content.substring(0, startIdx) + newLogic + content.substring(endIdx);

fs.writeFileSync('src/pages/EbookDetails.tsx', content);
console.log('Advanced OCR validation logic added!');
