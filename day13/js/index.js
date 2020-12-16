const { getInputString } = require('../../utils');

const [earliestDepartureStr, busIDsStr] = getInputString(__dirname).split('\n');
const earliestDeparture = Number(earliestDepartureStr);
const busIDs = busIDsStr.split(',').map(Number);

function getEarliestBus(depart, ids) {
   const busTimes = ids
    .filter(id => !Number.isNaN(id))
    .reduce((diffMap, id) => {
      const prev = depart / id;
      const diff = (Math.ceil(prev) * id) - depart;
      diffMap[diff] = id;
      return diffMap;
    }, {});

   const toWait = Math.min(...Object.keys(busTimes));
   return toWait * busTimes[toWait];
}

// First attempt. Too slow 😞
// function getEarliestHardMode(ids) {
//   const busPositions = Object.entries(
//     ids.reduce((posMap, id, pos) => {
//       if (Number.isNaN(id)) return posMap;
//       posMap[id] = pos;
//       return posMap;
//     }, {})
//   ).sort((a,b) => b[0] - a[0]).map(x => x.map(Number));
  
//   const [biggest, ...rest] = busPositions;
//   let [baseID, basePos] = biggest;
//   let increment = baseID;
//   let found = true;
//   let i = 1;
//   while (true) {
//     for (let j = 0; j < rest.length; j++) {
//       const [id, pos] = rest[j];
//       const posDiff = basePos - pos;
//       if (!Number.isInteger((increment - posDiff) / id)) {
//         found = false;
//         break;
//       }
//     }
//     if (found) {
//       return increment - basePos;
//     };
//     found = true;
//     increment += baseID;
//     i++;
//   }
// }

// Second attempt: Based off of https://www.reddit.com/r/adventofcode/comments/kc4njx/2020_day_13_solutions/gfo4b1z?utm_source=share&utm_medium=web2x&context=3
function getEarliestHardMode(ids) {
  const validIDs = ids.reduce((valid, id, i) => {
    if (Number.isNaN(id)) return valid;
    return [...valid, [id, i]];
  }, []);

  let jump = validIDs[0][0];
  let timeStamp = 0;
  validIDs.slice(1).forEach(([id, delta]) => {
    while ((timeStamp + delta) % id !== 0) {
      timeStamp += jump;
    }
    jump *= id;
  });

  return timeStamp;
}

// Part 1: 153
console.log(getEarliestBus(earliestDeparture, busIDs));
// Part 2: 471793476184394
console.log(getEarliestHardMode(busIDs));
