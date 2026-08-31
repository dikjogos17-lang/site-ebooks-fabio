const fs = require('fs');
const content = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/brain/15d945d2-94f5-4119-ad33-107e80d915c6/.system_generated/steps/201/content.md', 'utf-8');

// The text starts with "Aquele que sabe o bem"
const startIdx = content.indexOf('Aquele que sabe o bem que deve fazer');
if (startIdx !== -1) {
    console.log(content.substring(startIdx, startIdx + 2000));
}
