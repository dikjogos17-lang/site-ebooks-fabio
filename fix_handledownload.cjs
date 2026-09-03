const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

const handleDownloadStart = content.indexOf('const handleDownload = () => {');
const handleDownloadEnd = content.indexOf('};', handleDownloadStart + 100) + 2;

const newHandleDownload = `const handleDownload = () => {
    if (!ebook) return;
    toast.success('Gerando PDF... Aguarde.');
    
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.text(ebook.title, 20, 30, { maxWidth: 170 });
      
      doc.setFontSize(14);
      doc.text(\`Autor: \${ebook.author}\`, 20, 50);
      
      doc.setFontSize(12);
      const contentText = ebook.content || ebook.fullDescription || ebook.description;
      const splitText = doc.splitTextToSize(contentText, 170);
      
      let y = 70;
      for (let i = 0; i < splitText.length; i++) {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(splitText[i], 20, y);
        y += 7;
      }
      
      doc.save(\`\${ebook.title.replace(/\\s+/g, '_')}.pdf\`);
      toast.success('Download concluído!');
    }).catch(err => {
      console.error(err);
      toast.error('Erro ao gerar PDF.');
    });
  };`;

content = content.substring(0, handleDownloadStart) + newHandleDownload + content.substring(handleDownloadEnd);

fs.writeFileSync('src/pages/EbookDetails.tsx', content);
console.log('Fixed handleDownload in EbookDetails.tsx');
