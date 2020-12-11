const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(row => row.split(' '));

function findInfiniteLoop(instructions) {
  let acc = 0;
  let i = 0;
  const instructionsRun = new Set();
  while (!instructionsRun.has(i)) {
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
  return acc;
}

console.log(findInfiniteLoop(input));
