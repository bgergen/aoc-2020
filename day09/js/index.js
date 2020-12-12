const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n').map(Number);

const PREAMBLE = 25;

function isValid(sum, numList) {
  const numSet = new Set(numList);
  for (const num of numSet) {
    const comp = sum - num;
    if (numSet.has(comp) && comp !== num) {
      return true;
    }
  }
  return false;
}

function findFirstInvalidNum(numList) {
  for (let i = PREAMBLE; i < numList.length; i++) {
    const num = numList[i];
    if (!isValid(num, numList.slice(i - PREAMBLE, i))) {
      return num;
    }
  }
  throw new Error('Could not find invalid number');
}

function findContiguousAddends(numList) {
  const firstInvalidNum = findFirstInvalidNum(numList);
  let pA = 0;
  let pB = 1;
  while (pA < numList.length) {
    const addends = numList.slice(pA, pB + 1);
    const sum = addends.reduce((total, num) => total + num, 0);

    if (sum === firstInvalidNum) {
      return Math.min(...addends) + Math.max(...addends);
    }

    if (sum < firstInvalidNum) pB++;
    else pA++;
  }
  throw new Error('Could not find contiguous addends');
}

// Part 1: 248131121
console.log(findFirstInvalidNum(input));
// Part 2: 31580383
console.log(findContiguousAddends(input));
