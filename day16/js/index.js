const { getInputString } = require('../../utils');

const [rules, myTicket, nearbyTickets] = getInputString(__dirname).split('\n\n');

function findScanningErrRate(validRanges, tickets) {
  const ranges = validRanges
    .match(/\d+-\d+/g)
    .map(r => r.split('-').map(Number));

  const rangeArr = ranges.reduce((valid, [min, max]) => {
    for (let i = min; i <= max; i++) {
      valid[i] = 1;
    }
    return valid;
  }, []);

  const vals = tickets
    .split('\n')
    .slice(1)
    .flatMap(t => t.split(',').map(Number));

  return vals.reduce((total, val) => {
    return rangeArr[val] ? total : total + val;
  }, 0);
}

// Part 1: 20013
console.log(findScanningErrRate(rules, nearbyTickets));
