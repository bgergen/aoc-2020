const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split(',');

function playGame(numList, finalTurn) {
  const lastSpoken = numList.reduce((acc, curr, i) => {
    if (i === numList.length - 1) return acc;
    acc[curr] = i;
    return acc;
  }, {});

  let mostRecent = numList[numList.length - 1];
  for (let t = numList.length - 1; t < finalTurn - 1; t++) {
    const prev = lastSpoken[mostRecent];
    lastSpoken[mostRecent] = t;
    if (prev === undefined) {
      mostRecent = 0;
    } else {
      mostRecent = t - prev;
    }
  }

  return mostRecent;
}

// Part 1: 866
console.log(playGame(input, 2020));
// Part 2: 1437692 (Reminder to come back to this—I'm sure there's a better way to solve for large inputs)
console.log(playGame(input, 30000000));
