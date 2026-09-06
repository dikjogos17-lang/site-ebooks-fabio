const fs = require('fs');

const videoUrls = [
  "https://www.facebook.com/share/v/14hWaFfj3ix/",
  "https://www.facebook.com/share/v/1N5gDm6oxb/",
  "https://www.facebook.com/share/v/19TMf3MKNg/",
  "https://www.facebook.com/share/v/19TMv5q2iJ/",
  "https://www.facebook.com/share/v/1FVQ6rUBKA/",
  "https://www.facebook.com/share/v/1BjymoSPpU/",
  "https://www.facebook.com/share/v/14p66jmqJ3M/",
  "https://www.facebook.com/share/v/1PHDAPbdJE/",
  "https://www.facebook.com/share/v/19FVbyUC1L/",
  "https://www.facebook.com/share/v/19jqdTB8xM/",
  "https://www.facebook.com/share/v/16BiHCuj3XE/",
  "https://www.facebook.com/share/v/1DeGBrGnuQ/",
  "https://www.facebook.com/share/v/19mB5jnn96/",
  "https://www.facebook.com/share/v/18aWpJt52z/",
  "https://www.facebook.com/share/v/19AThxzQDq/",
  "https://www.facebook.com/share/v/1N6spcvX8i/",
  "https://www.facebook.com/share/v/1BqRZQ4RZG/",
  "https://www.facebook.com/share/v/1AhgLP3Hy3/",
  "https://www.facebook.com/share/v/19LqXvTKuW/",
  "https://www.facebook.com/share/v/1BsjxPZT1m/",
  "https://www.facebook.com/share/v/1DYwi6Qau3/",
  "https://www.facebook.com/share/v/1Bfh7X65aj/",
  "https://www.facebook.com/share/v/17jGzrPBvA/",
  "https://www.facebook.com/share/v/1DoK8gGTCU/",
  "https://www.facebook.com/share/v/1DMAgdqweE/",
  "https://www.facebook.com/share/v/19oRyKqZqX/",
  "https://www.facebook.com/share/v/1CNHcL1FJK/",
  "https://www.facebook.com/share/v/1BFHotJ5H1/",
  "https://www.facebook.com/share/v/17Pny5KFuz/",
  "https://www.facebook.com/share/v/1DrQT8z5gQ/",
  "https://www.facebook.com/share/v/14qd3sp1exS/",
  "https://www.facebook.com/share/v/1BsL53NGCp/",
  "https://www.facebook.com/share/v/1bTXty1zqK/",
  "https://www.facebook.com/share/v/1BoGsWRCb1/",
  "https://www.facebook.com/share/v/1aoAsfYfMi/",
  "https://www.facebook.com/share/v/1EyjrHWWY5/"
];

async function resolveUrls() {
  console.log('Resolving ' + videoUrls.length + ' URLs...');
  const resolved = [];
  
  for (let i = 0; i < videoUrls.length; i++) {
    try {
      const res = await fetch(videoUrls[i]);
      let finalUrl = res.url;
      if (finalUrl.includes('?')) {
        finalUrl = finalUrl.split('?')[0];
      }
      resolved.push(finalUrl);
      console.log('Resolved ' + (i + 1) + ': ' + finalUrl);
    } catch (e) {
      console.error('Failed to resolve', videoUrls[i]);
      resolved.push(videoUrls[i]);
    }
  }

  const fileContent = "export const videoUrls = [\n  " + resolved.map(u => '"' + u + '"').join(',\n  ') + "\n];\n";
  fs.writeFileSync('src/data/videos.ts', fileContent);
  console.log('Successfully updated src/data/videos.ts with canonical URLs!');
}

resolveUrls();
