const validator = require('./../lib/portal');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'portal.json');