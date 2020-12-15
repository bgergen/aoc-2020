const { getInputString } = require('../../utils');

const input = getInputString(__dirname)
  .split('\n')
  .map(n => [n[0], Number(n.slice(1))]);

function adjustCoords(dir, val, coords) {
  switch (dir) {
    case 'N':
      coords[1] -= val;
      break;
    case 'S':
      coords[1] += val;
      break;
    case 'E':
      coords[0] += val;
      break;
    case 'W':
      coords[0] -= val;
      break;
  }
}

function navigate(instructions, hasWaypoint = false) {
  const dirs = ['E', 'S', 'W', 'N'];
  const currCoords = [0, 0];
  let waypoint = [10, -1];
  let currDir = 0;
  let coordsToAdjust = hasWaypoint ? waypoint : currCoords;

  instructions.forEach(instr => {
    let [action, val] = instr;
    if (dirs.includes(action)) {
      adjustCoords(action, val, coordsToAdjust);
    } else {
      switch(action) {
        case 'F':
          if (hasWaypoint) {
            currCoords[0] += val * waypoint[0];
            currCoords[1] += val * waypoint[1];
          } else {
            adjustCoords(dirs[currDir], val, currCoords);
          }
          break;
        case 'R':
          if (hasWaypoint) {
            while (val) {
              [waypoint[0], waypoint[1]] = [waypoint[1] * (-1), waypoint[0]];
              val -= 90;
            }
          } else {
            currDir = (currDir + (val / 90)) % dirs.length;
          }
          break;
        case 'L':
          if (hasWaypoint) {
            while (val) {
              [waypoint[0], waypoint[1]] = [waypoint[1], waypoint[0]  * (-1)];
              val -= 90;
            }
          } else {
            const newDir = currDir - (val / 90);
            currDir = newDir < 0 ? dirs.length + (newDir % dirs.length) : newDir;
          }
          break;
        default:
          throw new Error('Invalid action');
      }
    }
  });

  return Math.abs(currCoords[0]) + Math.abs(currCoords[1]);
}

// Part 1: 1177
console.log(navigate(input));
// Part 2: 46530
console.log(navigate(input, true));
