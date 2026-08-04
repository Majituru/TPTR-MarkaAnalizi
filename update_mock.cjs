const fs = require('fs');

const dataFile = './src/data/brandData.ts';
let content = fs.readFileSync(dataFile, 'utf8');

const output = fs.readFileSync('output.json', 'utf8');
const tpLinkJsonStr = output.split('=== TP-LINK ===\n')[1].split('\n=== TAPO ===')[0].trim();

// Regex to replace the marketBasket array for TP-Link
// It starts at "marketBasket": [ and goes until the next property "website": {
const regex = /("marketBasket"\s*:\s*)\[[\s\S]*?\],\s*"website"\s*:/;

// Actually, wait, the structure is:
//       "marketBasket": [ ... ]
//     },
//     "website": {
const regex2 = /("marketBasket"\s*:\s*)\[[\s\S]*?\n\s*\]\n\s*\},\n\s*"website"\s*:/;

const newContent = content.replace(regex2, `$1${tpLinkJsonStr}\n    },\n    "website":`);

fs.writeFileSync(dataFile, newContent, 'utf8');
console.log('Successfully updated brandData.ts');
