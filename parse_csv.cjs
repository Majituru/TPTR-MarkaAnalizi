const fs = require('fs');

const csv = fs.readFileSync('./Marka Verileri/TR_Market_basket_analysis_Simple_Month_2026_06_30.csv', 'utf8');
const lines = csv.split('\n').filter(line => line.trim().length > 0);
const dataLines = lines.slice(2); // Skip the first two header lines

const products = [];

// Parse CSV line correctly handling quotes
function parseCsvLine(text) {
  let ret = [''], i = 0, p = '', s = true;
  for (let l = text.length; i < l; i++) {
    let c = text[i];
    if (c === '"') {
      s = !s;
      if (text[i + 1] === '"') {
        ret[ret.length - 1] += '"';
        i++;
      }
    } else if (c === ',' && s) {
      ret.push('');
    } else {
      ret[ret.length - 1] += c;
    }
  }
  return ret;
}

dataLines.forEach(line => {
  const cols = parseCsvLine(line);
  if (cols.length < 15) return;
  
  const title = cols[0];
  const orders = parseInt(cols[5], 10) || 0;
  
  const combinations = [];
  
  // Combo 1
  if (cols[6] && cols[8] && cols[6] !== '') {
    combinations.push({ name: cols[6], percentage: parseFloat(cols[8]) || 0 });
  }
  // Combo 2
  if (cols[9] && cols[11] && cols[9] !== '') {
    combinations.push({ name: cols[9], percentage: parseFloat(cols[11]) || 0 });
  }
  // Combo 3
  if (cols[12] && cols[14] && cols[12] !== '') {
    combinations.push({ name: cols[12], percentage: parseFloat(cols[14]) || 0 });
  }
  
  products.push({
    productName: title,
    orders,
    combinations
  });
});

products.sort((a, b) => b.orders - a.orders);
const top20 = products.slice(0, 20);

const tpLink = [];
const tapo = [];

top20.forEach(p => {
  const isTapo = p.productName.toLowerCase().includes('tapo');
  const item = { productName: p.productName, combinations: p.combinations };
  if (isTapo) tapo.push(item);
  else tpLink.push(item);
});

console.log("=== TP-LINK ===");
console.log(JSON.stringify(tpLink, null, 2));
console.log("=== TAPO ===");
console.log(JSON.stringify(tapo, null, 2));
