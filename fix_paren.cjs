const fs = require('fs');
let content = fs.readFileSync('src/pages/EbookDetails.tsx', 'utf8');
content = content.replace("                )}\r\n                )}\r\n              </div>", "                )}\r\n              </div>");
content = content.replace("                )}\n                )}\n              </div>", "                )}\n              </div>");
fs.writeFileSync('src/pages/EbookDetails.tsx', content);
