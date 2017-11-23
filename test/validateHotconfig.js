const validator = require('./../lib/hotConfig');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'hotconfig.json');