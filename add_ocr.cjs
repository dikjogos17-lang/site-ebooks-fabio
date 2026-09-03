const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

// Add Tesseract import
if (!content.includes("import Tesseract from 'tesseract.js';")) {
  content = content.replace(
    "import { ebooks } from '../data/ebooks';",
    "import { ebooks } from '../data/ebooks';\nimport Tesseract from 'tesseract.js';"
  );
}

// Replace handleUpload logic
const oldHandleUploadStart = content.indexOf('const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {');
const oldHandleUploadEnd = content.indexOf('};', oldHandleUploadStart) + 2;

const newHandleUpload = `const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      setIsAnalyzing(true);
      
      try {
        // Run OCR on the image
        const result = await Tesseract.recognize(file, 'por');
        const text = result.data.text.toLowerCase();
        
        // Remove special chars for easier matching
        const normalizedText = text.replace(/[^a-z0-9]/g, '');
        
        const hasFabio = normalizedText.includes('fabio');
        const hasRusso = normalizedText.includes('russo');
        const hasAzevedo = normalizedText.includes('azevedo');
        
        // We require finding Fabio Russo Azevedo
        if (hasFabio && hasRusso && hasAzevedo) {
          setIsAnalyzing(false);
          setIsApproved(true);
          toast.success('Pagamento validado! E-book liberado com sucesso.');
        } else {
          setIsAnalyzing(false);
          toast.error('Comprovante inválido. Não encontramos o recebedor "Fabio Russo Azevedo" na imagem. Envie o comprovante original do banco.');
        }
      } catch (error) {
        setIsAnalyzing(false);
        toast.error('Erro ao ler a imagem. Tente enviar um comprovante mais nítido.');
      }
    }
  };`;

if (oldHandleUploadStart !== -1) {
  content = content.substring(0, oldHandleUploadStart) + newHandleUpload + content.substring(oldHandleUploadEnd);
}

// Update the "Analisando comprovante..." text to indicate it might take a while
content = content.replace(
  '<p className="text-green-800 font-medium animate-pulse">Analisando comprovante...</p>',
  '<p className="text-green-800 font-medium animate-pulse text-center">Lendo comprovante com IA...<br/><span className="text-xs">(Isso pode levar alguns segundos)</span></p>'
);

fs.writeFileSync('src/pages/EbookDetails.tsx', content);
console.log('Added OCR with Tesseract.js!');
