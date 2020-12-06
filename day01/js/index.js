const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, '../input.txt'))
  .toString()
  .split('\n')
  .map(Number);

const SUM = 2020;

function getProduct(entries, sum, numToSum) {
  if (numToSum === 1) {
    return entries.includes(sum) ? sum : null;
  }
  for (let i = 0; i < entries.length; i++) {
    const comp = sum - entries[i];
    const product = getProduct(entries.slice(i), comp, numToSum - 1);
    if (product) {
      return entries[i] * product;
    }
  }
}

// Part 1: 542619
console.log(getProduct(input, SUM, 2));
// Part 2: 32858450
console.log(getProduct(input, SUM, 3));
