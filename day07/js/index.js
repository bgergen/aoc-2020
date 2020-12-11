const { getInputString } = require('../../utils');

const input = getInputString(__dirname).split('\n');

function parseRule(rule, regex) {
  const outerBag = rule.split(' ').slice(0, 2).join(' ');
  const innerBags = rule.match(regex) || [];
  return [outerBag, innerBags];
}

function buildDataObj1(rules) {
  return rules.reduce((rulesObj, rule) => {
    const [outerBag, innerBags] = parseRule(rule, /(?<=\d\s).*?(?=\sbag)/g);
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

function buildDataObj2(rules) {
  return rules.reduce((rulesObj, rule) => {
    const [outerBag, innerBags] = parseRule(rule, /\d\s.*?(?=\sbag)/g);
    const innerBagObj = innerBags.reduce((bagObj, bag) => {
      const [numBags, ...bagType] = bag.split(' ');
      bagObj[bagType.join(' ')] = numBags;
      return bagObj;
    }, {});
    rulesObj[outerBag] = innerBagObj;
    return rulesObj;
  }, {});
}

function getNumBags1(rules, bagZero) {
  const bagObj = buildDataObj1(rules);
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

function recursiveGetBags(dataObj, bagName) {
  const innerBags = dataObj[bagName];
  const innerBagNames = Object.keys(innerBags);

  const numBags = innerBagNames.reduce((total, bagName) => {
    return total + Number(innerBags[bagName]);
  }, 0);

  if (!innerBagNames.length) return numBags;
  return innerBagNames.reduce((totalBags, bag) => {
    return totalBags + (innerBags[bag] * recursiveGetBags(dataObj, bag));
  }, numBags);
}

function getNumBags2(rules, bagZero) {
  const bagObj = buildDataObj2(rules);
  return recursiveGetBags(bagObj, bagZero);
}

// Part 1: 235
console.log(getNumBags1(input, 'shiny gold'));
// Part2: 158493
console.log(getNumBags2(input, 'shiny gold'));
