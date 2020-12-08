const fs = require('fs');
const path = require('path');

module.exports = {
  getInputString: dir => fs.readFileSync(path.join(dir, '../input.txt'), 'utf8'),
};
