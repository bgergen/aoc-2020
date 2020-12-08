const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(r => r.split(/[\-\:\s]/).filter(Boolean));

function filterFunc1(row) {
  const [min, max, letter, pass] = row;
  const freq = pass.split('').filter(c => c === letter).length;
  return freq >= min && freq <= max;
}

function filterFunc2(row) {
  const [i, j, letter, pass] = row;
  let letterFoundOnce = pass[i - 1] === letter;
  if (pass[j - 1] === letter) {
    letterFoundOnce = !letterFoundOnce;
  }
  return letterFoundOnce;
}

function findNumValidPasswords(rows, fn) {
  return rows.filter(fn).length;
}

// Part 1: 625
console.log(findNumValidPasswords(input, filterFunc1));
// Part 2: 391
console.log(findNumValidPasswords(input, filterFunc2));
