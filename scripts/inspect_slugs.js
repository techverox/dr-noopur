const fs = require('fs');
const content = fs.readFileSync('src/data/seoKeywordMap.ts', 'utf8');
const lines = content.split('\n');
const slugs = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^\s{2}["']([a-zA-Z0-9-]+)["']:\s*\{/);
  if (m) {
    slugs.push(m[1]);
  }
}
console.log('Total slugs:', slugs.length);
console.log('Slugs:', slugs);
