const fs = require('fs');

const content = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/brain/15d945d2-94f5-4119-ad33-107e80d915c6/.system_generated/steps/201/content.md', 'utf-8');

const regex = /"text":"Aquele que sabe o bem que deve fazer(.*?)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log("Found match:");
    console.log(match[0].substring(0, 500));
}
