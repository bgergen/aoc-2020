const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n\n')
  .map(n => n.split('\n'));

function getNumUnique(rows) {
  return rows.reduce((unique, row) => {
    for (const char of row) {
      unique.add(char);
    }
    return unique;
  }, new Set()).size;
}

function getNumCommon(rows) {
  return rows.reduce((common, row) => {
    return new Set(row
      .split('')
      .filter(char => common.has(char))
    );
  }, new Set(rows[0])).size;
}

function getTotal(groups, fn) {
  return groups.reduce((sum, group) => {
    return sum + fn(group);
  }, 0);
}

// Part 1: 6703
console.log(getTotal(input, getNumUnique));
// Part 2: 3430
console.log(getTotal(input, getNumCommon));
