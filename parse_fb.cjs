const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/brain/15d945d2-94f5-4119-ad33-107e80d915c6/.system_generated/steps/201/content.md', 'utf-8');

const dom = new JSDOM(content);
const document = dom.window.document;

// Facebook often stores the post text in a div with `data-ad-preview="message"` or just inside script tags
const scripts = document.querySelectorAll('script');
let found = false;

for (let script of scripts) {
    if (script.textContent && script.textContent.includes('Aquele que sabe o bem')) {
        const text = script.textContent;
        // Try to find the string containing the text
        const regex = /"text":"(Aquele que sabe o bem que deve fazer.*?)"/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            console.log("Found in script:");
            let decoded = match[1].replace(/\\u[\dA-F]{4}/gi, 
                function (m) {
                    return String.fromCharCode(parseInt(m.replace(/\\u/g, ''), 16));
                }
            );
            decoded = decoded.replace(/\\n/g, '\n').replace(/\\"/g, '"');
            console.log(decoded);
            found = true;
            break;
        }
        if(found) break;
    }
}
if(!found) console.log("Not found in scripts.");
