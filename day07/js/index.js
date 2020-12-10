const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n');

function parseRule(rule) {
  const outerBag = rule.split(' ').slice(0, 2).join(' ');
  const innerBags = rule.match(/(?<=\d\s).*?(?=\sbag)/g);
  return [outerBag, innerBags || []];
}

function buildDataObj(rules) {
  return rules.reduce((rulesObj, rule) => {
    const [outerBag, innerBags] = parseRule(rule);
    innerBags.forEach(bag => {
      if (!rulesObj[bag]) {
        rulesObj[bag] = [outerBag];
      } else {
        rulesObj[bag].push(outerBag);
      }
    });
    return rulesObj;
  }, {});
}

function getNumBags(rules, bagZero) {
  const bagObj = buildDataObj(rules);
  const bags = new Set();
  const bagQueue = bagObj[bagZero];
  while (bagQueue.length) {
    const bag = bagQueue.shift();
    bags.add(bag);
    const nextBags = bagObj[bag];
    if (nextBags) {
      bagQueue.push(...bagObj[bag]);
    }
  }
  return bags.size;
}

// Part 1: 235
console.log(getNumBags(input, 'shiny gold'));
