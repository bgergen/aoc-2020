const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n').map(Number);
input.sort((a,b) => a - b);
const OUTLET = 0;
const DEVICE = input[input.length - 1] + 3;

function findJoltSpread(adapters) {
  let oneJoltCount = 0;
  let threeJoltCount = 0;

  for (let i = -1; i < adapters.length; i++) {
    const joltDiff = (adapters[i + 1] || DEVICE) - (adapters[i] || OUTLET);
    if (joltDiff === 1) oneJoltCount++;
    else if (joltDiff === 3) threeJoltCount++;
  }

  return oneJoltCount * threeJoltCount;
}

// Shamelessly stole the idea for this solution from https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gf9pg9n?utm_source=share&utm_medium=web2x&context=3 after struggling for too long on my own.
function findNumArrangements(adapters) {
  const ans = { 0: 1 };
  adapters.forEach(a => {
    ans[a] = (ans[a - 1] || 0) + (ans[a - 2] || 0) + (ans[a - 3] || 0);
  });
  return ans[adapters[adapters.length - 1]];
}

// Part 1: 2516
console.log(findJoltSpread(input));
// Part 2: 296196766695424
console.log(findNumArrangements([...input, DEVICE]));
