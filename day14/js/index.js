const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(r => r.split('=').map(s => s.trim()));

function run(program) {
  const mem = [];
  let mask;

  program.forEach(([instr, val]) => {
    if (instr === 'mask') {
      mask = val.split('').reduce((maskObj, char, i) => {
        if (char === 'X') return maskObj;
        return { ...maskObj, [i]: char };
      }, {});
    } else {
      const addr = Number(instr.match(/\d+/));
      const bin = Number(val).toString(2).padStart(36, '0').split('');
      Object.keys(mask).forEach(i => {
        bin[i] = mask[i];
      });
      mem[addr] = parseInt(bin.join(''), 2);
    }
  });

  return mem.reduce((sum, val) => sum + val, 0);
}

console.log(run(input));
