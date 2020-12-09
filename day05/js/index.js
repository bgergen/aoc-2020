const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n');

const UPPER_REGION = ['B', 'R'];

function getNewRange(char, min, max) {
  const diff = Math.ceil((max - min) / 2);
  return UPPER_REGION.includes(char)
    ? [min + diff, max]
    : [min, max - diff];
}

function getRowOrColumn(sequence, range) {
  const [rowOrCol] = sequence
    .split('')
    .reduce(([min, max], char) => getNewRange(char, min, max), [0, range - 1]);
  return rowOrCol;
}

const calculateSeatID = (row, column) => (row * 8) + column;

function getSeatID(boardingPass) {
  const row = getRowOrColumn(boardingPass.slice(0, 7), 128);
  const col = getRowOrColumn(boardingPass.slice(7), 8);
  return calculateSeatID(row, col);
}

function findHighestSeatID(boardingPasses) {
  return Math.max(...boardingPasses.map(getSeatID));
}

function findMissingID(boardingPasses) {
  const ids = boardingPasses.map(getSeatID);
  ids.sort((a,b) => a - b);
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== i + ids[0]) return ids[i] - 1;
  }
}

// Part 1: 816
console.log(findHighestSeatID(input));
// Part 2: 539
console.log(findMissingID(input));
