const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(row => row.split(' '));

function findInfiniteLoop(instructions, isFix) {
  let acc = 0;
  let i = 0;
  const instructionsRun = new Set();
  while (!instructionsRun.has(i)) {
    if (i === instructions.length) return acc;
    instructionsRun.add(i);
    const [cmd, val] = instructions[i];
    switch (cmd) {
      case 'acc':
        acc += Number(val);
      case 'nop':
        i++;
        break;
      case 'jmp':
        i += Number(val);
        break;
      default:
        throw new Error('Invalid command');
    }
  }
  return isFix ? null : acc;
}

const canFlip = {
  nop: 'jmp',
  jmp: 'nop',
};

function fixInfiniteLoop(instructions, idx = 0) {
  while (!canFlip[instructions[idx][0]]) {
    idx++;
  }

  const [cmd, val] = instructions[idx];
  const newInstr = [
    ...instructions.slice(0, idx),
    [canFlip[cmd], val],
    ...instructions.slice(idx + 1),
  ]

  const acc = findInfiniteLoop(newInstr, true);
  if (acc !== null) return acc;

  return fixInfiniteLoop(instructions, idx + 1);
}

// Part 1: 1394
console.log(findInfiniteLoop(input));
// Part 2: 1626
console.log(fixInfiniteLoop(input));
