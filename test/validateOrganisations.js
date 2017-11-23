const validator = require('./../lib/organisations');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'organisations.json');