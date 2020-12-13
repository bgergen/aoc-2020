const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(r => r.split(''));

function getNewSeatingState(currState, part) {
  return currState.reduce((newState, row, i, initialState) => {
    const r = row.reduce((newRow, seat, j) => {
      let occupied = 0;
      const occupationThreshold = part === 1 ? 4 : 5;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          if (part === 1) {
            const currRow = i + x;
            const currCol = j + y;
            const isValidRow = currRow >= 0 && currRow < initialState.length;
            const isValidCol = currCol >= 0 && currCol < row.length;
            if (isValidRow && isValidCol) {
              if (initialState[currRow][currCol] === '#') occupied++;
            }
          } else {
            let factor = 1;
            const isValidRow = () => {
              const currRow = i + (x * factor);
              return currRow >= 0 && currRow < initialState.length;
            }
            const isValidCol = () => {
              const currCol = j + (y * factor);
              return currCol >= 0 && currCol < row.length;
            }
            while (isValidRow() && isValidCol()) {
              const chair = initialState[i + (x * factor)][j + (y * factor)];
              if (chair !== '.') {
                if (chair === '#') occupied++;
                break;
              }
              factor++;
            }
          }
        }
      }
      if (seat === 'L' && occupied === 0) {
        return [...newRow, '#'];
      } else if (seat === '#' && occupied >= occupationThreshold) {
        return [...newRow, 'L'];
      } else {
        return [...newRow, seat];
      }
    }, []);
    return [...newState, r];
  }, [])
}

function findStableSeatingState(currState, part) {
  const newState = getNewSeatingState(currState, part);
  if (JSON.stringify(newState) === JSON.stringify(currState)) {
    return newState.join(',').split(',').filter(seat => seat === '#').length;
  }
  return findStableSeatingState(newState, part);
}

// Part 1: 2283
console.log(findStableSeatingState(input, 1));
// Part 2: 2054
console.log(findStableSeatingState(input, 2));
