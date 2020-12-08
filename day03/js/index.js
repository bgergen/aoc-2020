const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n');

function countTrees(map, [x, y]) {
  return map.filter((row, i) => {
    if (i % y !== 0) return false;
    const pos = (i * x / y) % row.length;
    return row[pos] === '#';
  }).length;
}

function getTreeProduct(map, slopes) {
  return slopes.reduce((prod, slope) => {
    return prod * countTrees(map, slope);
  }, 1);
}

// Part 1: 178
console.log(getTreeProduct(input, [[3,1]]));
// Part 2: 3492520200
console.log(getTreeProduct(input, [[1,1], [3,1], [5,1], [7,1], [1,2]]));
