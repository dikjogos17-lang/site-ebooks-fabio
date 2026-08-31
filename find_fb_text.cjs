const fs = require('fs');

const content = fs.readFileSync('C:/Users/bossg/.gemini/antigravity/brain/15d945d2-94f5-4119-ad33-107e80d915c6/.system_generated/steps/201/content.md', 'utf-8');

// Try to find the text by searching for "Aquele que sabe o bem que deve fazer"
const index = content.indexOf("Aquele que sabe o bem que deve fazer");
if (index !== -1) {
    console.log("Found text around index", index);
    console.log(content.substring(Math.max(0, index - 100), index + 1500));
} else {
    console.log("Text not found");
}
