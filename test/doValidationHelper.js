const { readFileSync } = require('fs');
const path = require('path');

const validateConfig = (validator, fileName) => {
  const fullPath = path.join(path.resolve(__dirname), 'configs', fileName);
  const config = JSON.parse(readFileSync(fullPath, 'utf8'));
  const result = validator.validate(config);
  if (result.isValid) {
    console.log('\x1b[32m', 'Config is valid');
  } else {
    console.log('\x1b[31m', 'Config invalid!');
    result.errors.forEach((item) => {
      console.log('\x1b[31m', `   ${JSON.stringify(item)}`);
    });
  }
};

module.exports = {
  validateConfig,
};
