const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const securityScript = `
    <script>
      // Segurança Antifraude
      document.addEventListener('contextmenu', event => event.preventDefault());
      document.addEventListener('keydown', function (event) {
        if (event.keyCode === 123) { // F12
          event.preventDefault();
        }
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) { // Ctrl+Shift+I/J/C
          event.preventDefault();
        }
        if (event.ctrlKey && event.keyCode === 85) { // Ctrl+U
          event.preventDefault();
        }
      });
    </script>
  </body>
`;

content = content.replace('</body>', securityScript);

fs.writeFileSync('index.html', content);
console.log('Added global security script to index.html!');
