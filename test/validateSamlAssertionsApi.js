const validator = require('./../lib/samlAssertionsApi');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'samlAssertionsApi.json');