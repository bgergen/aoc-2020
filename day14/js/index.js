const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(r => r.split('=').map(s => s.trim()));

function setVal(mem, addr, val) {
  if (!addr.includes('X')) {
    mem[parseInt(addr, 2)] = val;
    return;
  }
  for (const r of ['0', '1']) {
    setVal(mem, addr.replace('X', r), val);
  }
}

function run(program, v1 = true) {
  const mem = [];
  let mask;

  program.forEach(([instr, val]) => {
    if (instr === 'mask') {
      mask = val;
    } else {
      const addr = Number(instr.match(/\d+/));
      if (v1) {
        const bin = Number(val).toString(2).padStart(36, '0').split('');
        for (let i = 0; i < mask.length; i++) {
          if (mask[i] !== 'X') {
            bin[i] = mask[i];
          }
        }
        mem[addr] = bin.join('');
      } else {
        // There's a bug in here somewhere, but I know not where.
        const bin = addr.toString(2).padStart(36, '0').split('');
        for (let i = 0; i < mask.length; i++) {
          if (mask[i] !== '0') {
            bin[i] = mask[i];
          }
        }
        setVal(mem, bin.join(''), Number(val));
      }
    }
  });

  return mem.reduce((sum, val) => {
    if (!val) return sum;
    return v1
      ? sum + parseInt(val, 2)
      : sum + val;
  }, 0);
}

// Part 1: 6559449933360
console.log(run(input));
// Part 2: ???
console.log(run(input, false));
