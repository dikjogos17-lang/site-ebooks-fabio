const fs = require('fs');

let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');

// Add new imports from lucide-react
content = content.replace(
  "Star, BookOpen, Download, FileText, Globe, Calendar, Heart, Eye, ArrowLeft",
  "Star, BookOpen, Download, FileText, Globe, Calendar, Heart, Eye, ArrowLeft, Upload, CheckCircle, Loader2"
);

// Add new state variables
content = content.replace(
  "const [views, setViews] = useState(0);",
  "const [views, setViews] = useState(0);\n  const [receiptFile, setReceiptFile] = useState<File | null>(null);\n  const [isAnalyzing, setIsAnalyzing] = useState(false);\n  const [isApproved, setIsApproved] = useState(false);\n\n  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files && e.target.files[0]) {\n      setReceiptFile(e.target.files[0]);\n      setIsAnalyzing(true);\n      setTimeout(() => {\n        setIsAnalyzing(false);\n        setIsApproved(true);\n        toast.success('Pagamento Aprovado! E-book liberado.');\n      }, 3000);\n    }\n  };"
);

// Replace the payment UI block
const oldPaymentBlockStart = content.indexOf('{ebook.isPaid ? (');
const oldPaymentBlockEnd = content.indexOf(') : (', oldPaymentBlockStart);

const newPaymentBlock = `{ebook.isPaid && !isApproved ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center shadow-sm">
                    <p className="text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">E-book Premium</p>
                    <p className="text-xl font-bold text-green-900 mb-4">{ebook.price || "Pago"}</p>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-100 mb-4 mx-auto w-48 h-48 flex items-center justify-center">
                      <img 
                        src={\`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${encodeURIComponent(ebook.pixPayload || ebook.pixKey)}\`} 
                        alt="QR Code do PIX" 
                        className="w-full h-full"
                      />
                    </div>
                    
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(ebook.pixPayload || ebook.pixKey);
                        toast.success('Pix Copia e Cola copiado com sucesso!');
                      }}
                      className="w-full text-sm bg-green-100 text-green-800 font-bold px-4 py-3 rounded-lg border border-green-200 hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                      aria-label="Copiar código PIX"
                    >
                      Copiar código PIX (Copia e Cola)
                    </button>
                    
                    <div className="mt-4 pt-4 border-t border-green-200">
                      {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-4 space-y-3">
                          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                          <p className="text-green-800 font-medium animate-pulse">Analisando comprovante...</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-green-800 font-medium mb-3">Já fez o PIX? Anexe o comprovante para liberar o E-book:</p>
                          <label className="w-full flex flex-col items-center justify-center px-4 py-4 bg-white border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                            <Upload className="w-6 h-6 text-green-500 mb-2" />
                            <span className="text-sm text-green-700 font-medium">Anexar Comprovante</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleUpload} 
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {isApproved && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4 flex items-center justify-center gap-2 text-green-800 font-bold">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Pagamento Aprovado!
                      </div>
                    )}
                    <Link 
                      to={\`/read/\${ebook.id}\`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      aria-label={\`Ler o e-book \${ebook.title} agora\`}
                    >
                      <BookOpen className="w-5 h-5" aria-hidden="true" />
                      Ler E-book
                    </Link>
                    <button 
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                      aria-label={\`Baixar e-book \${ebook.title} em PDF\`}
                    >
                      <Download className="w-5 h-5" aria-hidden="true" />
                      Baixar PDF
                    </button>
                  </>
                }`;

content = content.substring(0, oldPaymentBlockStart) + newPaymentBlock + content.substring(oldPaymentBlockEnd + 5);

fs.writeFileSync('src/pages/EbookDetails.tsx', content);
console.log('EbookDetails.tsx updated with psychological barrier upload!');
