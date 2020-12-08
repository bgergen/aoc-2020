const { getInputString } = require('../../utils');

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const input = getInputString(__dirname)
  .split('\n\n')
  .map(p => Object.fromEntries(
    p.split(/\s/).map(d => d.split(':'))
  ));

const getRangeValidator = (min, max) => num => num >= min && num <= max;

function hgtValidator(hgt) {
  const units = hgt.slice(-2);
  if (units !== 'cm' && units !== 'in') return false;
  const rangeValidator = units === 'cm'
    ? getRangeValidator(150, 193)
    : getRangeValidator(59, 76);
  return rangeValidator(hgt.slice(0, -2));
}

const hclValidator = hcl => /^#[0-9a-f]{6}$/.test(hcl);

function eclValidator(ecl) {
  const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return validColors.some(color => ecl === color);
}

const pidValidator = pid => /^\d{9}$/.test(pid);

const validators = {
  byr: getRangeValidator(1920, 2002),
  iyr: getRangeValidator(2010, 2020),
  eyr: getRangeValidator(2020, 2030),
  hgt: hgtValidator,
  hcl: hclValidator,
  ecl: eclValidator,
  pid: pidValidator,
};

function countValidPassports(passports, validatorFns) {
  return passports.filter(passport => {
    return REQUIRED_FIELDS.every(field => {
      return validatorFns
        ? validatorFns[field](passport[field] || '')
        : passport.hasOwnProperty(field);
    })
  }).length;
}

// Part 1: 190
console.log(countValidPassports(input));
// Part 2: 121
console.log(countValidPassports(input, validators));
